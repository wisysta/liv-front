interface CreateInquiryData {
    name: string;
    email: string;
    phone: string;
    title: string;
    content: string;
    attachments: Array<{
        fileName: string; // 원본 파일명 (표시용)
        storedFileName?: string; // 실제 저장된 파일명
        fileUrl: string;
        fileSize: number;
    }>;
    privacyConsent: boolean;
}

export async function createInquiry(data: CreateInquiryData) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/inquiries`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "문의 접수에 실패했습니다.");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("문의 접수 오류:", error);
        throw error;
    }
}
