// 호텔 계산 관련 API 액션

export interface HotelCalculationRequest {
    industryGroupId: number;
    roomCount: number;
    hotelGrade: "special" | "grade1" | "grade2" | "grade3";
}

export interface HotelCalculationResult {
    copyrightAmount: number; // 리브뮤직 납부 공연권료(3단체)
    koscapAmount: number;
    neighboringAmount: number; // 월 매장음악사용료
    totalAmount: number;
    tierInfo: {
        minCount: number;
        maxCount: number | null;
        hotelGrade: string;
        discountRate: number;
    };
    industryNotes?: string[];
    hasNeighboringRights?: boolean; // 저작인접권 여부
    breakdown?: Array<{
        label: string;
        amount: number;
        isBold: boolean;
    }>; // 계산 결과 항목들
}

export interface HotelCalculationResponse {
    success: boolean;
    data: HotelCalculationResult;
    meta?: {
        industry: string;
        roomCount: number;
        hotelGrade: string;
        discountRate: number;
        calculation: string;
        baseCopyrightAmount?: number;
        appliedCopyrightAmount?: number;
        message?: string;
    };
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 호텔 공연권료 계산 함수
 */
export async function calculateHotelFee(
    data: HotelCalculationRequest
): Promise<HotelCalculationResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate/hotel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: HotelCalculationResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "호텔 계산에 실패했습니다.");
        }

        return result.data;
    } catch (error) {
        console.error("호텔 계산 오류:", error);
        throw new Error("호텔 공연권료 계산 중 오류가 발생했습니다.");
    }
}
