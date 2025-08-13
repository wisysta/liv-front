import { GameRoomCalculationResult } from "@/actions/gameroom-calculation-actions";

/**
 * 게임방 계산 결과를 포맷팅하는 유틸리티 함수
 */
export function formatGameRoomCalculationResult(
    data: GameRoomCalculationResult
) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("ko-KR").format(amount) + "원";
    };

    return {
        // 주요 금액 정보
        amounts: {
            livMusicFee: formatCurrency(data.copyrightAmount),
            monthlyStoreFee: formatCurrency(data.neighboringAmount),
            totalAmount: formatCurrency(data.totalAmount),
        },

        // 기기별 상세 정보
        deviceDetails: data.deviceBreakdown.map((device) => ({
            deviceType: device.deviceType,
            count: device.count,
            unitAmount: formatCurrency(device.unitCopyrightAmount),
            totalAmount: formatCurrency(device.copyrightAmount),
        })),

        // 기기 요약 정보
        equipmentSummary: {
            total: data.equipmentInfo.totalEquipment,
            karaoke: data.equipmentInfo.karaokeCount,
            dance: data.equipmentInfo.danceCount,
            multi: data.equipmentInfo.multiCount,
        },

        // 비고 사항
        notes: data.industryNotes || [],
    };
}

/**
 * 기기별 개수를 검증하는 함수
 */
export function validateEquipmentCounts(equipmentCounts: {
    karaoke: number;
    dance: number;
    multi: number;
}): { isValid: boolean; error?: string } {
    const totalEquipment =
        equipmentCounts.karaoke + equipmentCounts.dance + equipmentCounts.multi;

    if (totalEquipment <= 0) {
        return {
            isValid: false,
            error: "최소 1개 이상의 기기가 필요합니다.",
        };
    }

    if (
        equipmentCounts.karaoke < 0 ||
        equipmentCounts.dance < 0 ||
        equipmentCounts.multi < 0
    ) {
        return {
            isValid: false,
            error: "기기 개수는 0 이상이어야 합니다.",
        };
    }

    return { isValid: true };
}
