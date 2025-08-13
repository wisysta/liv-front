"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { UnifiedCalculator } from "@/components/performance-fee/UnifiedCalculator";
import { ApiIndustrySelector } from "@/components/performance-fee/ApiIndustrySelector";
import { type Industry } from "@/actions/industry-actions";

interface CalculatorClientProps {
    initialIndustries: Industry[];
}

export default function CalculatorClient({
    initialIndustries,
}: CalculatorClientProps) {
    // 상태 관리
    const [industries] = useState<Industry[]>(initialIndustries);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
        null
    );
    const [showIndustryModal, setShowIndustryModal] = useState(false);

    // 초기화 - 업종 데이터가 있으면 모달 표시
    useEffect(() => {
        if (industries.length > 0) {
            setShowIndustryModal(true);
        }
    }, [industries]);

    const handleIndustryChange = (industry: Industry) => {
        setSelectedIndustry(industry);
        setShowIndustryModal(false);
    };

    return (
        <PageLayout
            headerOverlay={false}
            fullHeight={false}
            headerVariant="light"
        >
            {/* 헤더 섹션 */}
            <div className="bg-white py-12 lg:py-12 2xl:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark">
                            공연권료 계산기
                        </h1>
                    </div>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 2xl:py-20">
                    {industries.length === 0 ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    ) : selectedIndustry ? (
                        <UnifiedCalculator
                            selectedIndustry={selectedIndustry}
                            industries={industries}
                            onIndustryChange={handleIndustryChange}
                        />
                    ) : null}
                </div>
            </div>

            {/* 업종 선택 모달 */}
            {showIndustryModal && industries.length > 0 && (
                <ApiIndustrySelector
                    industries={industries}
                    onIndustryChange={(industryId: string) => {
                        // API 데이터에서 고유 키로 찾기 (groupId-id 형태)
                        const selectedIndustry = industries.find(
                            (ind) =>
                                `${ind.groupId || ind.id}-${ind.id}` ===
                                industryId
                        );

                        if (selectedIndustry) {
                            handleIndustryChange(selectedIndustry);
                        }
                    }}
                    onClose={() => setShowIndustryModal(false)}
                />
            )}
        </PageLayout>
    );
}
