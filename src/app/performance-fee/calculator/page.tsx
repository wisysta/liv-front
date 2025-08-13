"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { UnifiedCalculator } from "@/components/performance-fee/UnifiedCalculator";
import { ApiIndustrySelector } from "@/components/performance-fee/ApiIndustrySelector";
import { getIndustries, type Industry } from "@/actions/industry-actions";

export default function PerformanceFeeCalculatorPage() {
    // 상태 관리
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);
    const [showIndustryModal, setShowIndustryModal] = useState(false);

    // 업종 데이터 로드
    useEffect(() => {
        async function loadIndustries() {
            try {
                const data = await getIndustries();

                setIndustries(data);
                setShowIndustryModal(true);
            } catch (error) {
                console.error("업종 데이터 로드 실패:", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadIndustries();
    }, []);

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
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="text-gray-500">
                                데이터를 불러오는 중...
                            </div>
                        </div>
                    ) : selectedIndustry ? (
                        <UnifiedCalculator
                            selectedIndustry={selectedIndustry}
                            industries={industries}
                            onIndustryChange={handleIndustryChange}
                        />
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-gray-500">
                                업종 정보를 찾을 수 없습니다.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 업종 선택 모달 */}
            {showIndustryModal && !isLoading && (
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
