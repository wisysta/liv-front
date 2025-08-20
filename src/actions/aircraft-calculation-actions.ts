"use server";

export interface AircraftCalculationRequest {
    industryGroupId: number;
    passengerCount: number;
    aircraftCount: number;
    useBoardingMusic: boolean; // 탑승 중 음악 사용 여부
    useFlightMusic: boolean; // 비행 중 음악 사용 여부
}

export interface AircraftCalculationResponse {
    copyrightAmount: number;
    koscapAmount: number;
    neighboringAmount: number;
    totalAmount: number;
    tierInfo?: any;
    industryNotes?: string[];
    aircraftCount: number;
    monthlyBoardingFee: number;
    monthlyFlightFee: number;
    monthlyTotal: number;
    isAnnualPayment?: boolean; // 연납부형 여부
}

export async function calculateAircraftFee(
    data: AircraftCalculationRequest
): Promise<AircraftCalculationResponse> {
    const response = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        }/api/calculate/aircraft`,
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
