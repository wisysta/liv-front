"use client";

import { useState } from "react";
import Link from "next/link";

interface IndustryType {
    id: string;
    name: string;
    data: PricingData[];
}

interface PricingData {
    area: string;
    copyright: string;
    producer: string;
    performer: string;
    total: string;
}

const industryData: IndustryType[] = [
    {
        id: "coffee",
        name: "커피전문점",
        data: [
            {
                area: "50㎡-100㎡",
                copyright: "2,000원",
                producer: "1,100원",
                performer: "1,000원",
                total: "4,100원",
            },
            {
                area: "100㎡-200㎡",
                copyright: "3,600원",
                producer: "1,980원",
                performer: "1,800원",
                total: "7,380원",
            },
            {
                area: "200㎡-300㎡",
                copyright: "4,900원",
                producer: "2,695원",
                performer: "2,450원",
                total: "10,045원",
            },
            {
                area: "300㎡-500㎡",
                copyright: "6,200원",
                producer: "3,410원",
                performer: "3,100원",
                total: "12,710원",
            },
            {
                area: "500㎡-1000㎡",
                copyright: "7,800원",
                producer: "4,290원",
                performer: "3,900원",
                total: "15,990원",
            },
            {
                area: "1000㎡ 이상",
                copyright: "10,000원",
                producer: "5,500원",
                performer: "5,000원",
                total: "20,500원",
            },
        ],
    },
    {
        id: "restaurant",
        name: "일반음식점",
        data: [
            {
                area: "50㎡-100㎡",
                copyright: "1,800원",
                producer: "990원",
                performer: "900원",
                total: "3,690원",
            },
            {
                area: "100㎡-200㎡",
                copyright: "3,200원",
                producer: "1,760원",
                performer: "1,600원",
                total: "6,560원",
            },
            {
                area: "200㎡-300㎡",
                copyright: "4,400원",
                producer: "2,420원",
                performer: "2,200원",
                total: "9,020원",
            },
            {
                area: "300㎡-500㎡",
                copyright: "5,600원",
                producer: "3,080원",
                performer: "2,800원",
                total: "11,480원",
            },
            {
                area: "500㎡-1000㎡",
                copyright: "7,000원",
                producer: "3,850원",
                performer: "3,500원",
                total: "14,350원",
            },
            {
                area: "1000㎡ 이상",
                copyright: "9,000원",
                producer: "4,950원",
                performer: "4,500원",
                total: "18,450원",
            },
        ],
    },
    {
        id: "pub",
        name: "주점",
        data: [
            {
                area: "50㎡-100㎡",
                copyright: "2,200원",
                producer: "1,210원",
                performer: "1,100원",
                total: "4,510원",
            },
            {
                area: "100㎡-200㎡",
                copyright: "4,000원",
                producer: "2,200원",
                performer: "2,000원",
                total: "8,200원",
            },
            {
                area: "200㎡-300㎡",
                copyright: "5,400원",
                producer: "2,970원",
                performer: "2,700원",
                total: "11,070원",
            },
            {
                area: "300㎡-500㎡",
                copyright: "6,800원",
                producer: "3,740원",
                performer: "3,400원",
                total: "13,940원",
            },
            {
                area: "500㎡-1000㎡",
                copyright: "8,600원",
                producer: "4,730원",
                performer: "4,300원",
                total: "17,630원",
            },
            {
                area: "1000㎡ 이상",
                copyright: "11,000원",
                producer: "6,050원",
                performer: "5,500원",
                total: "22,550원",
            },
        ],
    },
];

interface IndustryTableProps {
    selectedIndustry?: string | null;
}

export function IndustryTable({ selectedIndustry = null }: IndustryTableProps) {
    // selectedIndustry가 null이면 디자인을 위해 커피전문점 데이터를 표시 (블러 처리됨)
    const displayIndustry = selectedIndustry || "coffee";
    const currentIndustry = industryData.find(
        (industry) => industry.id === displayIndustry
    );

    return (
        <div className="relative z-10 space-y-8">
            <div className="flex justify-between items-baseline">
                <div className="text-center space-y-4 flex gap-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-400">
                        업종
                    </h3>
                    <h2 className="text-2xl lg:text-3xl font-bold text-primary-purple">
                        {selectedIndustry
                            ? currentIndustry?.name
                            : "업종을 선택해주세요"}
                    </h2>
                </div>
                {/* VAT 포함 안내 */}
                <div className="text-right mt-2">
                    <span className="text-sm text-gray-dark">*VAT 포함</span>
                </div>
            </div>

            {/* 공연권료 표 */}
            <div className="overflow-x-auto">
                <div className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 테이블 헤더 */}
                    <div className="bg-gray-light border-b border-gray-medium">
                        <div className="grid grid-cols-5 gap-4 px-6 py-4">
                            <div className="font-semibold text-gray-dark text-sm lg:text-base">
                                면적(㎡)
                            </div>
                            <div className="font-semibold text-gray-dark text-sm lg:text-base text-right">
                                저작권자
                            </div>
                            <div className="font-semibold text-gray-dark text-sm lg:text-base text-right">
                                제작자
                            </div>
                            <div className="font-semibold text-gray-dark text-sm lg:text-base text-right">
                                실연자
                            </div>
                            <div className="font-bold text-primary-purple text-sm lg:text-base text-right">
                                공연권료 합계
                            </div>
                        </div>
                    </div>

                    {/* 테이블 바디 */}
                    <div className="divide-y divide-gray-200">
                        {currentIndustry?.data.map((row, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-5 gap-4 px-6 py-4 transition-all duration-500 ${
                                    selectedIndustry === "coffee"
                                        ? "opacity-100"
                                        : "opacity-30 blur-sm"
                                } hover:bg-gray-50`}
                            >
                                <div className="font-medium text-background-dark text-sm lg:text-base">
                                    {row.area}
                                </div>
                                <div className="text-background-dark text-sm lg:text-base text-right">
                                    {row.copyright}
                                </div>
                                <div className="text-background-dark text-sm lg:text-base text-right">
                                    {row.producer}
                                </div>
                                <div className="text-background-dark text-sm lg:text-base text-right">
                                    {row.performer}
                                </div>
                                <div className="font-bold text-primary-purple text-sm lg:text-base text-right">
                                    {row.total}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 문의 섹션 */}
            <div className="flex items-center justify-center gap-2 text-background-dark">
                <span className="font-semibold text-sm lg:text-base flex items-center gap-2">
                    기타 문의사항은{" "}
                    <Link
                        href="tel:1811-7696"
                        className="inline-flex items-center gap-2 bg-gray-light rounded-full px-4 py-2 mx-auto max-w-md
                            "
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                        1811-7696
                    </Link>{" "}
                    으로 연락주세요
                </span>
            </div>
        </div>
    );
}
