import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { StructuredData } from "@/components/seo/StructuredData";

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
        "공연권료 계산기",
        "납부대상 확인",
    ],
    openGraph: {
        title: "리브뮤직 - 공연권료 납부, 쉽게 해결하세요",
        description:
            "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
        images: ["/OG_IMAGE.jpg"],
        url: "https://livmusic.co.kr",
    },
    twitter: {
        title: "리브뮤직 - 공연권료 납부, 쉽게 해결하세요",
        description:
            "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
        images: ["/OG_IMAGE.jpg"],
    },
    alternates: {
        canonical: "https://livmusic.co.kr",
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
