"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import { Notice } from "@/actions/notice-actions";

export default function NoticeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [notice, setNotice] = useState<Notice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextNotice, setNextNotice] = useState<Notice | null>(null);
    const [prevNotice, setPrevNotice] = useState<Notice | null>(null);

    const noticeId = typeof params.id === "string" ? parseInt(params.id) : NaN;

    useEffect(() => {
        const fetchNoticeDetail = async () => {
            if (isNaN(noticeId)) {
                setError("잘못된 공지사항 ID입니다.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${noticeId}`
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
                        data.error || "공지사항을 불러올 수 없습니다."
                    );
                }

                setNotice(data.notice);
                setNextNotice(data.nextNotice);
                setPrevNotice(data.prevNotice);
            } catch (err) {
                console.error("공지사항 상세 조회 오류:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "공지사항을 불러오는 중 오류가 발생했습니다."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNoticeDetail();
    }, [noticeId]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const downloadFile = async (fileName: string, fileUrl: string) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("파일 다운로드 오류:", error);
            alert("파일 다운로드 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return (
            <PageLayout
                headerOverlay={true}
                fullHeight={false}
                headerVariant="light"
            >
                <CustomerHero
                    currentPage="notice"
                    title="공지사항"
                    description="리브뮤직 고객센터에서 알려드립니다"
                />
                <section className="bg-white py-6 sm:py-8 lg:py-12 2xl:py-16">
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

    if (error || !notice) {
        return (
            <PageLayout
                headerOverlay={true}
                fullHeight={false}
                headerVariant="light"
            >
                <CustomerHero currentPage="notice" />
                <section className="bg-white py-6 sm:py-8 lg:py-12 2xl:py-16">
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
                                onClick={() => router.push("/customer/notice")}
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
            <CustomerHero currentPage="notice" />

            <section className="bg-white py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 제목 및 메타 정보 */}
                    <div className="border-b border-gray-200 pb-6 mb-8">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-background-dark mb-4">
                            {notice.title}
                        </h1>
                        <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                            <span>{formatDate(notice.createdAt)}</span>
                            <span className="mx-2">•</span>
                            <span>조회수 {notice.views}</span>
                        </div>
                    </div>

                    {/* 첨부파일 */}
                    {notice.attachments && notice.attachments.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                                첨부파일
                            </h3>
                            <div className="space-y-2">
                                {notice.attachments.map(
                                    (attachment: any, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-500 mr-3"
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
                                            <button
                                                onClick={() =>
                                                    downloadFile(
                                                        attachment.fileName,
                                                        attachment.url
                                                    )
                                                }
                                                className="text-primary-purple hover:text-primary-purple/80 transition-colors"
                                            >
                                                {attachment.fileName}
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {/* 헤더 이미지 */}
                    {notice.headerImage && (
                        <div className="mb-8">
                            <div className="rounded-lg overflow-hidden max-w-sm mr-auto">
                                <img
                                    src={notice.headerImage}
                                    alt={notice.title}
                                    className="w-full h-auto object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    )}

                    {/* 내용 */}
                    <div className="prose max-w-none mb-12">
                        <div
                            className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: notice.content }}
                        />
                    </div>

                    {/* 목록 보기 버튼 */}
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={() => router.push("/customer/notice")}
                            className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gray-100 text-background-dark rounded-full hover:bg-gray-200 transition-colors font-medium"
                        >
                            목록 보기
                        </button>
                    </div>

                    {/* 이전글/다음글 */}
                    <div className="border-t border-gray-200 pt-6">
                        {nextNotice && (
                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <div className="flex-1">
                                    <span className="text-sm text-gray-500">
                                        다음글
                                    </span>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/customer/notice/${nextNotice.id}`
                                            )
                                        }
                                        className="block text-background-dark hover:text-primary-purple transition-colors mt-1"
                                    >
                                        {nextNotice.title}
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 ml-4">
                                    {formatDate(nextNotice.createdAt)}
                                </div>
                            </div>
                        )}
                        {prevNotice && (
                            <div className="flex items-center justify-between py-4">
                                <div className="flex-1">
                                    <span className="text-sm text-gray-500">
                                        이전글
                                    </span>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/customer/notice/${prevNotice.id}`
                                            )
                                        }
                                        className="block text-background-dark hover:text-primary-purple transition-colors mt-1"
                                    >
                                        {prevNotice.title}
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 ml-4">
                                    {formatDate(prevNotice.createdAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
