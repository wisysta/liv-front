// 구조화된 데이터로 사이트 네비게이션 구조를 검색엔진에 알려주는 컴포넌트
import { MENU_SECTIONS } from "../layout/StaticNavigationMenu";

export function SiteStructure() {
    // 사이트 구조를 JSON-LD로 생성
    const siteNavigationStructure = {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        name: "리브뮤직 주요 메뉴",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://livmusic.co.kr",
        hasPart: MENU_SECTIONS.flatMap((section) => {
            const mainItem = {
                "@type": "SiteNavigationElement",
                name: section.title,
                url: section.href
                    ? `${
                          process.env.NEXT_PUBLIC_SITE_URL ||
                          "https://livmusic.co.kr"
                      }${section.href}`
                    : undefined,
            };

            const subItems = section.items.map((item) => ({
                "@type": "SiteNavigationElement",
                name: item.title,
                url: `${
                    process.env.NEXT_PUBLIC_SITE_URL || "https://livmusic.co.kr"
                }${item.href}`,
            }));

            return section.href ? [mainItem] : subItems;
        }),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(siteNavigationStructure, null, 2),
            }}
        />
    );
}
