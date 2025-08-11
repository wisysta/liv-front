"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import PressReleaseSection from "@/components/customer/press-release-section";
import {
    PressRelease,
    getActivePressReleases,
} from "@/actions/press-release-actions";

export default function PressReleasePage() {
    const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPressReleases = async () => {
            try {
                setLoading(true);
                const { pressReleases } = await getActivePressReleases();
                setPressReleases(pressReleases);
            } catch (err) {
                console.error("보도자료 조회 오류:", err);
                setError("보도자료를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPressReleases();
    }, []);

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero Section */}
            <CustomerHero
                currentPage="press-release"
                title="보도자료"
                description="리브뮤직 소식을 알려드립니다"
            />

            {/* Content Section */}
            <section className="bg-white py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <PressReleaseSkeleton />
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 mb-4">
                                <svg
                                    className="mx-auto h-12 w-12"
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
                            <p className="text-gray-600">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-primary-purple text-white rounded-lg hover:bg-primary-purple/90 transition-colors"
                            >
                                다시 시도
                            </button>
                        </div>
                    ) : (
                        <PressReleaseSection
                            initialPressReleases={pressReleases}
                        />
                    )}
                </div>
            </section>
        </PageLayout>
    );
}

function PressReleaseSkeleton() {
    return (
        <div className="space-y-8">
            {/* 검색 박스 스켈레톤 */}
            <div className="mb-8">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
            </div>

            {/* 보도자료 카드 스켈레톤 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                        {/* 글번호 스켈레톤 */}
                        <div className="mb-4">
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* 제목 스켈레톤 */}
                        <div className="mb-4 space-y-2">
                            <div className="h-5 bg-gray-200 rounded animate-pulse" />
                            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* 내용 스켈레톤 */}
                        <div className="mb-4 space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* 메타 정보 스켈레톤 */}
                        <div className="flex justify-between">
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
