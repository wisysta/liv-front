"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { IndustryHero } from "@/components/performance-fee/IndustryHero";
import { IndustrySelector } from "@/components/performance-fee/IndustrySelector";
import { IndustryTable } from "@/components/performance-fee/IndustryTable";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function IndustryPerformanceFeePage() {
    // 스크롤 애니메이션 훅들
    const selectorSection = useScrollAnimation({ delay: 200 });
    const tableSection = useScrollAnimation({ delay: 400 });

    // 선택된 업종 상태 - 초기값은 null (아무것도 선택하지 않은 상태)
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIndustryChange = (industry: string) => {
        setSelectedIndustry(industry);
        setIsModalOpen(false);
    };

    return (
        <PageLayout
            headerOverlay={false}
            fullHeight={false}
            headerVariant="light"
        >
            <IndustryHero />

            {/* 업종 선택 버튼 섹션 */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={selectorSection.ref}
                        className={`text-center transition-all duration-1500 ease-out ${
                            selectorSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-20"
                        }`}
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary-purple text-white font-semibold py-4 px-8 rounded-full hover:bg-primary-purple/90 transition-colors shadow-lg text-sm lg:text-base"
                        >
                            해당하는 업종을 선택하세요
                        </button>
                    </div>
                </div>
            </section>

            {/* 업종별 공연권료 표 섹션 */}
            <section className="bg-white pb-20 lg:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={tableSection.ref}
                        className={`transition-all duration-1500 ease-out ${
                            tableSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-20"
                        } ${selectedIndustry === null ? "blur-sm" : ""}`}
                    >
                        <IndustryTable selectedIndustry={selectedIndustry} />
                    </div>
                </div>
            </section>

            {/* 업종 선택 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* 배경 오버레이 */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setIsModalOpen(false)}
                    />
                    {/* 모달 콘텐츠 */}
                    <div className="relative">
                        <IndustrySelector
                            onIndustryChange={handleIndustryChange}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </PageLayout>
    );
}
