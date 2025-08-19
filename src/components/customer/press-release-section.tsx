"use client";

import { useState, useMemo } from "react";
import { PressRelease } from "@/actions/press-release-actions";

interface PressReleaseSectionProps {
    initialPressReleases: PressRelease[];
}

export default function PressReleaseSection({
    initialPressReleases,
}: PressReleaseSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // 보도자료 필터링 (검색어 기준)
    const filteredPressReleases = useMemo(() => {
        let filtered = initialPressReleases;

        // 검색 필터
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (pressRelease) =>
                    pressRelease.title.toLowerCase().includes(query) ||
                    pressRelease.content.toLowerCase().includes(query) ||
                    pressRelease.pressNumber.toLowerCase().includes(query)
            );
        }

        // 발행일 기준 최신순 정렬
        return filtered.sort((a, b) => {
            return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            );
        });
    }, [initialPressReleases, searchQuery]);

    const handlePressReleaseClick = async (pressRelease: PressRelease) => {
        // 조회수 증가
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/press-releases/${pressRelease.id}?incrementViews=true`
            );
        } catch (error) {
            console.error("조회수 증가 오류 :", error);
        }

        // 외부 링크로 이동
        window.open(pressRelease.newsLink, "_blank", "noopener,noreferrer");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <div className="space-y-8">
            {/* 검색 박스 */}
            <div className="mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
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
                    <input
                        type="text"
                        placeholder="제목을 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-8 pr-0 py-3 border-0 border-b border-gray-200 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-purple text-background-dark font-medium transition-all duration-200"
                    />
                </div>
            </div>

            {/* 보도자료 그리드 */}
            {filteredPressReleases.length === 0 ? (
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-background-dark">
                        검색 결과가 없습니다
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        다른 키워드로 검색해보세요.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPressReleases.map((pressRelease) => (
                        <PressReleaseCard
                            key={pressRelease.id}
                            pressRelease={pressRelease}
                            onClick={() =>
                                handlePressReleaseClick(pressRelease)
                            }
                            formatDate={formatDate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

interface PressReleaseCardProps {
    pressRelease: PressRelease;
    onClick: () => void;
    formatDate: (dateString: string) => string;
}

function PressReleaseCard({
    pressRelease,
    onClick,
    formatDate,
}: PressReleaseCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-primary-purple/30 transition-all duration-200 cursor-pointer group"
        >
            {/* 제목 */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary-purple transition-colors">
                {pressRelease.title}
            </h3>

            {/* 내용 미리보기 */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {pressRelease.content}
            </p>

            {/* 메타 정보 */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{formatDate(pressRelease.publishedAt)}</span>
                <div className="flex items-center space-x-1">
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                    <span>{pressRelease.views.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
