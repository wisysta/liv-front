"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import { FileUpload } from "@/components/ui/file-upload";
import { PrivacyNotice } from "@/components/customer/privacy-notice";
import { createInquiry } from "@/actions/inquiry-actions";

interface UploadedFile {
    id: string;
    name: string;
    storedName?: string; // 실제 저장된 파일명
    url: string;
    size: number;
}

export default function InquiryPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        title: "",
        content: "",
    });
    const [attachments, setAttachments] = useState<UploadedFile[]>([]);
    const [privacyConsent, setPrivacyConsent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [isFileUploading, setIsFileUploading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 필수 필드 검증
        if (
            !formData.name ||
            !formData.email ||
            !formData.phone ||
            !formData.title ||
            !formData.content
        ) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        // 개인정보 동의 검증
        if (!privacyConsent) {
            alert("개인정보 수집·이용에 동의해주세요.");
            return;
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        // 휴대폰 번호 검증
        const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
            alert("올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)");
            return;
        }

        try {
            setSubmitting(true);

            await createInquiry({
                ...formData,
                attachments: attachments.map((file) => ({
                    fileName: file.name, // 원본 파일명 (표시용)
                    storedFileName: file.storedName || file.name, // 실제 저장된 파일명
                    fileUrl: file.url,
                    fileSize: file.size,
                })),
                privacyConsent,
            });

            alert(
                "문의가 성공적으로 접수되었습니다. 빠른 시간 내에 답변드리겠습니다."
            );

            // 폼 초기화
            setFormData({
                name: "",
                email: "",
                phone: "",
                title: "",
                content: "",
            });
            setAttachments([]);
            setPrivacyConsent(false);
        } catch (error) {
            console.error("문의 접수 오류:", error);
            alert(
                error instanceof Error
                    ? error.message
                    : "문의 접수 중 오류가 발생했습니다."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7)
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
            7,
            11
        )}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setFormData((prev) => ({ ...prev, phone: formatted }));
    };

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero 섹션 */}
            <CustomerHero
                currentPage="inquiry"
                title="1:1 문의"
                description="궁금한 사항이나 불편한 점을 언제든지 문의해 주세요"
            />

            {/* 문의 폼 섹션 */}
            <section className="bg-white py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* 기본 정보 */}
                        <div className="space-y-6">
                            {/* 성함 */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-lg font-semibold text-background-dark mb-2"
                                >
                                    성함 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="이름을 입력해주세요"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* 이메일 */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-lg font-semibold text-background-dark mb-2"
                                >
                                    이메일 주소{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="입력해 주세요."
                                        value={
                                            formData.email.split("@")[0] || ""
                                        }
                                        onChange={(e) => {
                                            const domain =
                                                formData.email.split("@")[1] ||
                                                "";
                                            setFormData((prev) => ({
                                                ...prev,
                                                email: domain
                                                    ? `${e.target.value}@${domain}`
                                                    : e.target.value,
                                            }));
                                        }}
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                                        required
                                    />
                                    <div className="flex items-center">
                                        <span className="text-lg text-background-dark mx-2">
                                            @
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="입력해 주세요."
                                            value={
                                                formData.email.split("@")[1] ||
                                                ""
                                            }
                                            onChange={(e) => {
                                                const local =
                                                    formData.email.split(
                                                        "@"
                                                    )[0] || "";
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    email: `${local}@${e.target.value}`,
                                                }));
                                            }}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 휴대폰 번호 */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-lg font-semibold text-background-dark mb-2"
                                >
                                    휴대폰 번호{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex items-center space-x-3">
                                    <span className="text-background-dark">
                                        +82
                                    </span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        placeholder="01012345678"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* 문의 제목 */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-lg font-semibold text-background-dark mb-2"
                                >
                                    문의 제목{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="제목을 입력해 주세요.(20자 이내)"
                                    maxLength={20}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* 문의 내용 */}
                            <div>
                                <label
                                    htmlFor="content"
                                    className="block text-lg font-semibold text-background-dark mb-2"
                                >
                                    문의 내용{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        placeholder="내용을 입력해 주세요."
                                        rows={6}
                                        maxLength={3000}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent resize-none"
                                        required
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                                        <span
                                            className={
                                                formData.content.length > 0
                                                    ? "text-primary-purple"
                                                    : ""
                                            }
                                        >
                                            {formData.content.length}
                                        </span>
                                        <span> / 3000</span>
                                    </div>
                                </div>
                            </div>

                            {/* 파일 첨부 */}
                            <div>
                                <label className="block text-lg font-semibold text-background-dark mb-2">
                                    파일 첨부
                                </label>
                                <FileUpload
                                    onFilesChange={setAttachments}
                                    onUploadingChange={setIsFileUploading}
                                    maxFiles={5}
                                    maxSize={10 * 1024 * 1024} // 10MB
                                />
                            </div>
                        </div>

                        {/* 개인정보 수집 안내 */}
                        <PrivacyNotice
                            isAgreed={privacyConsent}
                            onAgreementChange={setPrivacyConsent}
                        />

                        {/* 제출 버튼 */}
                        <div className="text-center pt-8">
                            <button
                                type="submit"
                                disabled={submitting || isFileUploading}
                                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                                    submitting || isFileUploading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-primary-purple hover:bg-primary-purple/90"
                                }`}
                            >
                                {submitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>문의 접수 중...</span>
                                    </div>
                                ) : isFileUploading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>파일 업로드 중...</span>
                                    </div>
                                ) : (
                                    "문의하기"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </PageLayout>
    );
}
