"use client";

import { useState, useRef, useCallback } from "react";
import { DocumentIcon, TrashIcon } from "@heroicons/react/24/outline";

interface UploadedFile {
    id: string;
    name: string;
    storedName?: string;
    url: string;
    size: number;
}

interface FileUploadProps {
    onFilesChange: (files: UploadedFile[]) => void;
    onUploadingChange?: (isUploading: boolean) => void; // 업로드 상태 콜백 추가
    maxFiles?: number;
    maxSize?: number; // bytes
    className?: string;
}

export function FileUpload({
    onFilesChange,
    onUploadingChange,
    maxFiles = 5,
    maxSize = 10 * 1024 * 1024, // 10MB
    className = "",
}: FileUploadProps) {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const uploadFile = async (file: File): Promise<UploadedFile | null> => {
        try {
            // 1. Pre-signed URL 요청
            const urlParams = new URLSearchParams({
                fileName: file.name,
                fileType: file.type,
                fileSize: file.size.toString(),
            });

            const signedUrlResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upload?${urlParams}`,
                {
                    method: "GET",
                }
            );

            if (!signedUrlResponse.ok) {
                const error = await signedUrlResponse.json();
                throw new Error(error.error || "업로드 URL 생성 실패");
            }

            const { signedUrl, fileUrl, fileName, originalName } =
                await signedUrlResponse.json();

            const uploadResponse = await fetch(signedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadResponse.ok) {
                throw new Error("파일 업로드 실패");
            }

            // 3. 업로드 완료 확인
            const confirmResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fileName,
                        originalName,
                        fileSize: file.size,
                    }),
                }
            );

            if (!confirmResponse.ok) {
                const error = await confirmResponse.json();
                throw new Error(error.error || "업로드 확인 실패");
            }

            const result = await confirmResponse.json();

            return {
                id: Date.now().toString() + Math.random().toString(36),
                name: result.fileName, // 원본 파일명 (표시용)
                storedName: result.storedFileName, // 실제 저장된 파일명
                url: result.fileUrl,
                size: file.size,
            };
        } catch (error) {
            console.error("파일 업로드 오류:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "파일 업로드에 실패했습니다."
            );
            return null;
        }
    };

    const handleFiles = useCallback(
        async (fileList: FileList) => {
            if (files.length >= maxFiles) {
                alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
                return;
            }

            const filesToUpload = Array.from(fileList).slice(
                0,
                maxFiles - files.length
            );

            // 파일 크기 검증
            for (const file of filesToUpload) {
                if (file.size > maxSize) {
                    alert(
                        `${file.name}의 크기가 ${formatFileSize(
                            maxSize
                        )}를 초과합니다.`
                    );
                    return;
                }
            }

            setUploading(true);
            onUploadingChange?.(true);

            try {
                const uploadPromises = filesToUpload.map(uploadFile);
                const uploadedFiles = await Promise.all(uploadPromises);
                const successfulUploads = uploadedFiles.filter(
                    (file): file is UploadedFile => file !== null
                );

                const newFiles = [...files, ...successfulUploads];
                setFiles(newFiles);
                onFilesChange(newFiles);
            } catch (error) {
                console.error("파일 업로드 오류:", error);
            } finally {
                setUploading(false);
                onUploadingChange?.(false);
            }
        },
        [files, maxFiles, maxSize, onFilesChange, onUploadingChange]
    );

    const removeFile = (fileId: string) => {
        const newFiles = files.filter((file) => file.id !== fileId);
        setFiles(newFiles);
        onFilesChange(newFiles);
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFiles(e.dataTransfer.files);
            }
        },
        [handleFiles]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            if (e.target.files && e.target.files[0]) {
                handleFiles(e.target.files);
            }
        },
        [handleFiles]
    );

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    return (
        <div className={`space-y-4 ${className}`}>
            {/* 파일 업로드 영역 */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                        ? "border-primary-purple bg-primary-purple/5"
                        : "border-gray-300 hover:border-primary-purple/50"
                } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleChange}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
                />
                <div className="space-y-2">
                    <DocumentIcon className="h-8 w-8 text-gray-400 mx-auto" />
                    <div className="text-sm">
                        <button
                            type="button"
                            className="font-medium text-primary-purple hover:text-primary-purple/80"
                            disabled={uploading}
                        >
                            + 파일첨부
                        </button>
                        <p className="text-gray-500 mt-1">
                            또는 파일을 여기로 드래그하세요
                        </p>
                    </div>
                </div>
                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-primary-purple border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-gray-600">
                                업로드 중...
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* 업로드된 파일 목록 */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                        >
                            <div className="flex items-center space-x-3">
                                <DocumentIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm font-medium text-background-dark">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* 파일 정보 */}
            <div className="text-xs text-gray-500 space-y-1">
                <p>
                    첨부파일은 최대 {maxFiles}개, {formatFileSize(maxSize)}까지
                    등록 가능합니다.
                </p>
                <div className="flex items-center space-x-2">
                    <span
                        className={totalSize > 0 ? "text-primary-purple" : ""}
                    >
                        {formatFileSize(totalSize)}
                    </span>
                    <span>/</span>
                    <span>{formatFileSize(maxSize)}</span>
                </div>
            </div>
        </div>
    );
}
