"use client";

import { useState } from "react";
import Link from "next/link";

interface Industry {
    id: string;
    name: string;
    description?: string;
    href: string;
}

const industries: Industry[] = [
    {
        id: "coffee",
        name: "커피전문점",
        href: "/performance-fee/calculator?type=coffee",
    },
    {
        id: "beverage",
        name: "기타 비알콜 음료점",
        href: "/performance-fee/calculator?type=beverage",
    },
    {
        id: "beer",
        name: "생맥주 전문점",
        href: "/performance-fee/calculator?type=beer",
    },
    {
        id: "bar",
        name: "기타 주점",
        href: "/performance-fee/calculator?type=bar",
    },
    {
        id: "gym",
        name: "체력단련장",
        href: "/performance-fee/calculator?type=gym",
    },
    {
        id: "karaoke",
        name: "노래연습장",
        href: "/performance-fee/calculator?type=karaoke",
    },
    {
        id: "hotel",
        name: "호텔",
        href: "/performance-fee/calculator?type=hotel",
    },
    {
        id: "condo",
        name: "콘도미니엄",
        href: "/performance-fee/calculator?type=condo",
    },
    {
        id: "casino",
        name: "카지노",
        href: "/performance-fee/calculator?type=casino",
    },
    {
        id: "golf",
        name: "골프장",
        href: "/performance-fee/calculator?type=golf",
    },
    {
        id: "mart",
        name: "대형마트",
        href: "/performance-fee/calculator?type=mart",
    },
    {
        id: "department",
        name: "백화점",
        href: "/performance-fee/calculator?type=department",
    },
    {
        id: "complex_shopping",
        name: "복합쇼핑몰",
        href: "/performance-fee/calculator?type=complex_shopping",
    },
    {
        id: "shopping_center",
        name: "쇼핑센터",
        href: "/performance-fee/calculator?type=shopping_center",
    },
    {
        id: "specialty_store",
        name: "쇼핑전문점",
        href: "/performance-fee/calculator?type=specialty_store",
    },
    {
        id: "large_store",
        name: "대규모 점포",
        href: "/performance-fee/calculator?type=large_store",
    },
    {
        id: "dance_academy",
        name: "무도학원",
        href: "/performance-fee/calculator?type=dance_academy",
    },
    {
        id: "aerobics",
        name: "에어로빅장",
        href: "/performance-fee/calculator?type=aerobics",
    },
    {
        id: "music_class",
        name: "노래교실",
        href: "/performance-fee/calculator?type=music_class",
    },
    {
        id: "dance_hall",
        name: "무도장",
        href: "/performance-fee/calculator?type=dance_hall",
    },
    {
        id: "cabaret",
        name: "카바레",
        href: "/performance-fee/calculator?type=cabaret",
    },
    {
        id: "stand_bar",
        name: "스탠드바",
        href: "/performance-fee/calculator?type=stand_bar",
    },
    {
        id: "game_room",
        name: "게임방",
        href: "/performance-fee/calculator?type=game_room",
    },
    {
        id: "multi_room",
        name: "멀티방",
        href: "/performance-fee/calculator?type=multi_room",
    },
    {
        id: "night_club",
        name: "나이트클럽",
        href: "/performance-fee/calculator?type=night_club",
    },
    {
        id: "room_salon",
        name: "룸살롱",
        href: "/performance-fee/calculator?type=room_salon",
    },
    {
        id: "entertainment_restaurant",
        name: "유흥주점 및 극장식 식당",
        href: "/performance-fee/calculator?type=entertainment_restaurant",
    },
    {
        id: "danran_jujeom",
        name: "단란주점",
        href: "/performance-fee/calculator?type=danran_jujeom",
    },
    {
        id: "restaurant",
        name: "레스토랑",
        href: "/performance-fee/calculator?type=restaurant",
    },
    {
        id: "coffee_shop",
        name: "커피숍",
        href: "/performance-fee/calculator?type=coffee_shop",
    },
    {
        id: "cafe_performance",
        name: "카페에서 음악 공연",
        href: "/performance-fee/calculator?type=cafe_performance",
    },
    {
        id: "buffet_performance",
        name: "뷔페에서 음악 공연",
        href: "/performance-fee/calculator?type=buffet_performance",
    },
    {
        id: "community_center",
        name: "주민자치센터",
        href: "/performance-fee/calculator?type=community_center",
    },
    {
        id: "cultural_center",
        name: "시,군,구 비영리 문화센터",
        href: "/performance-fee/calculator?type=cultural_center",
    },
    {
        id: "aircraft",
        name: "항공기",
        href: "/performance-fee/calculator?type=aircraft",
    },
    {
        id: "sports_facility",
        name: "전문체육시설",
        href: "/performance-fee/calculator?type=sports_facility",
    },
    {
        id: "amusement_park",
        name: "유원시설",
        href: "/performance-fee/calculator?type=amusement_park",
    },
    {
        id: "racing_track",
        name: "경마,경륜,경정장",
        href: "/performance-fee/calculator?type=racing_track",
    },
    {
        id: "train",
        name: "기차",
        href: "/performance-fee/calculator?type=train",
    },
    {
        id: "ship",
        name: "선박",
        href: "/performance-fee/calculator?type=ship",
    },
];

interface IndustrySelectorProps {
    onIndustryChange?: (industry: string) => void;
    onClose?: () => void;
}

export function IndustrySelector({
    onIndustryChange,
    onClose,
}: IndustrySelectorProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<string | null>(
        null
    );
    const [searchTerm, setSearchTerm] = useState("");

    const selectIndustry = (industryId: string) => {
        setSelectedIndustry(industryId);
        onIndustryChange?.(industryId);
        onClose?.();
    };

    // 검색 필터링
    const filteredIndustries = industries.filter((industry) =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative z-50">
            {/* 사진과 유사한 모달 디자인 */}
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl mx-auto max-h-[80vh] flex flex-col">
                {/* 헤더 버튼 */}
                <div className="mb-4">
                    <button
                        className="w-full bg-gray-light text-gray-dark font-semibold py-4 px-6 rounded-full flex items-center justify-between hover:bg-gray-medium transition-colors"
                        onClick={onClose}
                    >
                        <span className="text-sm lg:text-base">
                            해당하는 업종을 선택하세요
                        </span>
                        <svg
                            className="w-4 h-3 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>

                {/* 검색 입력 */}
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="업종을 검색하세요..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent text-sm"
                        />
                        <svg
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* 업종 라디오 버튼 목록 */}
                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-2 max-h-80">
                        {filteredIndustries.length > 0 ? (
                            filteredIndustries.map((industry) => (
                                <label
                                    key={industry.id}
                                    className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                                >
                                    <div className="relative flex-shrink-0">
                                        <input
                                            type="radio"
                                            name="industry"
                                            value={industry.id}
                                            checked={
                                                selectedIndustry === industry.id
                                            }
                                            onChange={() =>
                                                selectIndustry(industry.id)
                                            }
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                                                selectedIndustry === industry.id
                                                    ? "border-primary-purple bg-primary-purple"
                                                    : "border-gray-300"
                                            }`}
                                        >
                                            {selectedIndustry ===
                                                industry.id && (
                                                <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span
                                            className={`text-sm font-medium transition-colors block ${
                                                selectedIndustry === industry.id
                                                    ? "text-primary-purple font-semibold"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {industry.name}
                                        </span>
                                    </div>
                                </label>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-sm">검색 결과가 없습니다.</p>
                                <p className="text-xs mt-1">
                                    다른 키워드로 검색해보세요.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* 업종 개수 표시 */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        {searchTerm ? (
                            <>검색 결과: {filteredIndustries.length}개</>
                        ) : (
                            <>전체 {industries.length}개 업종</>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
