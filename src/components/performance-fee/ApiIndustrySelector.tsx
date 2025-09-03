"use client";

import { useState, useEffect } from "react";
import { Industry } from "@/actions/industry-actions";

interface ProcessedIndustry {
    id: string;
    name: string;
    type: string;
    groupId?: number;
    uniqueKey: string;
}

interface ApiIndustrySelectorProps {
    onClose: () => void;
    onIndustryChange: (industryId: string) => void;
    industries: Industry[]; // API 데이터 (필수)
}

export function ApiIndustrySelector({
    onClose,
    onIndustryChange,
    industries,
}: ApiIndustrySelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(
        null
    );

    // 컴포넌트가 마운트될 때마다 검색어 초기화 및 첫번째 업종 선택
    useEffect(() => {
        setSearchTerm("");
        if (industries.length > 0) {
            const firstIndustry = industries[0];
            if (firstIndustry) {
                const firstIndustryKey = `${
                    firstIndustry.groupId || firstIndustry.id
                }-${firstIndustry.id}`;
                setSelectedIndustry(firstIndustryKey);
            }
        } else {
            setSelectedIndustry(null);
        }
    }, [industries]);

    // API 데이터를 ProcessedIndustry 형태로 변환
    const industryList: ProcessedIndustry[] = industries.map((ind) => ({
        id: ind.id.toString(),
        name: ind.name,
        type: ind.type,
        ...(ind.groupId !== undefined && { groupId: ind.groupId }), // groupId가 있을 때만 포함
        uniqueKey: `${ind.groupId || ind.id}-${ind.id}`, // 고유 키 생성
    }));

    const filteredIndustries = industryList.filter((industry) =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        // 닫기 시 첫번째 업종 선택
        if (industries.length > 0) {
            const firstIndustry = industries[0];
            if (firstIndustry) {
                const firstIndustryKey = `${
                    firstIndustry.groupId || firstIndustry.id
                }-${firstIndustry.id}`;
                onIndustryChange(firstIndustryKey);
            }
        }
        onClose();
    };

    const handleIndustrySelect = (industryId: string) => {
        setSelectedIndustry(industryId);
        onIndustryChange(industryId);
        onClose(); // 선택 후 모달 닫기
    };

    return (
        <div
            className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50"
            onClick={handleBackgroundClick}
        >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md mx-4 max-h-[480px] flex flex-col">
                <div className="p-4 border-b border-gray-200 text-center">
                    <h3 className="text-lg font-bold text-background-dark mb-2">
                        해당하는 업종을 선택하세요
                    </h3>
                    <p className="text-sm text-gray-600">
                        매장에서 음악이 흘러나오고 있다면, 대상이 될 수 있습니다
                    </p>
                </div>

                {/* 검색 입력 */}
                <div className="p-4 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="업종 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm"
                        autoFocus
                    />
                </div>

                {/* 업종 목록 */}
                <div className="overflow-y-auto max-h-[320px]">
                    {industryList.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            업종 데이터를 불러오는 중...
                        </div>
                    ) : filteredIndustries.length > 0 ? (
                        filteredIndustries.map((industry) => (
                            <button
                                key={industry.uniqueKey}
                                onClick={() =>
                                    handleIndustrySelect(
                                        industry.uniqueKey || industry.id
                                    )
                                }
                                className={`w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                    selectedIndustry === industry.uniqueKey
                                        ? "bg-purple-50 text-primary-purple"
                                        : "text-background-dark"
                                }`}
                            >
                                <div className="text-sm font-medium">
                                    {industry.name}
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            "{searchTerm}"에 대한 검색 결과가 없습니다.
                        </div>
                    )}
                </div>

                {/* 닫기 버튼 */}
                <div className="p-4 border-t border-gray-200 text-center">
                    <button
                        onClick={handleClose}
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
