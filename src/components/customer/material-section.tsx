"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

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

interface MaterialSectionProps {
    materials: Material[];
}

export default function MaterialSection({ materials }: MaterialSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // 자료 필터링 (검색어 기준)
    const filteredMaterials = useMemo(() => {
        let filtered = materials;

        // 검색 필터
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (material) =>
                    material.title.toLowerCase().includes(query) ||
                    material.description.toLowerCase().includes(query) ||
                    material.fileName.toLowerCase().includes(query)
            );
        }

        // 중요자료를 상단에, 그 다음 최신순
        return filtered.sort((a, b) => {
            if (a.isImportant && !b.isImportant) return -1;
            if (!a.isImportant && b.isImportant) return 1;
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        });
    }, [materials, searchQuery]);

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

    const handleMaterialClick = (id: number) => {
        router.push(`/customer/materials/${id}`);
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
                        placeholder="자료를 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-8 pr-0 py-3 border-0 border-b border-gray-200 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-purple text-background-dark font-medium transition-all duration-200"
                    />
                </div>
            </div>

            {/* 자료 목록 */}
            <div className="divide-y divide-gray-200">
                {filteredMaterials.length === 0 ? (
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
                                d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
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
                    filteredMaterials.map((material) => (
                        <MaterialItem
                            key={material.id}
                            material={material}
                            onClick={() => handleMaterialClick(material.id)}
                            formatDate={formatDate}
                            formatFileSize={formatFileSize}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

interface MaterialItemProps {
    material: Material;
    onClick: () => void;
    formatDate: (dateString: string) => string;
    formatFileSize: (bytes: number) => string;
}

function MaterialItem({
    material,
    onClick,
    formatDate,
    formatFileSize,
}: MaterialItemProps) {
    return (
        <div className="py-6">
            <button
                onClick={onClick}
                className="w-full text-left hover:bg-gray-50/50 focus:outline-none transition-colors py-2 -mx-2 px-2 rounded-lg group"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-3 mb-3">
                            {material.isImportant && (
                                <span className="text-xs font-bold text-white bg-primary-purple px-2 py-1 rounded uppercase tracking-wide">
                                    중요
                                </span>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{formatDate(material.createdAt)}</span>
                                <span>
                                    조회수: {material.views.toLocaleString()}
                                </span>
                                <span>
                                    다운로드:{" "}
                                    {material.downloads.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-background-dark leading-relaxed group-hover:text-primary-purple transition-colors">
                            {material.title}
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
