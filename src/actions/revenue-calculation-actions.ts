"use server";

export interface RevenueCalculationRequest {
    industryGroupId: number;
    revenueAmount: number; // 수입 금액
    adjustmentRate?: number; // 조정계수 (기차•선박용, 기본 20%)
}

export interface RevenueCalculationResponse {
    copyrightAmount: number; // 저작자 합산
    producerAmount: number; // 제작자 (VAT 포함)
    producerVAT: number; // 제작자 VAT
    performerAmount: number; // 실연자
    totalAmount: number; // 납부할 공연권료 총액
    facilityType: string;
    musicUsageRate: number;
    neighboringRate: number;
    industryNotes: string[];
    breakdown: {
        baseAmount: number; // 기본 계산 금액 (수입 * 음악사용료율)
        copyrightAmount: number;
        producerBase: number;
        producerVAT: number;
        producerTotal: number;
        performerAmount: number;
    };
    isAnnualPayment?: boolean; // 연납부형 여부
}

export async function calculateRevenueFee(
    data: RevenueCalculationRequest
): Promise<RevenueCalculationResponse> {
    const response = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
        }/api/calculate/revenue`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            errorData.message ||
                `API 오류: ${response.status} ${response.statusText}`
        );
    }

    const apiResponse = await response.json();

    if (!apiResponse.success || !apiResponse.data) {
        throw new Error(apiResponse.message || "계산 중 오류가 발생했습니다.");
    }

    return {
        ...apiResponse.data,
        isAnnualPayment: apiResponse.meta?.isAnnualPayment || false,
    };
}
