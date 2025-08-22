interface StructuredDataProps {
    type?: "organization" | "website" | "service";
    data?: Record<string, any>;
}

export function StructuredData({
    type = "organization",
    data,
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
                    name: "리브뮤직",
                    url: "https://livmusic.co.kr",
                    logo: "https://livmusic.co.kr/livmusic-logo-black.svg",
                    description:
                        "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
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
                    name: "리브뮤직",
                    url: "https://livmusic.co.kr",
                    description:
                        "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
                    publisher: {
                        "@type": "Organization",
                        name: "리브뮤직",
                    },
                    potentialAction: {
                        "@type": "SearchAction",
                        target: {
                            "@type": "EntryPoint",
                            urlTemplate:
                                "https://livmusic.co.kr/search?q={search_term_string}",
                        },
                        "query-input": "required name=search_term_string",
                    },
                    ...data,
                };

            case "service":
                return {
                    ...baseData,
                    "@type": "Service",
                    name: "공연권료 납부 서비스",
                    description:
                        "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
                    provider: {
                        "@type": "Organization",
                        name: "리브뮤직",
                        url: "https://livmusic.co.kr",
                    },
                    serviceType: "공연권료 계산 및 납부",
                    areaServed: {
                        "@type": "Country",
                        name: "대한민국",
                    },
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
