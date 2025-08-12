"use client";

import { useState } from "react";
import industryIndex from "@/data/industries/index.json";

interface Industry {
    id: string;
    name: string;
    type: string;
}

// 인덱스에서 업종 목록을 가져옴
const industries: Industry[] = industryIndex.industryList;

interface IndustrySelectorProps {
    onClose: () => void;
    onIndustryChange: (industryId: string) => void;
}

export function IndustrySelector({
    onClose,
    onIndustryChange,
}: IndustrySelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(
        null
    );

    const filteredIndustries = industries.filter((industry) =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
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
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full mx-4 max-h-[80vh] flex flex-col">
                <div className="flex flex-col space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-background-dark mb-2">
                            해당하는 업종을 선택하세요
                        </h3>
                        <p className="text-sm text-gray-600">
                            매장에서 음악이 흘러나오고 있다면, 대상이 될 수
                            있습니다
                        </p>
                    </div>

                    {/* 검색 입력 */}
                    <div className="border-b border-gray-200 pb-1">
                        <input
                            type="text"
                            placeholder="업종 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 text-background-dark focus:outline-none placeholder-gray-400"
                        />
                    </div>

                    {/* 업종 목록 */}
                    <div className="overflow-y-auto max-h-96 space-y-2">
                        {filteredIndustries.map((industry) => (
                            <label
                                key={industry.id}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() =>
                                    handleIndustrySelect(industry.id)
                                }
                            >
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name="industry"
                                        value={industry.id}
                                        checked={
                                            selectedIndustry === industry.id
                                        }
                                        onChange={() =>
                                            handleIndustrySelect(industry.id)
                                        }
                                        className="sr-only"
                                    />
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 ${
                                            selectedIndustry === industry.id
                                                ? "border-primary-purple bg-primary-purple"
                                                : "border-gray-300"
                                        } flex items-center justify-center`}
                                    >
                                        {selectedIndustry === industry.id && (
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-background-dark text-sm font-medium">
                                    {industry.name}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* 선택 버튼 */}
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={onClose}
                            className="bg-primary-purple text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors font-medium"
                        >
                            선택 완료
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
