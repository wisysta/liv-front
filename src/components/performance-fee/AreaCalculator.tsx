// 레거시 AreaCalculator - 새로운 UnifiedCalculator 사용을 권장
"use client";

import { AreaBasedCalculator } from "./UnifiedCalculator";

// 기존 인터페이스와의 호환성을 위한 래퍼 컴포넌트
interface LegacyAreaCalculatorProps {
    industry: {
        id: number;
        name: string;
        type: string;
        groupId?: number;
        groupCode?: string;
        groupName?: string;
    };
    industries?: Array<{
        id: number;
        name: string;
        type: string;
        groupId?: number;
        groupCode?: string;
        groupName?: string;
    }>;
    onIndustryChange?: (
        industry: LegacyAreaCalculatorProps["industry"]
    ) => void;
}

export function AreaCalculator({
    industry,
    industries = [],
    onIndustryChange,
}: LegacyAreaCalculatorProps) {
    // 타입 안전성을 위한 조건부 처리
    if (!onIndustryChange) {
        return (
            <AreaBasedCalculator
                selectedIndustry={industry}
                industries={industries}
            />
        );
    }

    return (
        <AreaBasedCalculator
            selectedIndustry={industry}
            industries={industries}
            onIndustryChange={onIndustryChange}
        />
    );
}
