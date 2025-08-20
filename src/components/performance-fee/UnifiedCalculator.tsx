"use client";

import { useState, useEffect, useMemo } from "react";
import { BaseCalculator } from "./BaseCalculator";
import {
    calculatorConfigs,
    CalculatorType,
} from "@/lib/config/calculator-configs";

interface Industry {
    id: number;
    name: string;
    type: string;
    groupId?: number;
    groupCode?: string;
    groupName?: string;
}

interface UnifiedCalculatorProps {
    // 선택된 업종 정보
    selectedIndustry?: Industry;
    // 사용 가능한 업종 목록
    industries?: Industry[];
    // 계산기 타입 (area, count, person 등)
    calculatorType?: CalculatorType;
    // 업종 변경 핸들러
    onIndustryChange?: (industry: Industry) => void;
}

export function UnifiedCalculator({
    selectedIndustry,
    industries = [],
    calculatorType,
    onIndustryChange,
}: UnifiedCalculatorProps) {
    const [currentType, setCurrentType] = useState<CalculatorType>(
        calculatorType || "area"
    );

    const [currentIndustry, setCurrentIndustry] = useState<Industry | null>(
        selectedIndustry || null
    );

    // 업종이 변경되면 업종 상태와 계산기 타입을 업데이트
    useEffect(() => {
        if (selectedIndustry) {
            // 업종 정보 업데이트
            setCurrentIndustry(selectedIndustry);

            // 업종 타입과 이름에 따라 계산기 타입 결정
            let newType: CalculatorType = "area";

            if (selectedIndustry.type === "count") {
                // count 타입 중에서 호텔, 콘도미니엄, 골프장 구분
                if (selectedIndustry.name === "호텔") {
                    newType = "hotel";
                } else if (selectedIndustry.name === "콘도미니엄") {
                    newType = "condo";
                } else if (selectedIndustry.name === "골프장") {
                    newType = "golf";
                } else {
                    newType = "hotel"; // 기본값은 호텔
                }
            } else if (selectedIndustry.type === "area") {
                // area 타입 중에서 노래연습장 구분
                if (selectedIndustry.name === "노래연습장") {
                    newType = "karaoke";
                } else {
                    newType = "area";
                }
            } else if (selectedIndustry.type === "exempt") {
                newType = "exempt";
            } else if (selectedIndustry.type === "annual") {
                // annual 타입 업종들에 대한 계산기 타입 결정
                if (selectedIndustry.name === "전문체육시설") {
                    newType = "sports";
                } else if (selectedIndustry.name === "유원시설") {
                    newType = "amusement";
                } else if (selectedIndustry.name === "스키장") {
                    newType = "ski";
                } else if (selectedIndustry.name === "경마장") {
                    newType = "racetrack";
                } else if (selectedIndustry.name === "경륜•경정장") {
                    newType = "cycling_racing";
                } else if (selectedIndustry.name === "기차/선박") {
                    newType = "transportation";
                } else {
                    newType = "area"; // 기본값
                }
            } else {
                const typeMapping: Record<string, CalculatorType> = {
                    person: "person",
                    game_room: "game_room",
                    aircraft: "aircraft",
                };
                newType = typeMapping[selectedIndustry.type] || "area";
            }

            setCurrentType(newType);
        }
    }, [selectedIndustry]);

    // 현재 타입의 설정 가져오기
    const config = calculatorConfigs[currentType];

    // 현재 타입에 맞는 업종들만 필터링
    const filteredIndustries = industries.filter((industry) => {
        if (currentType === "hotel") {
            return industry.type === "count" && industry.name === "호텔";
        } else if (currentType === "condo") {
            return industry.type === "count" && industry.name === "콘도미니엄";
        } else if (currentType === "golf") {
            return industry.type === "count" && industry.name === "골프장";
        } else if (currentType === "karaoke") {
            return industry.type === "area" && industry.name === "노래연습장";
        } else if (currentType === "exempt") {
            return industry.type === "exempt";
        } else if (currentType === "sports") {
            return (
                industry.type === "annual" && industry.name === "전문체육시설"
            );
        } else if (currentType === "amusement") {
            return industry.type === "annual" && industry.name === "유원시설";
        } else if (currentType === "ski") {
            return industry.type === "annual" && industry.name === "스키장";
        } else if (currentType === "racetrack") {
            return industry.type === "annual" && industry.name === "경마장";
        } else if (currentType === "cycling_racing") {
            return (
                industry.type === "annual" && industry.name === "경륜•경정장"
            );
        } else if (currentType === "transportation") {
            return industry.type === "annual" && industry.name === "기차/선박";
        } else {
            const typeMapping: Record<string, string[]> = {
                area: ["area"],
                person: ["person"],
                game_room: ["game_room"],
                aircraft: ["aircraft"],
            };
            return typeMapping[currentType]?.includes(industry.type);
        }
    });

    // 기본값 설정 (계산기 타입 변경 시마다 새로 생성)
    const defaultValues: Record<string, string> = useMemo(() => {
        const values: Record<string, string> = {};

        if (currentIndustry) {
            values.industry = `${
                currentIndustry.groupId || currentIndustry.id
            }-${currentIndustry.id}`;
        }

        // 타입별 기본값 설정
        if (currentType === "area") {
            values.areaUnit = "sqm";
            values.isRural = "false";
        }

        // 필드별 defaultValue 설정
        if (config) {
            config.fields.forEach((field) => {
                if (field.defaultValue && !values[field.id]) {
                    values[field.id] = field.defaultValue;
                }
            });
        }

        return values;
    }, [currentIndustry, currentType, config]);

    // 업종이 선택되었을 때의 처리 (재선택 시)
    const handleIndustrySelection = (industryId: string) => {
        // 전체 업종 목록에서 찾기 (filteredIndustries가 아닌)
        const industry = industries.find(
            (ind) => `${ind.groupId || ind.id}-${ind.id}` === industryId
        );

        if (industry) {
            // 계산기 페이지의 상태를 업데이트 (useEffect에서 처리됨)
            onIndustryChange?.(industry);
        }
    };

    // 설정이 없는 경우 에러 표시
    if (!config) {
        return (
            <div className="max-w-7xl mx-auto text-center py-12">
                <p className="text-red-500 text-lg">
                    해당 계산기 타입({currentType})의 설정을 찾을 수 없습니다.
                </p>
            </div>
        );
    }

    // 업종이 설정되어 있지만 필터링된 업종 목록이 비어있는 경우
    if (filteredIndustries.length === 0 && currentIndustry) {
        return (
            <div className="max-w-7xl mx-auto text-center py-12">
                <p className="text-gray-500 text-lg">
                    {currentIndustry.name}에 해당하는 계산기를 준비 중입니다.
                </p>
            </div>
        );
    }

    // 업종 변경 핸들러를 포함한 설정
    const enhancedConfig = {
        ...config,
        calculateFunction: async (data: Record<string, any>) => {
            return config.calculateFunction(data);
        },
        // 업종 변경 핸들러 추가
        onIndustryChange: (industryId: string) => {
            // 업종 변경이 있었다면 처리
            if (
                industryId &&
                industryId !==
                    `${currentIndustry?.groupId || currentIndustry?.id}-${
                        currentIndustry?.id
                    }`
            ) {
                handleIndustrySelection(industryId);
            }
        },
    };

    // 고유 키 생성 (타입 + 업종 조합으로 완전한 리셋 보장)
    const calculatorKey = `${currentType}-${currentIndustry?.id || "none"}-${
        currentIndustry?.groupId || "none"
    }`;

    // 단일 BaseCalculator 컴포넌트 렌더링 (key로 완전한 리셋 보장)
    return (
        <BaseCalculator
            key={calculatorKey}
            config={enhancedConfig}
            industries={industries}
            defaultValues={defaultValues}
        />
    );
}

// 타입별 계산기 컴포넌트들 (편의를 위해)
export function AreaBasedCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="area" />;
}

export function HotelCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="hotel" />;
}

export function CondoCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="condo" />;
}

export function GolfCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="golf" />;
}

export function KaraokeCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="karaoke" />;
}

export function ExemptCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="exempt" />;
}

export function PersonBasedCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="person" />;
}

export function GameRoomCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="game_room" />;
}

export function AircraftCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="aircraft" />;
}

export function GolfCourseCalculator(
    props: Omit<UnifiedCalculatorProps, "calculatorType">
) {
    return <UnifiedCalculator {...props} calculatorType="golf" />;
}
