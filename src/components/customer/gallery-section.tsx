"use client";

import { useState } from "react";
import Image from "next/image";
import {
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

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

interface GallerySectionProps {
    galleries: Gallery[];
}

export default function GallerySection({ galleries }: GallerySectionProps) {
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(
        null
    );
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [fullGalleryImages, setFullGalleryImages] = useState<
        Gallery["images"]
    >([]);
    const [loadingImages, setLoadingImages] = useState(false);

    const loadFullGalleryImages = async (galleryId: number) => {
        try {
            setLoadingImages(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/galleries/${galleryId}`
            );

            if (!response.ok) {
                throw new Error("갤러리 이미지를 불러올 수 없습니다.");
            }

            const data = await response.json();
            setFullGalleryImages(data.gallery.images || []);
        } catch (error) {
            console.error("갤러리 이미지 로딩 오류:", error);
            setFullGalleryImages([]);
        } finally {
            setLoadingImages(false);
        }
    };

    const openModal = (gallery: Gallery) => {
        setSelectedGallery(gallery);
        setSelectedImageIndex(0);
        // 스크롤 방지
        document.body.style.overflow = "hidden";

        // 백그라운드에서 전체 이미지 로드 (비동기)
        loadFullGalleryImages(gallery.id);
    };

    const closeModal = () => {
        setSelectedGallery(null);
        setSelectedImageIndex(0);
        setFullGalleryImages([]);
        // 스크롤 복원
        document.body.style.overflow = "unset";
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (!selectedGallery) return;

        // 전체 이미지가 로드되었으면 전체 이미지 기준, 아니면 썸네일 기준
        const imageCount =
            fullGalleryImages.length > 0
                ? fullGalleryImages.length
                : selectedGallery.imageCount;

        if (imageCount === 0) return;

        if (direction === "prev") {
            setSelectedImageIndex(
                selectedImageIndex === 0
                    ? imageCount - 1
                    : selectedImageIndex - 1
            );
        } else {
            setSelectedImageIndex(
                selectedImageIndex === imageCount - 1
                    ? 0
                    : selectedImageIndex + 1
            );
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            closeModal();
        } else if (e.key === "ArrowLeft") {
            navigateImage("prev");
        } else if (e.key === "ArrowRight") {
            navigateImage("next");
        }
    };

    if (galleries.length === 0) {
        return (
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-background-dark">
                    갤러리가 비어있습니다
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    준비된 갤러리 이미지가 없습니다.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* 갤러리 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleries.map((gallery) => {
                    const thumbnailUrl =
                        gallery.thumbnailUrl?.trim() ||
                        gallery.images?.[0]?.imageUrl?.trim();
                    const eventDate = gallery.eventDate
                        ? new Date(gallery.eventDate).toLocaleDateString(
                              "ko-KR",
                              {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              }
                          )
                        : null;

                    return (
                        <div
                            key={gallery.id}
                            className="group cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            onClick={() => openModal(gallery)}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                                {thumbnailUrl && thumbnailUrl.length > 0 ? (
                                    <Image
                                        src={thumbnailUrl}
                                        alt={gallery.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        placeholder="blur"
                                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <svg
                                            className="w-12 h-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                                        <svg
                                            className="w-6 h-6 text-background-dark"
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
                            </div>

                            {/* 갤러리 정보 */}
                            <div className="p-4 md:p-5 lg:p-6">
                                <h3 className="font-semibold text-xl md:text-2xl lg:text-2xl text-gray-900 mb-2 md:mb-3 line-clamp-2">
                                    {gallery.title}
                                </h3>
                                {gallery.description && (
                                    <p className="text-base md:text-base text-gray-600 line-clamp-2 mb-2 md:mb-3">
                                        {gallery.description}
                                    </p>
                                )}
                                {eventDate && (
                                    <p className="text-sm md:text-sm text-gray-500">
                                        {eventDate}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 갤러리 이미지 모달 */}
            {selectedGallery && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                    onKeyDown={handleKeyDown}
                    tabIndex={-1}
                >
                    {/* 닫기 버튼 */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                    >
                        <XMarkIcon className="w-8 h-8" />
                    </button>

                    {/* 갤러리 제목 */}
                    <div className="absolute top-4 left-4 text-white z-10">
                        <h2 className="text-xl font-semibold">
                            {selectedGallery.title}
                        </h2>
                        {selectedGallery.eventDate && (
                            <p className="text-sm text-gray-300 mt-1">
                                {new Date(
                                    selectedGallery.eventDate
                                ).toLocaleDateString("ko-KR", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        )}
                    </div>

                    {/* 이미지가 있는 경우에만 네비게이션 버튼 표시 */}
                    {selectedGallery.imageCount > 1 && (
                        <>
                            {/* 이전 버튼 */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage("prev");
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                            >
                                <ChevronLeftIcon className="w-8 h-8" />
                            </button>

                            {/* 다음 버튼 */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigateImage("next");
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                            >
                                <ChevronRightIcon className="w-8 h-8" />
                            </button>
                        </>
                    )}

                    {/* 이미지 컨테이너 */}
                    <div
                        className="relative max-w-4xl max-h-[80vh] mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {(() => {
                            // 전체 이미지가 로드되었고 해당 인덱스의 이미지가 있는 경우
                            if (
                                fullGalleryImages.length > 0 &&
                                fullGalleryImages[selectedImageIndex]
                            ) {
                                const currentImage =
                                    fullGalleryImages[selectedImageIndex];
                                return (
                                    <>
                                        <Image
                                            src={currentImage.imageUrl}
                                            alt={
                                                currentImage.fileName ||
                                                currentImage.alt ||
                                                selectedGallery.title
                                            }
                                            width={800}
                                            height={600}
                                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                                            priority
                                        />
                                        {/* 이미지 정보 및 페이지네이션 */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                                            <span className="text-white text-sm">
                                                {selectedImageIndex + 1} /{" "}
                                                {fullGalleryImages.length}
                                            </span>
                                        </div>
                                    </>
                                );
                            }

                            // 전체 이미지가 아직 로드되지 않았지만 썸네일이 있는 경우 (첫 번째 이미지만)
                            if (
                                selectedImageIndex === 0 &&
                                selectedGallery.images.length > 0 &&
                                selectedGallery.images[0]
                            ) {
                                const thumbnailImage =
                                    selectedGallery.images[0];
                                return (
                                    <>
                                        <Image
                                            src={thumbnailImage.imageUrl}
                                            alt={
                                                thumbnailImage.fileName ||
                                                thumbnailImage.alt ||
                                                selectedGallery.title
                                            }
                                            width={800}
                                            height={600}
                                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                                            priority
                                        />
                                        {/* 로딩 오버레이 */}
                                        {loadingImages && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                                <div className="text-center text-white">
                                                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                                    <p className="text-sm">
                                                        전체 이미지를 불러오는
                                                        중...
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                        {/* 이미지 정보 및 페이지네이션 */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                                            <span className="text-white text-sm">
                                                {selectedImageIndex + 1} /{" "}
                                                {selectedGallery.imageCount}
                                            </span>
                                        </div>
                                    </>
                                );
                            }

                            // 썸네일도 없고 전체 이미지도 로드되지 않은 경우
                            return (
                                <div className="flex items-center justify-center w-full h-64">
                                    <div className="text-center text-white">
                                        {loadingImages ? (
                                            <>
                                                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                                <p>이미지를 불러오는 중...</p>
                                            </>
                                        ) : (
                                            <p>이미지를 사용할 수 없습니다.</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </>
    );
}
