"use server";

interface Popup {
    id: number;
    title: string;
    imageUrl: string;
    linkUrl: string | null;
    isActive: boolean;
    order: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

// 모든 팝업 목록 조회 (활성화된 것만)
export async function getActivePopups(): Promise<Popup[]> {
    try {
        const response = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
            }/api/popups/active`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 300, // 5분마다 재검증
                },
            }
        );

        if (!response.ok) {
            console.error("팝업 데이터 조회 실패:", response.status);
            return [];
        }

        const data = await response.json();
        // 모든 활성화된 팝업을 반환 (최대 5개 제한 제거)
        return data.popups || [];
    } catch (error) {
        console.error("팝업 데이터 조회 중 오류:", error);
        return [];
    }
}
