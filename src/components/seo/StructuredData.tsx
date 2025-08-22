import { siteConfig } from "@/config/site";

interface StructuredDataProps {
    type?: "organization" | "website" | "service" | "breadcrumb";
    data?: Record<string, any>;
    breadcrumbs?: Array<{ name: string; url: string }>;
}

export function StructuredData({
    type = "organization",
    data,
    breadcrumbs,
}: StructuredDataProps) {
    const getStructuredData = () => {
        const baseData = {
            "@context": "https://schema.org",
        };

        switch (type) {
            case "organization":
                return {
                    ...baseData,
                    "@type": "Organization",
                    name: siteConfig.name,
                    url: siteConfig.url,
                    logo: `${siteConfig.url}${siteConfig.logo}`,
                    description: siteConfig.description,
                    contactPoint: {
                        "@type": "ContactPoint",
                        contactType: "customer service",
                        availableLanguage: "Korean",
                    },
                    sameAs: [
                        // 소셜 미디어 링크들 (실제 링크로 교체 필요)
                    ],
                    ...data,
                };

            case "website":
                return {
                    ...baseData,
                    "@type": "WebSite",
                    name: siteConfig.name,
                    url: siteConfig.url,
                    description: siteConfig.description,
                    publisher: {
                        "@type": "Organization",
                        name: siteConfig.name,
                    },
                    potentialAction: {
                        "@type": "SearchAction",
                        target: {
                            "@type": "EntryPoint",
                            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
                        },
                        "query-input": "required name=search_term_string",
                    },
                    mainEntity: {
                        "@type": "ItemList",
                        itemListElement: [
                            {
                                "@type": "SiteNavigationElement",
                                position: 1,
                                name: "사업 소개",
                                description:
                                    "통합징수와 Heal Music 서비스를 소개합니다",
                                url: `${siteConfig.url}/service/integrated-collection`,
                            },
                            {
                                "@type": "SiteNavigationElement",
                                position: 2,
                                name: "회사 소개",
                                description:
                                    "CEO 인사말, 기업비전, 연혁을 확인하세요",
                                url: `${siteConfig.url}/company/ceo`,
                            },
                            {
                                "@type": "SiteNavigationElement",
                                position: 3,
                                name: "Q&A",
                                description:
                                    "자주 묻는 질문과 답변을 확인하세요",
                                url: `${siteConfig.url}/customer/faq`,
                            },
                            {
                                "@type": "SiteNavigationElement",
                                position: 4,
                                name: "공연권료 계산기",
                                description: "공연권료를 쉽게 계산해보세요",
                                url: `${siteConfig.url}/performance-fee/calculator`,
                            },
                            {
                                "@type": "SiteNavigationElement",
                                position: 5,
                                name: "공연권료란?",
                                description:
                                    "공연권료 제도와 납부 대상을 확인하세요",
                                url: `${siteConfig.url}/performance-fee`,
                            },
                            {
                                "@type": "SiteNavigationElement",
                                position: 6,
                                name: "Heal Music",
                                description: "음악 치유 서비스를 소개합니다",
                                url: `${siteConfig.url}/service/heal-music`,
                            },
                        ],
                    },
                    ...data,
                };

            case "service":
                return {
                    ...baseData,
                    "@type": "Service",
                    name: "공연권료 납부 서비스",
                    description: siteConfig.description,
                    provider: {
                        "@type": "Organization",
                        name: siteConfig.name,
                        url: siteConfig.url,
                    },
                    serviceType: "공연권료 계산 및 납부",
                    areaServed: {
                        "@type": "Country",
                        name: "대한민국",
                    },
                    ...data,
                };

            case "breadcrumb":
                return {
                    ...baseData,
                    "@type": "BreadcrumbList",
                    itemListElement:
                        breadcrumbs?.map((crumb, index) => ({
                            "@type": "ListItem",
                            position: index + 1,
                            name: crumb.name,
                            item: crumb.url,
                        })) || [],
                    ...data,
                };

            default:
                return baseData;
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(getStructuredData()),
            }}
        />
    );
}
