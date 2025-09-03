"use server";

interface PersonCalculationRequest {
    industryGroupId: number;
    personCount: number;
    profitType?: "profit" | "nonprofit"; // 영리/비영리 선택 (노래교실, 에어로빅장용)
}

interface PersonCalculationResponse {
    copyrightAmount: number; // 저작권자
    koscapAmount: number; // KOSCAP납부액
    producerAmount: number; // 제작자
    producerVAT: number; // 제작자VAT
    performerAmount: number; // 실연자
    livMusicAmount: number; // 리브뮤직납부액
    storeUsageFee: number; // 월매장 사용료
    totalAmount: number; // 공연권료합계
    tierInfo: {
        minPersons: number;
        maxPersons: number | null;
        copyrightAmount: number;
        koscapRate: number;
        neighboringRate: number;
    } | null;
    industryNotes: string[];
    hasNeighboringRights?: boolean; // 저작인접권 여부
    breakdown?: Array<{
        label: string;
        amount: number;
        isBold: boolean;
    }>; // 계산 결과 항목들
    isExempt?: boolean; // 징수제외 여부
    exemptMessage?: string; // 징수제외 메시지
}

export async function calculatePersonFee({
    industryGroupId,
    personCount,
    profitType = "profit",
}: PersonCalculationRequest): Promise<PersonCalculationResponse> {
    try {
        const response = await fetch(
            `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
            }/api/calculate/person`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    industryGroupId,
                    personCount,
                    profitType,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "계산 중 오류가 발생했습니다.");
        }

        const apiResponse = await response.json();

        if (!apiResponse.success || !apiResponse.data) {
            throw new Error(
                apiResponse.error || "계산 결과를 받을 수 없습니다."
            );
        }

        return apiResponse.data;
    } catch (error) {
        console.error("인원기반 계산 오류:", error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "계산 중 오류가 발생했습니다."
        );
    }
}
