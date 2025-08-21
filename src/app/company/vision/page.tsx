"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { CompanyNavigation } from "@/components/layout/CompanyNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ValuesSwiper } from "@/components/ui/ValuesSwiper";
import { ScrollInteractionSection } from "@/components/ui/ScrollInteractionSection";
import { HeroVision } from "@/components/company/hero-vision";

export default function CompanyVisionPage() {
    // 스크롤 애니메이션 훅들
    const heroSection = useScrollAnimation({ delay: 200 });
    // 페이지 하단 인터랙션 진입용
    useScrollAnimation({ delay: 0 });

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero 섹션 */}
            <section className="bg-white pt-24 lg:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 회사 네비게이션 */}
                    <div
                        ref={heroSection.ref}
                        className={`mb-12 lg:mb-14 2xl:mb-16 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <CompanyNavigation currentPage="vision" />
                    </div>

                    {/* 제목 */}
                    <div
                        className={`text-center mb-8 sm:mb-16 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark mb-4">
                            기업비전
                        </h1>
                    </div>
                </div>
            </section>

            {/* 히어로 이미지 섹션 */}
            <HeroVision />

            {/* 가치 섹션 */}
            <section className="py-20 lg:py-32 bg-white">
                {/* 가치 카드 스와이퍼 */}
                <ValuesSwiper />
            </section>

            {/* 스크롤 인터렉션 섹션 */}
            <ScrollInteractionSection />
        </PageLayout>
    );
}
