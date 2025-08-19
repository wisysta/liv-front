"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Notice, getActiveNotices } from "@/actions/notice-actions";

interface NoticeSectionProps {
    allNotices: Notice[];
    importantNotices: Notice[];
}

export default function NoticeSection({
    allNotices,
    importantNotices,
}: NoticeSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const [displayedNotices, setDisplayedNotices] =
        useState<Notice[]>(allNotices);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(allNotices.length >= 10);

    // 검색어가 있을 때만 전체 데이터에서 필터링
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return null;

        const query = searchQuery.toLowerCase();
        return [...allNotices, ...importantNotices]
            .filter((notice, index, array) => {
                // 중복 제거 (id 기준)
                const isFirstOccurrence =
                    array.findIndex((n) => n.id === notice.id) === index;
                return (
                    isFirstOccurrence &&
                    (notice.title.toLowerCase().includes(query) ||
                        notice.content.toLowerCase().includes(query))
                );
            })
            .sort((a, b) => {
                if (a.isImportant && !b.isImportant) return -1;
                if (!a.isImportant && b.isImportant) return 1;
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            });
    }, [allNotices, importantNotices, searchQuery]);

    // 더 많은 공지사항 로드
    const loadMoreNotices = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const nextPage = currentPage + 1;
            const { notices } = await getActiveNotices({
                page: nextPage,
                limit: 10,
            });

            if (notices.length > 0) {
                setDisplayedNotices((prev) => [...prev, ...notices]);
                setCurrentPage(nextPage);
                setHasMore(notices.length >= 10);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("추가 공지사항 로드 오류:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, currentPage]);

    const handleNoticeClick = (id: number) => {
        router.push(`/customer/notice/${id}`);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
                        placeholder="공지사항을 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-8 pr-0 py-3 border-0 border-b border-gray-200 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-purple text-background-dark font-medium transition-all duration-200"
                    />
                </div>
            </div>
            {/* 공지사항 목록 */}
            <div className="divide-y divide-gray-200">
                {(searchQuery.trim() && searchResults?.length === 0) ||
                (!searchQuery.trim() && displayedNotices.length === 0) ? (
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
                ) : searchQuery.trim() ? (
                    // 검색 결과 표시
                    searchResults?.map((notice) =>
                        notice.isImportant ? (
                            <ImportantNoticeItem
                                key={notice.id}
                                notice={notice}
                                onClick={() => handleNoticeClick(notice.id)}
                                formatDate={formatDate}
                            />
                        ) : (
                            <RegularNoticeItem
                                key={notice.id}
                                notice={notice}
                                onClick={() => handleNoticeClick(notice.id)}
                                formatDate={formatDate}
                            />
                        )
                    )
                ) : (
                    // 일반 목록 표시
                    <>
                        {/* 중요 공지사항들만 먼저 */}
                        {displayedNotices
                            .filter((notice) => notice.isImportant)
                            .map((notice) => (
                                <ImportantNoticeItem
                                    key={`main-important-${notice.id}`}
                                    notice={notice}
                                    onClick={() => handleNoticeClick(notice.id)}
                                    formatDate={formatDate}
                                />
                            ))}

                        {/* 전체 목록 (중요 + 일반) - 순서대로, 중요 배지 없음 */}
                        {displayedNotices.map((notice) => (
                            <RegularNoticeItem
                                key={`main-all-${notice.id}`}
                                notice={notice}
                                onClick={() => handleNoticeClick(notice.id)}
                                formatDate={formatDate}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* 더보기 버튼 (검색 중이 아니고, 더 로드할 데이터가 있을 때) */}
            {!searchQuery.trim() && hasMore && (
                <div className="text-center mt-8">
                    <button
                        onClick={loadMoreNotices}
                        disabled={loading}
                        className="px-6 py-3 bg-primary-purple text-white rounded-lg hover:bg-primary-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "로딩 중..." : "더보기"}
                    </button>
                </div>
            )}
        </div>
    );
}

interface NoticeItemProps {
    notice: Notice;
    onClick: () => void;
    formatDate: (dateString: string) => string;
}

function ImportantNoticeItem({ notice, onClick, formatDate }: NoticeItemProps) {
    return (
        <div className="py-6">
            <button
                onClick={onClick}
                className="w-full text-left hover:bg-gray-50/50 focus:outline-none transition-colors py-2 -mx-2 px-2 rounded-lg group"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <span className="text-xs font-bold text-white bg-primary-purple px-2 py-1 rounded uppercase tracking-wide">
                                중요
                            </span>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatDate(notice.createdAt)}</span>
                                <span>
                                    조회수: {notice.views.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-background-dark leading-relaxed group-hover:text-primary-purple transition-colors">
                            {notice.title}
                        </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4 pt-1">
                        <svg
                            className="h-5 w-5 text-gray-400 group-hover:text-primary-purple transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    );
}

function RegularNoticeItem({ notice, onClick, formatDate }: NoticeItemProps) {
    return (
        <div className="py-6">
            <button
                onClick={onClick}
                className="w-full text-left hover:bg-gray-50/50 focus:outline-none transition-colors py-2 -mx-2 px-2 rounded-lg group"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatDate(notice.createdAt)}</span>
                                <span>
                                    조회수: {notice.views.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-background-dark leading-relaxed group-hover:text-primary-purple transition-colors">
                            {notice.title}
                        </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4 pt-1">
                        <svg
                            className="h-5 w-5 text-gray-400 group-hover:text-primary-purple transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    );
}
