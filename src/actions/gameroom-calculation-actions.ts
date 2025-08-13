// 게임방/멀티방 계산 관련 API 액션

export interface GameRoomCalculationRequest {
    industryGroupId: number;
    equipmentCounts: {
        karaoke: number; // 노래반주기 개수
        dance: number; // 댄스게임기 개수
        multi: number; // 멀티기기 개수
    };
}

export interface DeviceCalculationDetail {
    deviceType: string;
    count: number;
    unitCopyrightAmount: number;
    copyrightAmount: number;
    koscapAmount: number;
    producerAmount: number;
    producerVAT: number;
    performerAmount: number;
}

export interface GameRoomCalculationResult {
    copyrightAmount: number; // 리브뮤직 납부 공연권료(3단체)
    koscapAmount: number;
    neighboringAmount: number; // 월 매장음악사용료
    totalAmount: number;
    deviceBreakdown: DeviceCalculationDetail[];
    equipmentInfo: {
        totalEquipment: number;
        karaokeCount: number;
        danceCount: number;
        multiCount: number;
    };
    industryNotes?: string[];
}

export interface GameRoomCalculationResponse {
    success: boolean;
    data: GameRoomCalculationResult;
    meta?: {
        industry: string;
        totalEquipment: number;
        calculation: string;
    };
    error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 게임방/멀티방 공연권료 계산 함수
 */
export async function calculateGameRoomFee(
    data: GameRoomCalculationRequest
): Promise<GameRoomCalculationResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/calculate/gameroom`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: GameRoomCalculationResponse = await response.json();

        if (!result.success || !result.data) {
            throw new Error(result.error || "게임방 계산에 실패했습니다.");
        }

        return result.data;
    } catch (error) {
        console.error("게임방 계산 오류:", error);
        throw new Error("게임방 공연권료 계산 중 오류가 발생했습니다.");
    }
}
