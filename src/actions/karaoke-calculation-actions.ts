// 노래연습장 계산 관련 API 액션

export interface KaraokeCalculationRequest {
    industryGroupId: number;
    roomCounts: {
        small: number; // ~6.6㎡ 이하
        medium: number; // 6.6㎡~13.2㎡ 미만
        large: number; // 13.2㎡~19.8㎡ 미만
        xlarge: number; // 19.8㎡ 이상
    };
    isRural: boolean; // 농어촌 여부
}

export interface KaraokeCalculationResult {
    copyrightAmount: number; // 리브뮤직 납부 공연권료(3단체)
    koscapAmount: number;
    neighboringAmount: number; // 월 매장음악사용료
    totalAmount: number;
    roomBreakdown: {
        small: { count: number; unitAmount: number; totalAmount: number };
        medium: { count: number; unitAmount: number; totalAmount: number };
        large: { count: number; unitAmount: number; totalAmount: number };
        xlarge: { count: number; unitAmount: number; totalAmount: number };
    };
    tierInfo: {
        totalRooms: number;
        isRural: boolean;
        appliedDiscount: string;
    };
    industryNotes?: string[];
    hasNeighboringRights?: boolean; // 저작인접권 여부
    breakdown?: Array<{
        label: string;
        amount: number;
        isBold: boolean;
    }>; // 계산 결과 항목들
}

export interface KaraokeCalculationResponse {
    success: boolean;
    data: KaraokeCalculationResult;
    meta?: {
        industry: string;
        totalRooms: number;
        isRural: boolean;
        calculation: string;
    };
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 노래연습장 공연권료 계산 함수
 */
export async function calculateKaraokeFee(
    data: KaraokeCalculationRequest
): Promise<KaraokeCalculationResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate/karaoke`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: KaraokeCalculationResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "노래연습장 계산에 실패했습니다.");
        }

        return result.data;
    } catch (error) {
        console.error("노래연습장 계산 오류:", error);
        throw new Error("노래연습장 공연권료 계산 중 오류가 발생했습니다.");
    }
}
