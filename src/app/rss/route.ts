import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// 24시간마다 재생성 (ISR)
export const revalidate = 86400; // 24시간 (초 단위)

// 캐시된 데이터 가져오기 함수
const getCachedRssData = unstable_cache(
    async (apiUrl: string) => {
        // API에서 실제 공지사항과 보도자료 데이터 가져오기
        const [noticesResponse, pressReleasesResponse] = await Promise.all([
            fetch(`${apiUrl}/api/notices?limit=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch(() => null),
            fetch(`${apiUrl}/api/press-releases`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch(() => null),
        ]);

        let notices: any[] = [];
        let pressReleases: any[] = [];

        if (noticesResponse?.ok) {
            const noticesData = await noticesResponse.json();
            notices = noticesData.notices || [];
        }

        if (pressReleasesResponse?.ok) {
            const pressData = await pressReleasesResponse.json();
            pressReleases = pressData.pressReleases || [];
        }

        return { notices, pressReleases };
    },
    ["rss-data"], // 캐시 키
    {
        revalidate: 86400, // 24시간
        tags: ["rss"],
    }
);

export async function GET() {
    const baseUrl = "https://livmusic.co.kr";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const currentDate = new Date().toISOString();

    try {
        // 캐시된 데이터 가져오기
        const { notices, pressReleases } = await getCachedRssData(apiUrl!);

        // 모든 아이템을 합치고 날짜순으로 정렬
        const allItems = [
            ...notices.map((notice: any) => ({
                ...notice,
                type: "notice",
                link: `${baseUrl}/customer/notice/${notice.id}`,
            })),
            ...pressReleases.map((press: any) => ({
                ...press,
                type: "press-release",
                link: `${baseUrl}/customer/press-release/${press.id}`,
            })),
        ].sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

        const rssItems = allItems
            .slice(0, 20) // 최신 20개 항목만
            .map((item) => {
                const pubDate = new Date(item.createdAt).toUTCString();
                const category =
                    item.type === "notice" ? "공지사항" : "보도자료";

                return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${
          item.content ? item.content.substring(0, 200) + "..." : item.title
      }]]></description>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${category}</category>
    </item>`;
            })
            .join("");

        const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>리브뮤직 - 최신 소식</title>
    <description>리브뮤직의 최신 공지사항과 보도자료를 확인하세요</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <managingEditor>info@livmusic.co.kr (리브뮤직)</managingEditor>
    <webMaster>info@livmusic.co.kr (리브뮤직)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} 리브뮤직. All rights reserved.</copyright>
    <category>음악/저작권/공연권료</category>
    <image>
      <url>${baseUrl}/livmusic-logo-black.svg</url>
      <title>리브뮤직</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
${rssItems}
  </channel>
</rss>`;

        return new NextResponse(rssXml, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600", // 24시간 캐시, 1시간 stale-while-revalidate
            },
        });
    } catch (error) {
        console.error("RSS 피드 생성 오류:", error);

        // 오류 발생 시 기본 RSS 피드 반환
        const fallbackRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>리브뮤직 - 공연권료 납부 서비스</title>
    <description>따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <managingEditor>info@livmusic.co.kr (리브뮤직)</managingEditor>
    <webMaster>info@livmusic.co.kr (리브뮤직)</webMaster>
    <copyright>Copyright © ${new Date().getFullYear()} 리브뮤직. All rights reserved.</copyright>
    <category>음악/저작권/공연권료</category>
    <image>
      <url>${baseUrl}/livmusic-logo-black.svg</url>
      <title>리브뮤직</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>

    <item>
      <title>리브뮤직 서비스 안내</title>
      <description>공연권료 납부와 관련된 모든 서비스를 제공합니다.</description>
      <link>${baseUrl}</link>
      <guid>${baseUrl}</guid>
      <pubDate>${currentDate}</pubDate>
      <category>서비스</category>
    </item>

  </channel>
</rss>`;

        return new NextResponse(fallbackRss, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "s-maxage=3600, stale-while-revalidate=300", // 1시간 캐시 (오류 시), 5분 stale-while-revalidate
            },
        });
    }
}
