import {
    CalculationConfig,
    CalculationResultData,
} from "@/components/performance-fee/BaseCalculator";
import { calculateAreaBasedFee } from "@/actions/area-calculation-actions";
import { calculateHotelFee } from "@/actions/hotel-calculation-actions";
import { calculateGolfFee } from "@/actions/golf-calculation-actions";
import { calculateKaraokeFee } from "@/actions/karaoke-calculation-actions";
import { calculatePersonFee } from "@/actions/person-calculation-actions";
import { calculateGameRoomFee } from "@/actions/gameroom-calculation-actions";
import { calculateAircraftFee } from "@/actions/aircraft-calculation-actions";
import { calculateRevenueFee } from "@/actions/revenue-calculation-actions";

// 면적형 업종 설정
export const areaBasedConfig: CalculationConfig = {
    title: "공연권료 계산기 - 면적형",
    description: "카페, 음식점, 체력단련장 등 면적 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "area",
            type: "number",
            label: "면적",
            required: true,
            placeholder: "0",
            unit: "㎡ 또는 평",
            validation: (value: string) => {
                const num = parseFloat(value);
                return !isNaN(num) && num > 0;
            },
        },
        {
            id: "areaUnit",
            type: "radio",
            label: "면적 단위",
            required: true,
            options: [
                { value: "sqm", label: "제곱미터(㎡)" },
                { value: "pyeong", label: "평(坪)" },
            ],
        },
        {
            id: "isRural",
            type: "radio",
            label: "농어촌 여부",
            required: true,
            options: [
                { value: "false", label: "아니오" },
                { value: "true", label: "예 (읍/면/리)" },
            ],
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // 면적을 제곱미터로 변환
        const area =
            data.areaUnit === "pyeong"
                ? parseFloat(data.area) * 3.3058
                : parseFloat(data.area);

        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateAreaBasedFee({
            industryGroupId: groupId,
            area: area,
            isRural: data.isRural === "true",
        });

        const breakdown = [
            {
                label: "리브뮤직 납부 공연권료(3단체)",
                amount: result.copyrightAmount,
                isBold: true,
            },
            {
                label: "월 매장음악사용료",
                amount: result.neighboringAmount,
                isBold: true,
            },
        ];

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown,
        };
    },
};

// 호텔 전용 설정
export const hotelConfig: CalculationConfig = {
    title: "공연권료 계산기 - 호텔",
    description: "호텔 객실 수 및 성급 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "roomCount",
            type: "number",
            label: "방 개수를 입력하세요",
            required: true,
            placeholder: "50",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value);
                return !isNaN(num) && num > 0 && Number.isInteger(num);
            },
        },
        {
            id: "hotelGrade",
            type: "select",
            label: "성급을 입력하세요",
            required: true,
            placeholder: "성급 선택(1성급~5성급)",
            options: [
                { value: "grade3", label: "3급호텔 (70% 적용)" },
                { value: "grade2", label: "2급호텔 (80% 적용)" },
                { value: "grade1", label: "1급호텔 (90% 적용)" },
                { value: "special", label: "특급호텔 (4성급, 5성급)" },
            ],
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateHotelFee({
            industryGroupId: groupId,
            roomCount: parseInt(data.roomCount),
            hotelGrade: data.hotelGrade as
                | "special"
                | "grade1"
                | "grade2"
                | "grade3",
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: result.copyrightAmount,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: result.neighboringAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 콘도미니엄 전용 설정
export const condoConfig: CalculationConfig = {
    title: "공연권료 계산기 - 콘도미니엄",
    description: "콘도미니엄 객실 수 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "roomCount",
            type: "number",
            label: "방 개수를 입력하세요",
            required: true,
            placeholder: "50",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value);
                return !isNaN(num) && num > 0 && Number.isInteger(num);
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        // 콘도미니엄은 성급 할인 없이 기본 count-based 계산 사용
        const result = await calculateHotelFee({
            industryGroupId: groupId,
            roomCount: parseInt(data.roomCount),
            hotelGrade: "special", // 콘도미니엄은 100% 기본 요율 적용
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: result.copyrightAmount,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: result.neighboringAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 골프장 설정
export const golfCourseConfig: CalculationConfig = {
    title: "공연권료 계산기 - 골프장",
    description: "골프장 부대시설 개수 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "facilityCount",
            type: "number",
            label: "부대시설 개수",
            required: true,
            placeholder: "5",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value);
                return !isNaN(num) && num > 0 && Number.isInteger(num);
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateGolfFee({
            industryGroupId: groupId,
            facilityCount: parseInt(data.facilityCount),
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: result.copyrightAmount,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: result.neighboringAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 노래연습장 설정
export const karaokeConfig: CalculationConfig = {
    title: "공연권료 계산기 - 노래연습장",
    description: "노래연습장 방 크기별 개수 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "smallRooms",
            type: "number",
            label: "방 개수 (~6.6㎡ 이하)",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
        {
            id: "mediumRooms",
            type: "number",
            label: "방 개수 (6.6㎡~13.2㎡ 미만)",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
        {
            id: "largeRooms",
            type: "number",
            label: "방 개수 (13.2㎡~19.8㎡ 미만)",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
        {
            id: "xlargeRooms",
            type: "number",
            label: "방 개수 (19.8㎡ 이상)",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
        {
            id: "isRural",
            type: "radio",
            label: "농어촌 여부",
            required: true,
            options: [
                { value: "false", label: "아니오" },
                { value: "true", label: "예 (읍/면/리)" },
            ],
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const roomCounts = {
            small: parseInt(data.smallRooms || "0"),
            medium: parseInt(data.mediumRooms || "0"),
            large: parseInt(data.largeRooms || "0"),
            xlarge: parseInt(data.xlargeRooms || "0"),
        };

        // 총 방 개수 검증
        const totalRooms =
            roomCounts.small +
            roomCounts.medium +
            roomCounts.large +
            roomCounts.xlarge;
        if (totalRooms <= 0) {
            throw new Error("최소 1개 이상의 방이 필요합니다.");
        }

        const result = await calculateKaraokeFee({
            industryGroupId: groupId,
            roomCounts,
            isRural: data.isRural === "true",
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: result.copyrightAmount,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: result.neighboringAmount,
                    isBold: true,
                },
            ],
            customData: {
                roomBreakdown: result.roomBreakdown,
            },
        };
    },
};

// 인원형 업종 설정
export const personBasedConfig: CalculationConfig = {
    title: "공연권료 계산기 - 인원형",
    description: "무도학원, 에어로빅장 등 수용 인원 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "capacity",
            type: "number",
            label: "수강생 수",
            required: true,
            placeholder: "50",
            unit: "명",
            validation: (value: string) => {
                const num = parseInt(value);
                return !isNaN(num) && num > 0 && Number.isInteger(num);
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculatePersonFee({
            industryGroupId: groupId,
            personCount: parseInt(data.capacity),
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.storeUsageFee, // 백워드 호환성을 위해 neighboringAmount에 storeUsageFee 할당
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: result.livMusicAmount,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: result.storeUsageFee,
                    isBold: true,
                },
            ],
        };
    },
};

// 게임방 설정
export const gameRoomConfig: CalculationConfig = {
    title: "공연권료 계산기 - 게임방, 멀티방",
    description: "노래반주기, 댄스게임기, 멀티기기 개수 기반 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "karaokeCount",
            type: "number",
            label: "노래반주기 개수",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
        {
            id: "danceCount",
            type: "number",
            label: "댄스게임기 개수",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
        {
            id: "multiCount",
            type: "number",
            label: "멀티기기 개수",
            required: false,
            placeholder: "0",
            unit: "개",
            validation: (value: string) => {
                const num = parseInt(value || "0");
                return !isNaN(num) && num >= 0 && Number.isInteger(num);
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const equipmentCounts = {
            karaoke: parseInt(data.karaokeCount || "0"),
            dance: parseInt(data.danceCount || "0"),
            multi: parseInt(data.multiCount || "0"),
        };

        // 총 기기 개수 검증
        const totalEquipment =
            equipmentCounts.karaoke +
            equipmentCounts.dance +
            equipmentCounts.multi;
        if (totalEquipment <= 0) {
            throw new Error("최소 1개 이상의 기기가 필요합니다.");
        }

        const result = await calculateGameRoomFee({
            industryGroupId: groupId,
            equipmentCounts,
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: result.copyrightAmount,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: result.neighboringAmount,
                    isBold: true,
                },
            ],
            customData: {
                deviceBreakdown: result.deviceBreakdown,
                equipmentInfo: result.equipmentInfo,
            },
        };
    },
};

// 항공기 설정 (연납부)
export const aircraftConfig: CalculationConfig = {
    title: "공연권료 계산기 - 항공기",
    description: "항공기 승객 수 및 비행기 수 기반 업종 (연납부)",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "passengerCount",
            type: "number",
            label: "항공기 좌석 수",
            required: true,
            placeholder: "200",
            validation: (value: string) => {
                const num = parseInt(value);
                return !isNaN(num) && num > 0 && Number.isInteger(num);
            },
        },
        {
            id: "aircraftCount",
            type: "number",
            label: "비행기 수",
            required: true,
            placeholder: "5",
            validation: (value: string) => {
                const num = parseInt(value);
                return !isNaN(num) && num > 0 && Number.isInteger(num);
            },
        },
        {
            id: "useBoardingMusic",
            type: "radio",
            label: "탑승 중 음악 사용",
            required: true,
            options: [
                { value: "true", label: "예" },
                { value: "false", label: "아니오" },
            ],
        },
        {
            id: "useFlightMusic",
            type: "radio",
            label: "비행 중 음악 사용",
            required: true,
            options: [
                { value: "true", label: "예" },
                { value: "false", label: "아니오" },
            ],
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        // industry 값에서 groupId 추출 (형식: "groupId-id" 또는 "id-id")
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateAircraftFee({
            industryGroupId: groupId,
            passengerCount: parseInt(data.passengerCount),
            aircraftCount: parseInt(data.aircraftCount),
            useBoardingMusic: data.useBoardingMusic === "true",
            useFlightMusic: data.useFlightMusic === "true",
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: result.koscapAmount,
            neighboringAmount: result.neighboringAmount,
            totalAmount: result.totalAmount,
            tierInfo: result.tierInfo,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "연납부 총액",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
            customData: {
                isAnnualPayment: true,
                aircraftCount: result.aircraftCount,
                monthlyBoardingFee: result.monthlyBoardingFee,
                monthlyFlightFee: result.monthlyFlightFee,
                monthlyTotal: result.monthlyTotal,
            },
        };
    },
};

// 전문체육시설 설정 (수입 기반)
export const sportsConfig: CalculationConfig = {
    title: "공연권료 계산기 - 전문체육시설",
    description: "입장료 수입 기반 업종 (수입 × 0.2%)",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "revenueAmount",
            type: "number",
            label: "입장료 수입",
            required: true,
            placeholder: "1,000,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num > 0;
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateRevenueFee({
            industryGroupId: groupId,
            revenueAmount: parseFloat(data.revenueAmount.replace(/,/g, "")),
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: 0, // 수입 기반은 별도 구조
            neighboringAmount: result.producerAmount + result.performerAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "저작자 합산",
                    amount: result.copyrightAmount,
                    isBold: false,
                },
                {
                    label: `제작자 (VAT ${result.producerVAT.toLocaleString()}원 포함)`,
                    amount: result.producerAmount,
                    isBold: false,
                },
                {
                    label: "실연자",
                    amount: result.performerAmount,
                    isBold: false,
                },
                {
                    label: "납부할 공연권료",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
            customData: {
                isAnnualPayment: true,
            },
        };
    },
};

// 유원시설 설정 (수입 기반)
export const amusementConfig: CalculationConfig = {
    title: "공연권료 계산기 - 유원시설",
    description:
        "입장료 수입 + 음악사용놀이기구 이용료 수입 기반 업종 (수입 × 0.11%)",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "admissionRevenue",
            type: "number",
            label: "입장료 수입",
            required: true,
            placeholder: "500,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num >= 0;
            },
        },
        {
            id: "rideRevenue",
            type: "number",
            label: "음악사용놀이기구 이용료 수입",
            required: true,
            placeholder: "500,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num >= 0;
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        // 입장료 수입 + 음악사용놀이기구 이용료 수입 계산
        const admissionRevenue = parseFloat(
            data.admissionRevenue.replace(/,/g, "")
        );
        const rideRevenue = parseFloat(data.rideRevenue.replace(/,/g, ""));
        const revenueAmount = admissionRevenue + rideRevenue;

        const result = await calculateRevenueFee({
            industryGroupId: groupId,
            revenueAmount: revenueAmount,
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: 0,
            neighboringAmount: result.producerAmount + result.performerAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "저작자 합산",
                    amount: result.copyrightAmount,
                    isBold: false,
                },
                {
                    label: `제작자 (VAT ${result.producerVAT.toLocaleString()}원 포함)`,
                    amount: result.producerAmount,
                    isBold: false,
                },
                {
                    label: "실연자",
                    amount: result.performerAmount,
                    isBold: false,
                },
                {
                    label: "납부할 공연권료",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 스키장 설정 (수입 기반)
export const skiConfig: CalculationConfig = {
    title: "공연권료 계산기 - 스키장",
    description: "수입 기반 업종 (수입 × 0.05%)",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "revenueAmount",
            type: "number",
            label: "수입",
            required: true,
            placeholder: "1,000,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num > 0;
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateRevenueFee({
            industryGroupId: groupId,
            revenueAmount: parseFloat(data.revenueAmount.replace(/,/g, "")),
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: 0,
            neighboringAmount: result.producerAmount + result.performerAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "저작자 합산",
                    amount: result.copyrightAmount,
                    isBold: false,
                },
                {
                    label: `제작자 (VAT ${result.producerVAT.toLocaleString()}원 포함)`,
                    amount: result.producerAmount,
                    isBold: false,
                },
                {
                    label: "실연자",
                    amount: result.performerAmount,
                    isBold: false,
                },
                {
                    label: "납부할 공연권료",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 경마장 설정 (수입 기반)
export const racetrackConfig: CalculationConfig = {
    title: "공연권료 계산기 - 경마장",
    description: "순수익 × 특별적립공제비율 × 0.01%",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "netProfit",
            type: "number",
            label: "순수익",
            required: true,
            placeholder: "1,000,000,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num > 0;
            },
        },
        {
            id: "specialReserveRate",
            type: "number",
            label: "특별적립공제비율",
            required: true,
            placeholder: "9",
            defaultValue: "9",
            unit: "%",
            validation: (value: string) => {
                const num = parseFloat(value);
                return !isNaN(num) && num > 0 && num <= 100;
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        // 순수익 × 특별적립공제비율 계산
        const netProfit = parseFloat(data.netProfit.replace(/,/g, ""));
        const specialReserveRate = parseFloat(data.specialReserveRate) / 100; // % → 소수점
        const revenueAmount = netProfit * specialReserveRate;

        const result = await calculateRevenueFee({
            industryGroupId: groupId,
            revenueAmount: revenueAmount,
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: 0,
            neighboringAmount: result.producerAmount + result.performerAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "저작자 합산",
                    amount: result.copyrightAmount,
                    isBold: false,
                },
                {
                    label: `제작자 (VAT ${result.producerVAT.toLocaleString()}원 포함)`,
                    amount: result.producerAmount,
                    isBold: false,
                },
                {
                    label: "실연자",
                    amount: result.performerAmount,
                    isBold: false,
                },
                {
                    label: "납부할 공연권료",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 경륜•경정장 설정 (수입 기반)
export const cyclingRacingConfig: CalculationConfig = {
    title: "공연권료 계산기 - 경륜•경정장",
    description: "전년도 총수입 × 조정발매수득금률 × 0.01%",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "totalRevenue",
            type: "number",
            label: "전년도 총수입",
            required: true,
            placeholder: "1,000,000,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num > 0;
            },
        },
        {
            id: "adjustmentRate",
            type: "number",
            label: "조정발매수득금률",
            required: true,
            placeholder: "12",
            defaultValue: "12",
            unit: "%",
            validation: (value: string) => {
                const num = parseFloat(value);
                return !isNaN(num) && num > 0 && num <= 100;
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        // 전년도 총수입 × 조정발매수득금률 계산
        const totalRevenue = parseFloat(data.totalRevenue.replace(/,/g, ""));
        const adjustmentRate = parseFloat(data.adjustmentRate) / 100; // % → 소수점
        const revenueAmount = totalRevenue * adjustmentRate;

        const result = await calculateRevenueFee({
            industryGroupId: groupId,
            revenueAmount: revenueAmount,
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: 0,
            neighboringAmount: result.producerAmount + result.performerAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "저작자 합산",
                    amount: result.copyrightAmount,
                    isBold: false,
                },
                {
                    label: `제작자 (VAT ${result.producerVAT.toLocaleString()}원 포함)`,
                    amount: result.producerAmount,
                    isBold: false,
                },
                {
                    label: "실연자",
                    amount: result.performerAmount,
                    isBold: false,
                },
                {
                    label: "납부할 공연권료",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 기차•선박 설정 (수입 기반)
export const transportationConfig: CalculationConfig = {
    title: "공연권료 계산기 - 기차•선박",
    description: "수입 × 0.02% × 조정계수",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
        {
            id: "revenueAmount",
            type: "number",
            label: "수입",
            required: true,
            placeholder: "1,000,000",
            unit: "원",
            formatCurrency: true,
            validation: (value: string) => {
                const num = parseFloat(value.replace(/,/g, ""));
                return !isNaN(num) && num > 0;
            },
        },
        {
            id: "adjustmentRate",
            type: "number",
            label: "조정계수 (%)",
            required: true,
            placeholder: "20",
            defaultValue: "20",
            validation: (value: string) => {
                const num = parseFloat(value);
                return !isNaN(num) && num > 0 && num <= 100;
            },
        },
    ],
    calculateFunction: async (
        data: Record<string, any>
    ): Promise<CalculationResultData> => {
        const industryValue = data.industry;
        const parts = industryValue.split("-");
        const groupId =
            parts.length > 1 ? parseInt(parts[0]) : parseInt(industryValue);

        const result = await calculateRevenueFee({
            industryGroupId: groupId,
            revenueAmount: parseFloat(data.revenueAmount.replace(/,/g, "")),
            adjustmentRate: parseFloat(data.adjustmentRate) / 100, // % -> 소수점
        });

        return {
            copyrightAmount: result.copyrightAmount,
            koscapAmount: 0,
            neighboringAmount: result.producerAmount + result.performerAmount,
            totalAmount: result.totalAmount,
            industryNotes: result.industryNotes || [],
            breakdown: [
                {
                    label: "저작자 합산",
                    amount: result.copyrightAmount,
                    isBold: false,
                },
                {
                    label: `제작자 (VAT ${result.producerVAT.toLocaleString()}원 포함)`,
                    amount: result.producerAmount,
                    isBold: false,
                },
                {
                    label: "실연자",
                    amount: result.performerAmount,
                    isBold: false,
                },
                {
                    label: "납부할 공연권료",
                    amount: result.totalAmount,
                    isBold: true,
                },
            ],
        };
    },
};

// 유틸리티 함수들
function getGradeMultiplier(grade: number): number {
    switch (grade) {
        case 1:
            return 0.7; // 3급의 70%
        case 2:
            return 0.8; // 3급의 80%
        case 3:
            return 0.9; // 3급의 90%
        case 4:
        case 5:
            return 1.0; // 특급 기준
        default:
            return 1.0;
    }
}

// 업종 타입별 설정 매핑
// 징수제외 업종 설정
export const exemptConfig: CalculationConfig = {
    title: "징수 제외 대상",
    description: "징수 제외 대상 업종",
    fields: [
        {
            id: "industry",
            type: "industry",
            label: "업종",
            required: true,
            placeholder: "업종을 선택하세요",
        },
    ],
    calculateFunction: async (): Promise<CalculationResultData> => {
        return {
            copyrightAmount: 0,
            neighboringAmount: 0,
            totalAmount: 0,
            isExempt: true,
            exemptMessage: "징수 제외 대상입니다",
            breakdown: [],
            industryNotes: [],
        };
    },
};

export const calculatorConfigs = {
    area: areaBasedConfig,
    hotel: hotelConfig,
    condo: condoConfig,
    golf: golfCourseConfig,
    karaoke: karaokeConfig,
    person: personBasedConfig,
    game_room: gameRoomConfig,
    aircraft: aircraftConfig,
    sports: sportsConfig,
    amusement: amusementConfig,
    ski: skiConfig,
    racetrack: racetrackConfig,
    cycling_racing: cyclingRacingConfig,
    transportation: transportationConfig,
    exempt: exemptConfig,
} as const;

export type CalculatorType = keyof typeof calculatorConfigs;
