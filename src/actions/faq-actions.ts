"use server";

export interface Faq {
    id: number;
    title: string;
    content: string;
    category: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FaqResponse {
    success: boolean;
    data?: Faq[];
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFaqs(category?: string): Promise<Faq[]> {
    try {
        const url = new URL(`${API_BASE_URL}/api/faqs`);
        if (category && category !== "전체") {
            url.searchParams.set("category", category);
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 60, // 1분마다 재검증
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: FaqResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "FAQ 데이터를 불러올 수 없습니다.");
        }

        return result.data;
    } catch (error) {
        console.error("FAQ 조회 오류:", error);
        // 개발 환경에서는 빈 배열 반환, 프로덕션에서는 에러 throw
        if (process.env.NODE_ENV === "development") {
            return [];
        }
        throw new Error("FAQ를 불러오는데 실패했습니다.");
    }
}

// 기본 FAQ 카테고리 목록
const DEFAULT_FAQ_CATEGORIES = ["저작권", "이용방법", "공연권료", "기타"];

export async function getFaqCategories(): Promise<string[]> {
    try {
        const faqs = await getFaqs();
        const dbCategories = Array.from(
            new Set(faqs.map((faq) => faq.category))
        );

        // 기본 카테고리와 DB 카테고리를 합쳐서 중복 제거
        const allCategories = [
            "전체",
            ...Array.from(
                new Set([...DEFAULT_FAQ_CATEGORIES, ...dbCategories])
            ),
        ];

        return allCategories;
    } catch (error) {
        console.error("FAQ 카테고리 조회 오류:", error);
        return ["전체", "저작권", "이용방법", "공연권료", "기타"];
    }
}
