"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import GallerySection from "@/components/customer/gallery-section";

interface Gallery {
    id: number;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    eventDate?: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    imageCount: number; // 총 이미지 개수
    images: Array<{
        id: number;
        imageUrl: string;
        fileName?: string;
        alt?: string;
        order: number;
    }>;
}

export default function GalleryPage() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/galleries`
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
                    throw new Error(
                        data.error || "갤러리를 불러올 수 없습니다."
                    );
                }

                setGalleries(data.galleries);
            } catch (err) {
                console.error("갤러리 조회 오류:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "갤러리를 불러오는 중 오류가 발생했습니다."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGalleries();
    }, []);

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero Section */}
            <CustomerHero
                currentPage="gallery"
                title="갤러리"
                description="리브뮤직 활동 사진을 소개합니다"
            />

            {/* Content Section */}
            <section className="bg-white py-6 sm:py-8 lg:py-12 2xl:py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-12 2xl:mb-16">
                    {loading ? (
                        <GallerySkeleton />
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
                        <GallerySection galleries={galleries} />
                    )}
                </div>
            </section>
        </PageLayout>
    );
}

function GallerySkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
            ))}
        </div>
    );
}
