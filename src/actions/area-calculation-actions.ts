// 면적형 계산 관련 API 액션

export interface AreaCalculationRequest {
    industryGroupId: number;
    area: number; // 평방미터 단위
    isRural: boolean; // 농어촌 여부
}

export interface AreaCalculationResult {
    copyrightAmount: number; // 저작권료 (리브뮤직 납부 공연권료 - 3단체)
    koscapAmount: number; // KOSCAP 관리비
    neighboringAmount: number; // 저작인접권료
    totalAmount: number; // 월납부액 (합계)
    tierInfo: {
        minArea: number;
        maxArea: number | null;
        grade: number;
    };
    industryNotes?: string[]; // 그룹별 비고
    hasNeighboringRights?: boolean; // 저작인접권 여부
    breakdown?: Array<{
        label: string;
        amount: number;
        isBold: boolean;
    }>; // 계산 결과 항목들
}

export interface AreaCalculationResponse {
    success: boolean;
    data?: AreaCalculationResult;
    meta?: {
        industry: string;
        area: number;
        isRural: boolean;
        calculation: string;
    };
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 면적형 업종의 공연권료를 계산하는 함수
 */
export async function calculateAreaBasedFee(
    request: AreaCalculationRequest
): Promise<AreaCalculationResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate/area`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: AreaCalculationResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "계산 결과를 받을 수 없습니다.");
        }

        return result.data;
    } catch (error) {
        console.error("면적형 계산 오류:", error);
        throw new Error("공연권료 계산 중 오류가 발생했습니다.");
    }
}

/**
 * 평을 제곱미터로 변환
 */
export function pyeongToSquareMeters(pyeong: number): number {
    return Math.round(pyeong * 3.3058 * 100) / 100; // 소수점 둘째자리까지
}

/**
 * 제곱미터를 평으로 변환
 */
export function squareMetersToPyeong(squareMeters: number): number {
    return Math.round((squareMeters / 3.3058) * 100) / 100; // 소수점 둘째자리까지
}

/**
 * 숫자 포맷팅 (천단위 콤마)
 */
export function formatNumber(num: number): string {
    return num.toLocaleString();
}

/**
 * 화폐 포맷팅
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
    }).format(amount);
}
