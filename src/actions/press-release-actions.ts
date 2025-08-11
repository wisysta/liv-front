"use server";

export interface PressRelease {
    id: number;
    title: string;
    content: string;
    pressNumber: string;
    newsLink: string;
    isActive: boolean;
    views: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * 활성화된 보도자료 목록 조회 (고객용)
 */
export async function getActivePressReleases(): Promise<{
    pressReleases: PressRelease[];
}> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/press-releases`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store", // 실시간 데이터를 위해 캐시 비활성화
            }
        );

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        return { pressReleases: data.pressReleases || [] };
    } catch (error) {
        console.error("보도자료 목록 조회 오류:", error);
        throw new Error("보도자료 목록을 불러오는 중 오류가 발생했습니다.");
    }
}

/**
 * 보도자료 상세 조회 (고객용)
 */
export async function getPressReleaseById(id: number): Promise<PressRelease> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/press-releases/${id}?incrementViews=true`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status}`);
        }

        const pressRelease = await response.json();
        return pressRelease;
    } catch (error) {
        console.error("보도자료 상세 조회 오류:", error);
        throw new Error("보도자료를 불러오는 중 오류가 발생했습니다.");
    }
}
