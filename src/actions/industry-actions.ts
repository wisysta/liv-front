// 업종 관련 API 액션

export interface Industry {
    id: number;
    name: string;
    type: string;
    groupId?: number;
    groupCode?: string;
    groupName?: string;
}

export interface IndustryResponse {
    success: boolean;
    data: Industry[];
    meta?: {
        total: number;
        description: string;
    };
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 모든 업종 목록을 가져오는 함수
 */
export async function getIndustries(): Promise<Industry[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/industries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 3600, // 1시간 마다 재검증
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: IndustryResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(
                result.error || "업종 데이터를 불러올 수 없습니다."
            );
        }

        return result.data;
    } catch (error) {
        console.error("업종 조회 오류:", error);
        // 개발 환경에서는 빈 배열 반환, 프로덕션에서는 에러 throw
        if (process.env.NODE_ENV === "development") {
            return [];
        }
        throw new Error("업종을 불러오는데 실패했습니다.");
    }
}

/**
 * 업종 타입별로 그룹핑된 업종 목록을 가져오는 함수
 */
export async function getIndustriesByType(): Promise<
    Record<string, Industry[]>
> {
    const industries = await getIndustries();

    const groupedIndustries: Record<string, Industry[]> = {};

    industries.forEach((industry) => {
        if (!groupedIndustries[industry.type]) {
            groupedIndustries[industry.type] = [];
        }
        groupedIndustries[industry.type]?.push(industry);
    });

    return groupedIndustries;
}

/**
 * 업종 검색 함수
 */
export function searchIndustries(
    industries: Industry[],
    searchTerm: string
): Industry[] {
    if (!searchTerm?.trim()) return industries;

    return industries.filter((industry) =>
        industry.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
