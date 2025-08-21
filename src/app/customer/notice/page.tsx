"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import NoticeSection from "@/components/customer/notice-section";
import {
    Notice,
    getActiveNotices,
    getImportantNotices,
} from "@/actions/notice-actions";

export default function NoticePage() {
    const [allNotices, setAllNotices] = useState<Notice[]>([]);
    const [importantNotices, setImportantNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                setLoading(true);
                // 두 개의 API를 병렬로 호출
                const [allNoticesResult, importantNoticesResult] =
                    await Promise.all([
                        getActiveNotices({ page: 1, limit: 10 }),
                        getImportantNotices({ limit: 6 }),
                    ]);

                setAllNotices(allNoticesResult.notices);
                setImportantNotices(importantNoticesResult.notices);
            } catch (err) {
                console.error("공지사항 조회 오류:", err);
                setError("공지사항을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero Section */}
            <CustomerHero
                currentPage="notice"
                title="공지사항"
                description="리브뮤직 고객센터에서 알려드립니다"
            />

            {/* Content Section */}
            <section className="bg-white py-6 sm:py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <NoticeSkeleton />
                    ) : error ? (
                        <div className="text-center py-8 sm:py-12">
                            <div className="text-red-500 mb-4">
                                <svg
                                    className="mx-auto h-8 sm:h-12 w-8 sm:w-12"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600">
                                {error}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 sm:px-6 py-2 text-sm sm:text-base bg-primary-purple text-white rounded-lg hover:bg-primary-purple/90 transition-colors"
                            >
                                다시 시도
                            </button>
                        </div>
                    ) : (
                        <NoticeSection
                            allNotices={allNotices}
                            importantNotices={importantNotices}
                        />
                    )}
                </div>
            </section>
        </PageLayout>
    );
}

function NoticeSkeleton() {
    return (
        <div className="space-y-8">
            {/* 검색 박스 스켈레톤 */}
            <div className="mb-8">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* 공지사항 아이템 스켈레톤 */}
            <div className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="py-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                            </div>
                            <div className="flex-shrink-0 ml-4 pt-1">
                                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
