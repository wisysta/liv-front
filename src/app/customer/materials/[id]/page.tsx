"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
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

export default function MaterialDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [material, setMaterial] = useState<Material | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextMaterial, setNextMaterial] = useState<Material | null>(null);
    const [prevMaterial, setPrevMaterial] = useState<Material | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const materialId =
        typeof params.id === "string" ? parseInt(params.id) : NaN;

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

    useEffect(() => {
        if (!isAuthenticated || !accessToken) return;
        const fetchMaterialDetail = async () => {
            if (isNaN(materialId)) {
                setError("잘못된 자료 ID입니다.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/materials/${materialId}?token=${accessToken}`
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
                    // 401 오류 (인증 실패)인 경우 토큰 삭제하고 자료실 메인으로 이동
                    if (response.status === 401) {
                        console.log(
                            "토큰이 만료되었습니다. 자료실 메인으로 이동합니다."
                        );
                        localStorage.removeItem("materials-access-token");
                        router.push("/customer/materials");
                        return;
                    }

                    throw new Error(data.error || "자료를 불러올 수 없습니다.");
                }

                setMaterial(data.material);

                // 이전글/다음글 조회 (간단히 ID 기준으로)
                const allMaterialsResponse = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/materials?token=${accessToken}`
                );

                // 전체 목록 응답도 JSON 확인
                const allContentType =
                    allMaterialsResponse.headers.get("content-type");
                if (
                    !allContentType ||
                    !allContentType.includes("application/json")
                ) {
                    console.error("이전글/다음글 조회 실패: JSON이 아닌 응답");
                    // 이전글/다음글은 선택사항이므로 계속 진행
                } else if (allMaterialsResponse.ok) {
                    const allMaterials = await allMaterialsResponse.json();

                    if (allMaterials.materials) {
                        const currentIndex = allMaterials.materials.findIndex(
                            (m: Material) => m.id === materialId
                        );
                        if (currentIndex > 0) {
                            setNextMaterial(
                                allMaterials.materials[currentIndex - 1]
                            );
                        }
                        if (currentIndex < allMaterials.materials.length - 1) {
                            setPrevMaterial(
                                allMaterials.materials[currentIndex + 1]
                            );
                        }
                    }
                }
            } catch (err) {
                console.error("자료 상세 조회 오류:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "자료를 불러오는 중 오류가 발생했습니다."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMaterialDetail();
    }, [materialId, isAuthenticated, accessToken]);

    const handleAuthenticated = (token: string) => {
        setAccessToken(token);
        setIsAuthenticated(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleDownload = async () => {
        if (!material || !accessToken) return;

        try {
            // 다운로드 수 증가
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/materials/${material.id}?action=download&token=${accessToken}`,
                {
                    method: "PATCH",
                }
            );

            // 파일 다운로드
            const link = document.createElement("a");
            link.href = material.fileUrl;
            link.download = material.fileName;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // 다운로드 수 업데이트
            setMaterial((prev) =>
                prev ? { ...prev, downloads: prev.downloads + 1 } : null
            );
        } catch (error) {
            console.error("파일 다운로드 오류:", error);
            alert("파일 다운로드 중 오류가 발생했습니다.");
        }
    };

    // 인증 확인 중이거나 로딩 중이면 로딩 표시
    if (checkingAuth || loading) {
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
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded mb-4" />
                            <div className="h-4 bg-gray-200 rounded mb-6 w-1/4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                </section>
            </PageLayout>
        );
    }

    // 인증되지 않은 경우 비밀번호 입력 화면 표시
    if (!isAuthenticated) {
        return (
            <PageLayout
                headerOverlay={true}
                fullHeight={false}
                headerVariant="light"
            >
                <CustomerHero
                    currentPage="materials"
                    title="자료실"
                    description="자료실 접근을 위해 비밀번호를 입력해주세요"
                />
                <section className="bg-white py-8 lg:py-12 2xl:py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <MaterialPasswordGate
                            onAuthenticated={handleAuthenticated}
                        />
                    </div>
                </section>
            </PageLayout>
        );
    }

    if (error || !material) {
        return (
            <PageLayout
                headerOverlay={true}
                fullHeight={false}
                headerVariant="light"
            >
                <section className="bg-white py-8 lg:py-12 2xl:py-16">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={() =>
                                    router.push("/customer/materials")
                                }
                                className="px-6 py-2 bg-primary-purple text-white rounded-lg hover:bg-primary-purple/90 transition-colors"
                            >
                                목록으로 돌아가기
                            </button>
                        </div>
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
            <CustomerHero
                currentPage="materials"
                title="자료실"
                description="리브뮤직 자료를 지금 확인해보세요"
            />

            <section className="bg-white py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 제목 및 메타 정보 */}
                    <div className="border-b border-gray-200 pb-6 mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            {material.isImportant && (
                                <span className="text-xs font-bold text-white bg-primary-purple px-2 py-1 rounded uppercase tracking-wide">
                                    중요
                                </span>
                            )}
                            <span className="text-sm text-primary-purple font-medium bg-primary-purple/10 px-2 py-1 rounded">
                                {material.category}
                            </span>
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-background-dark mb-4">
                            {material.title}
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm space-x-4">
                            <span>{formatDate(material.createdAt)}</span>
                            <span>조회수 {material.views}</span>
                            <span>다운로드 {material.downloads}</span>
                        </div>
                    </div>

                    {/* 파일 정보 및 다운로드 */}
                    <div className="mb-8">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <svg
                                        className="w-8 h-8 text-primary-purple"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                        />
                                    </svg>
                                    <div>
                                        <h3 className="font-medium text-background-dark">
                                            {material.fileName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {formatFileSize(material.fileSize)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center space-x-2 px-6 py-3 bg-primary-purple text-white rounded-lg hover:bg-primary-purple/90 transition-colors font-medium"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <span>다운로드</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 내용 */}
                    <div className="prose max-w-none mb-12">
                        <div
                            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                                __html: material.description,
                            }}
                        />
                    </div>

                    {/* 목록 보기 버튼 */}
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={() => {
                                const url = accessToken
                                    ? `/customer/materials?token=${accessToken}`
                                    : "/customer/materials";
                                router.push(url);
                            }}
                            className="px-8 py-3 bg-gray-100 text-background-dark rounded-full hover:bg-gray-200 transition-colors font-medium"
                        >
                            목록 보기
                        </button>
                    </div>

                    {/* 이전글/다음글 */}
                    <div className="border-t border-gray-200 pt-6">
                        {nextMaterial && (
                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <div className="flex-1">
                                    <span className="text-sm text-gray-500">
                                        다음글
                                    </span>
                                    <button
                                        onClick={() => {
                                            const url = accessToken
                                                ? `/customer/materials/${nextMaterial.id}?token=${accessToken}`
                                                : `/customer/materials/${nextMaterial.id}`;
                                            router.push(url);
                                        }}
                                        className="block text-background-dark hover:text-primary-purple transition-colors mt-1"
                                    >
                                        {nextMaterial.title}
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 ml-4">
                                    {formatDate(nextMaterial.createdAt)}
                                </div>
                            </div>
                        )}
                        {prevMaterial && (
                            <div className="flex items-center justify-between py-4">
                                <div className="flex-1">
                                    <span className="text-sm text-gray-500">
                                        이전글
                                    </span>
                                    <button
                                        onClick={() => {
                                            const url = accessToken
                                                ? `/customer/materials/${prevMaterial.id}?token=${accessToken}`
                                                : `/customer/materials/${prevMaterial.id}`;
                                            router.push(url);
                                        }}
                                        className="block text-background-dark hover:text-primary-purple transition-colors mt-1"
                                    >
                                        {prevMaterial.title}
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 ml-4">
                                    {formatDate(prevMaterial.createdAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
