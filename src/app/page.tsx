import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [...siteConfig.keywords, "공연권료 계산기", "납부대상 확인"],
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        url: siteConfig.url,
    },
    twitter: {
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: siteConfig.url,
    },
};

export default function Home() {
    return (
        <PageLayout headerOverlay={true} fullHeight={true}>
            <StructuredData
                type="service"
                data={{
                    name: "공연권료 납부 서비스",
                    description:
                        "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
                    hasOfferCatalog: {
                        "@type": "OfferCatalog",
                        name: "공연권료 서비스",
                        itemListElement: [
                            {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "Service",
                                    name: "공연권료 계산기",
                                },
                            },
                            {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "Service",
                                    name: "납부대상 확인",
                                },
                            },
                            {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "Service",
                                    name: "공연권 신청안내",
                                },
                            },
                        ],
                    },
                }}
            />
            <HeroSection />
        </PageLayout>
    );
}
