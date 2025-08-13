// 골프장 계산 관련 API 액션

export interface GolfCalculationRequest {
    industryGroupId: number;
    facilityCount: number; // 부대시설 개수
}

export interface GolfCalculationResult {
    copyrightAmount: number; // 리브뮤직 납부 공연권료(3단체)
    koscapAmount: number;
    neighboringAmount: number; // 월 매장음악사용료
    totalAmount: number;
    tierInfo: {
        facilityCount: number;
        appliedFormula: string;
        baseCopyrightAmount?: number;
        additionalAmount?: number;
    };
    industryNotes?: string[];
}

export interface GolfCalculationResponse {
    success: boolean;
    data: GolfCalculationResult;
    meta?: {
        industry: string;
        facilityCount: number;
        calculation: string;
        appliedFormula: string;
    };
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 골프장 공연권료 계산 함수
 */
export async function calculateGolfFee(
    data: GolfCalculationRequest
): Promise<GolfCalculationResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate/golf`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GolfCalculationResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "골프장 계산에 실패했습니다.");
        }

        return result.data;
    } catch (error) {
        console.error("골프장 계산 오류:", error);
        throw new Error("골프장 공연권료 계산 중 오류가 발생했습니다.");
    }
}
