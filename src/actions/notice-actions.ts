"use server";

export interface Notice {
    id: number;
    title: string;
    content: string;
    headerImage: string | null;
    attachments: Array<{
        fileName: string;
        storedFileName?: string;
        fileUrl: string;
        fileSize: number;
    }>;
    isImportant: boolean;
    isActive: boolean;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export async function getActiveNotices({ page = 1, limit = 20 } = {}): Promise<{
    notices: Notice[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/notices?page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // 서버 사이드에서는 캐시를 사용하지 않음
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("공지사항 조회 오류:", error);
        throw new Error("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
}

export async function getNotice(id: number): Promise<Notice> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}?incrementViews=true`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const notice = await response.json();
        return notice;
    } catch (error) {
        console.error("공지사항 상세 조회 오류:", error);
        throw new Error("공지사항을 불러오는 중 오류가 발생했습니다.");
    }
}
