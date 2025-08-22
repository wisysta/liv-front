import type { Metadata } from "next";
import "./globals.css";
import { StructuredData } from "@/components/seo/StructuredData";
import { PopupModal } from "@/components/ui/popup-modal";
import { getActivePopups } from "@/actions/popup-actions";

export const metadata: Metadata = {
    title: "리브뮤직 - 공연권료 납부, 쉽게 해결하세요",
    description: "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
    keywords: [
        "공연권료",
        "공연권료 납부",
        "공연권료 계산",
        "리브뮤직",
        "음악 저작권",
        "저작권료",
        "공연료",
        "음악 사용료",
    ],
    authors: [{ name: "리브뮤직" }],
    creator: "리브뮤직",
    publisher: "리브뮤직",
    metadataBase: new URL("https://livmusic.co.kr"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "ko_KR",
        url: "https://livmusic.co.kr",
        siteName: "리브뮤직",
        title: "리브뮤직 - 공연권료 납부, 쉽게 해결하세요",
        description:
            "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
        images: [
            {
                url: "/OG_IMAGE.jpg",
                width: 1200,
                height: 630,
                alt: "리브뮤직 - 공연권료 납부 서비스",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "리브뮤직 - 공연권료 납부, 쉽게 해결하세요",
        description:
            "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
        images: ["/OG_IMAGE.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "oOxWTE0J7hnmtnlMXRUWw7rFFyfAGfBUMhO0aMD-kGs",
        other: {
            "naver-site-verification":
                "1f53042b93a5b41c4dd963a573df9a626ad3488f",
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 활성화된 팝업 데이터 가져오기
    const popups = await getActivePopups();

    return (
        <html lang="ko">
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="리브뮤직 최신 소식"
                    href="/rss"
                />
            </head>
            <body className="font-pretendard antialiased">
                <StructuredData type="organization" />
                <StructuredData type="website" />
                {children}
                {/* 팝업 모달 */}
                <PopupModal popups={popups} />
            </body>
        </html>
    );
}
