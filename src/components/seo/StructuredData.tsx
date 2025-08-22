import { siteConfig } from "@/config/site";

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
