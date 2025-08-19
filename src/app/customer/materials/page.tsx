"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import MaterialSection from "@/components/customer/material-section";
import MaterialPasswordGate from "@/components/customer/material-password-gate";

interface Material {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    category: string;
    isImportant: boolean;
    isActive: boolean;
    views: number;
    downloads: number;
    createdAt: string;
    updatedAt: string;
}

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // 인증 상태 확인
    useEffect(() => {
        const checkAuthentication = () => {
            // URL에서 토큰 확인
            const urlParams = new URLSearchParams(window.location.search);
            const urlToken = urlParams.get("token");

            // 로컬 스토리지에서 토큰 확인
            const storedToken = localStorage.getItem("materials-access-token");

            const token = urlToken || storedToken;

            if (token) {
                setAccessToken(token);
                setIsAuthenticated(true);
            }

            setCheckingAuth(false);
        };

        checkAuthentication();
    }, []);

    // 자료 데이터 가져오기 (인증된 상태에서만)
    useEffect(() => {
        if (!isAuthenticated || !accessToken) return;

        const fetchMaterials = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/materials?token=${accessToken}`
                );

                // Content-Type 확인
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    console.error("Non-JSON response:", text);
                    throw new Error(
                        "서버에서 올바르지 않은 응답을 받았습니다."
                    );
                }

                const data = await response.json();

                if (!response.ok) {
                    // 401 오류 (인증 실패)인 경우 토큰 삭제하고 재인증 요구
                    if (response.status === 401) {
                        console.log(
                            "토큰이 만료되었습니다. 재인증이 필요합니다."
                        );
                        localStorage.removeItem("materials-access-token");
                        setAccessToken(null);
                        setIsAuthenticated(false);
                        setError(
                            "인증이 만료되었습니다. 다시 비밀번호를 입력해주세요."
                        );
                        return;
                    }

                    throw new Error(
                        data.error || "자료실을 불러올 수 없습니다."
                    );
                }

                setMaterials(data.materials);
            } catch (err) {
                console.error("자료실 조회 오류:", err);
                // 401 오류가 아닌 경우에만 일반 에러 처리
                if (
                    err instanceof Error &&
                    !err.message.includes("인증이 만료")
                ) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "자료실을 불러오는 중 오류가 발생했습니다."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, [isAuthenticated, accessToken]);

    const handleAuthenticated = (token: string) => {
        setAccessToken(token);
        setIsAuthenticated(true);
    };

    // 인증 확인 중이면 로딩 표시
    if (checkingAuth) {
        return (
            <PageLayout
                headerOverlay={true}
                fullHeight={false}
                headerVariant="light"
            >
                <CustomerHero
                    currentPage="materials"
                    title="자료실"
                    description="리브뮤직 자료를 지금 확인해보세요"
                />
                <section className="bg-white py-8 lg:py-12 2xl:py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MaterialSkeleton />
                    </div>
                </section>
            </PageLayout>
        );
    }

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero Section */}
            <CustomerHero
                currentPage="materials"
                title="자료실"
                description={
                    isAuthenticated
                        ? "리브뮤직 자료를 지금 확인해보세요"
                        : "자료실 접근을 위해 비밀번호를 입력해주세요"
                }
            />

            {/* Content Section */}
            <section className="bg-white py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!isAuthenticated ? (
                        <MaterialPasswordGate
                            onAuthenticated={handleAuthenticated}
                        />
                    ) : loading ? (
                        <MaterialSkeleton />
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
                        <MaterialSection
                            materials={materials}
                            accessToken={accessToken ?? undefined}
                        />
                    )}
                </div>
            </section>
        </PageLayout>
    );
}

function MaterialSkeleton() {
    return (
        <div className="space-y-8">
            {/* 검색 박스 스켈레톤 */}
            <div className="mb-8">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* 자료 목록 스켈레톤 */}
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
