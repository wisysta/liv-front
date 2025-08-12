"use client";

import { useState } from "react";
import Link from "next/link";
import industryPricingData from "@/data/industry-pricing.json";

interface IndustryType {
    id: string;
    name: string;
    type: string;
    data: PricingData[];
}

interface PricingData {
    [key: string]: string;
}

interface TableColumn {
    key: string;
    title: string;
    align: "left" | "right" | "center";
    type: "text" | "price";
    highlight?: boolean;
}

interface TableType {
    columns: TableColumn[];
}

// JSON 데이터를 타입에 맞게 변환
const industryData: IndustryType[] =
    industryPricingData.industries as IndustryType[];
const tableTypes: Record<string, TableType> =
    industryPricingData.tableTypes as Record<string, TableType>;

interface IndustryTableProps {
    selectedIndustry?: string | null;
}

export function IndustryTable({ selectedIndustry = null }: IndustryTableProps) {
    // selectedIndustry가 null이면 디자인을 위해 커피전문점 데이터를 표시 (블러 처리됨)
    const displayIndustry = selectedIndustry || "coffee";
    const currentIndustry = industryData.find(
        (industry) => industry.id === displayIndustry
    );

    // 현재 업종의 테이블 타입에 따른 컬럼 정의 가져오기
    const tableType = currentIndustry?.type || "standard";
    const columns = tableTypes[tableType]?.columns || [];

    const getAlignmentClass = (align: string) => {
        switch (align) {
            case "right":
                return "text-right";
            case "center":
                return "text-center";
            default:
                return "text-left";
        }
    };

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
                        <div
                            className={`grid grid-cols-${columns.length} gap-4 px-6 py-4`}
                        >
                            {columns.map((column) => (
                                <div
                                    key={column.key}
                                    className={`font-semibold text-sm lg:text-base ${
                                        column.highlight
                                            ? "text-primary-purple font-bold"
                                            : "text-gray-dark"
                                    } ${getAlignmentClass(column.align)}`}
                                >
                                    {column.title}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 테이블 바디 */}
                    <div className="divide-y divide-gray-200">
                        {currentIndustry?.data.map((row, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-${
                                    columns.length
                                } gap-4 px-6 py-4 transition-all duration-500 ${
                                    selectedIndustry === "coffee"
                                        ? "opacity-100"
                                        : "opacity-30 blur-sm"
                                } hover:bg-gray-50`}
                            >
                                {columns.map((column) => (
                                    <div
                                        key={column.key}
                                        className={`text-sm lg:text-base ${
                                            column.highlight
                                                ? "font-bold text-primary-purple"
                                                : column.key === "area"
                                                ? "font-medium text-background-dark"
                                                : "text-background-dark"
                                        } ${getAlignmentClass(column.align)}`}
                                    >
                                        {row[column.key]}
                                    </div>
                                ))}
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
