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
    imageUrl: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface GallerySectionProps {
    galleries: Gallery[];
}

export default function GallerySection({ galleries }: GallerySectionProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        // 스크롤 방지
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
        // 스크롤 복원
        document.body.style.overflow = "unset";
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImageIndex === null) return;

        if (direction === "prev") {
            setSelectedImageIndex(
                selectedImageIndex === 0
                    ? galleries.length - 1
                    : selectedImageIndex - 1
            );
        } else {
            setSelectedImageIndex(
                selectedImageIndex === galleries.length - 1
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
                {galleries.map((gallery, index) => (
                    <div
                        key={gallery.id}
                        className="group cursor-pointer"
                        onClick={() => openModal(index)}
                    >
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                            <Image
                                src={gallery.imageUrl}
                                alt={gallery.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo="
                            />
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
                    </div>
                ))}
            </div>

            {/* 이미지 모달 */}
            {selectedImageIndex !== null && (
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

                    {/* 이미지 컨테이너 */}
                    <div
                        className="relative max-w-4xl max-h-[80vh] mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedImageIndex !== null &&
                            galleries[selectedImageIndex] && (
                                <Image
                                    src={galleries[selectedImageIndex].imageUrl}
                                    alt={galleries[selectedImageIndex].title}
                                    width={800}
                                    height={600}
                                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                                    priority
                                />
                            )}

                        {/* 이미지 정보 */}
                        {selectedImageIndex !== null &&
                            galleries[selectedImageIndex] && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                                    <span className="text-white text-sm">
                                        {selectedImageIndex + 1} /{" "}
                                        {galleries.length}
                                    </span>
                                </div>
                            )}
                    </div>
                </div>
            )}
        </>
    );
}
