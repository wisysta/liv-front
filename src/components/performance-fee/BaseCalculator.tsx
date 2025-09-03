"use client";

import { useState, useEffect } from "react";

// 공통 인터페이스들
export interface CalculationField {
    id: string;
    type: "industry" | "number" | "select" | "radio";
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    validation?: (value: any) => boolean;
    unit?: string;
    formatCurrency?: boolean;
    defaultValue?: string;
    conditionalDisplay?: (
        formData: Record<string, any>,
        industries?: Array<any>
    ) => boolean;
}

export interface CalculationConfig {
    title: string;
    description?: string;
    fields: CalculationField[];
    calculateFunction: (
        data: Record<string, any>
    ) => Promise<CalculationResultData>;
    notes?: string[];
    onIndustryChange?: (industryId: string) => void; // 업종 변경 핸들러
}

export interface CalculationResultData {
    copyrightAmount: number;
    koscapAmount?: number;
    neighboringAmount: number;
    totalAmount: number;
    tierInfo?: any;
    industryNotes?: string[];
    breakdown?: Array<{
        label: string;
        amount: number;
        isBold?: boolean;
    }>;
    customData?: any; // 노래연습장 방 상세 정보 등 커스텀 데이터
    isExempt?: boolean; // 징수제외 여부
    exemptMessage?: string; // 징수제외 메시지
    hasNeighboringRights?: boolean; // 저작인접권 여부
}

// 공통 UI 컴포넌트들
interface InputFieldProps {
    field: CalculationField;
    value: string;
    onChange: (value: string) => void;
    error?: string | undefined;
}

function InputField({ field, value, onChange, error }: InputFieldProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        if (field.type === "number") {
            // 숫자 타입일 때만 검증 로직 적용
            if (inputValue === "") {
                onChange("");
                return;
            }

            // 통화 포맷이 활성화된 경우
            if (field.formatCurrency) {
                // 숫자와 콤마만 허용
                inputValue = inputValue.replace(/[^0-9,]/g, "");
                // 콤마 제거한 숫자값 추출
                const numericValue = inputValue.replace(/,/g, "");

                if (numericValue === "") {
                    onChange("");
                    return;
                }

                const numValue = parseFloat(numericValue);
                if (isNaN(numValue) || numValue < 0) {
                    return;
                }

                // 콤마 추가하여 포맷된 값 저장
                onChange(numValue.toLocaleString());
                return;
            }

            // 개수/명수 관련 필드는 정수만 허용
            const isCountField =
                field.unit === "개" ||
                field.unit === "명" ||
                field.unit === "홀" ||
                field.unit === "대" ||
                field.label?.includes("개수") ||
                field.label?.includes("명수") ||
                field.label?.includes("홀") ||
                field.label?.includes("방 개수") ||
                field.label?.includes("인원") ||
                field.label?.includes("승객");

            if (isCountField) {
                // 정수만 허용
                const intValue = parseInt(inputValue);
                if (
                    isNaN(intValue) ||
                    intValue <= 0 ||
                    !Number.isInteger(Number(inputValue))
                ) {
                    return;
                }
                onChange(intValue.toString());
            } else {
                // 소수점 허용 (면적 등)
                const numValue = parseFloat(inputValue);
                if (isNaN(numValue) || numValue <= 0) {
                    return;
                }
                onChange(numValue.toString());
            }
        } else {
            onChange(inputValue);
        }
    };

    return (
        <div className="mb-3 sm:mb-4 lg:mb-6">
            <label className="block text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold text-black mb-2 sm:mb-3 lg:mb-4">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <input
                        type={
                            field.type === "number" && !field.formatCurrency
                                ? "number"
                                : "text"
                        }
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full border-2 border-gray-200 rounded-lg p-3 sm:p-3 lg:p-4 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:border-primary-purple text-background-dark text-base sm:text-base lg:text-lg 2xl:text-xl font-medium ${
                            error ? "border-red-500" : ""
                        }`}
                        style={{ fontSize: "16px" }}
                        min={
                            field.type === "number" && !field.formatCurrency
                                ? field.unit === "개" ||
                                  field.unit === "명" ||
                                  field.unit === "홀" ||
                                  field.unit === "대" ||
                                  field.label?.includes("개수") ||
                                  field.label?.includes("명수") ||
                                  field.label?.includes("홀") ||
                                  field.label?.includes("방 개수") ||
                                  field.label?.includes("인원") ||
                                  field.label?.includes("승객")
                                    ? "1"
                                    : "0.01"
                                : undefined
                        }
                        step={
                            field.type === "number" && !field.formatCurrency
                                ? field.unit === "개" ||
                                  field.unit === "명" ||
                                  field.unit === "홀" ||
                                  field.unit === "대" ||
                                  field.label?.includes("개수") ||
                                  field.label?.includes("명수") ||
                                  field.label?.includes("홀") ||
                                  field.label?.includes("방 개수") ||
                                  field.label?.includes("인원") ||
                                  field.label?.includes("승객")
                                    ? "1"
                                    : "0.01"
                                : undefined
                        }
                    />
                    {field.unit && (
                        <span className="text-sm text-gray-600 mt-1 block">
                            단위: {field.unit}
                        </span>
                    )}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

interface SelectFieldProps {
    field: CalculationField;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    error?: string | undefined;
}

function SelectField({
    field,
    value,
    onChange,
    options,
    error,
}: SelectFieldProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const selectedOption = options.find((opt) => opt.value === value);

    // 검색어로 필터링된 옵션들
    const filteredOptions = options.filter((option) => {
        const searchLower = searchTerm.toLowerCase();
        const optionLabelLower = option.label.toLowerCase();

        // 기본 검색
        if (optionLabelLower.includes(searchLower)) {
            return true;
        }

        // 별칭 검색 (헬스, 헬스장 -> 체력단련장)
        if (
            (searchLower.includes("헬스") || searchLower.includes("헬스장")) &&
            optionLabelLower.includes("체력단련장")
        ) {
            return true;
        }

        return false;
    });

    // 드롭다운 닫기
    const closeDropdown = () => {
        setIsOpen(false);
        setSearchTerm("");
    };

    // 외부 클릭 감지
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeDropdown();
        }
    };

    return (
        <div className="mb-3 sm:mb-4 lg:mb-6">
            <label className="block text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold text-black mb-2 sm:mb-3 lg:mb-4">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full border-2 border-gray-200 rounded-lg p-3 sm:p-3 lg:p-4 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:border-primary-purple ${
                        error ? "border-red-500" : ""
                    }`}
                >
                    <span className="text-background-dark text-sm sm:text-base lg:text-lg font-medium">
                        {selectedOption?.label ||
                            field.placeholder ||
                            "선택하세요"}
                    </span>
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50"
                        onClick={handleBackgroundClick}
                    >
                        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md mx-4 max-h-[480px] flex flex-col">
                            <div className="py-6 px-4 border-b border-gray-200 text-center">
                                <h3 className="text-lg font-bold text-background-dark mb-2">
                                    {field.id === "hotelGrade"
                                        ? "호텔 등급을 선택하세요"
                                        : "해당하는 업종을 선택하세요"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    매장에서 음악이 흘러나오고 있다면, 대상이 될
                                    수 있습니다
                                </p>
                            </div>

                            {/* 검색 입력 */}
                            <div className="p-4 border-b border-gray-200">
                                <input
                                    type="text"
                                    placeholder={
                                        field.id === "hotelGrade"
                                            ? "등급 검색..."
                                            : "업종 검색..."
                                    }
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-base"
                                    style={{ fontSize: "16px" }}
                                    autoFocus
                                />
                            </div>

                            {/* 옵션 목록 */}
                            <div className="overflow-y-auto max-h-[320px]">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onChange(option.value);
                                                closeDropdown();
                                            }}
                                            className={`w-full text-left py-3 px-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                                option.value === value
                                                    ? "bg-purple-50 text-primary-purple"
                                                    : "text-background-dark"
                                            }`}
                                        >
                                            <div className="text-sm font-medium">
                                                {option.label}
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-3 sm:p-4 text-center text-gray-500 text-xs sm:text-sm">
                                        검색 결과가 없습니다.
                                    </div>
                                )}
                            </div>

                            {/* 닫기 버튼 */}
                            <div className="p-4 border-t border-gray-200 text-center">
                                <button
                                    onClick={closeDropdown}
                                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

interface RadioFieldProps {
    field: CalculationField;
    value: string;
    onChange: (value: string) => void;
    error?: string | undefined;
}

function RadioField({ field, value, onChange, error }: RadioFieldProps) {
    if (!field.options) return null;

    return (
        <div className="mb-3 sm:mb-4 lg:mb-6">
            <label className="block text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold text-black mb-3 sm:mb-4">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
                {field.options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="relative">
                            <input
                                type="radio"
                                name={field.id}
                                value={option.value}
                                checked={value === option.value}
                                onChange={() => onChange(option.value)}
                                className="sr-only"
                            />
                            <div
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
                                    value === option.value
                                        ? "border-primary-purple bg-primary-purple"
                                        : "border-gray-400"
                                } flex items-center justify-center`}
                            >
                                {value === option.value && (
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white"></div>
                                )}
                            </div>
                        </div>
                        <span className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-gray-600">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

interface CalculationResultProps {
    result: CalculationResultData | null;
    isCalculating: boolean;
}

function CalculationResult({ result, isCalculating }: CalculationResultProps) {
    if (isCalculating) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 text-lg">계산 중...</div>
            </div>
        );
    }

    if (!result) {
        // 0원 기본 결과 생성 (totalAmount를 1로 설정하여 징수대상 조건 우회)
        const defaultResult: CalculationResultData = {
            copyrightAmount: 0,
            neighboringAmount: 0,
            totalAmount: -1, // 징수 대상이 아님 메시지 방지
            hasNeighboringRights: true, // 기본값은 저작인접권 있음
            breakdown: [
                {
                    label: "리브뮤직 납부 공연권료(3단체)",
                    amount: 0,
                    isBold: true,
                },
                {
                    label: "월 매장음악사용료",
                    amount: 0,
                    isBold: true,
                },
            ],
        };

        // 기존 CalculationResult 컴포넌트 재사용
        return (
            <CalculationResult result={defaultResult} isCalculating={false} />
        );
    }

    return (
        <div>
            <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold text-black mb-6 sm:mb-8">
                공연권료 계산 결과
            </h3>

            {result.isExempt ? (
                <div className="text-center py-6 sm:py-8">
                    <div className="text-base sm:text-xl text-gray-600 mb-4">
                        해당 조건은 징수 대상이 아닙니다.
                    </div>
                    <div className="text-xl sm:text-3xl font-bold text-primary-purple/80 mb-6">
                        납부금액: 0원
                    </div>
                    {result.exemptMessage && (
                        <div className="text-sm sm:text-base text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            {result.exemptMessage}
                        </div>
                    )}
                </div>
            ) : result.totalAmount === 0 ? (
                <div className="text-center py-6 sm:py-8">
                    <div className="text-base sm:text-xl text-gray-600 mb-4">
                        해당 조건은 징수 대상이 아닙니다.
                    </div>
                    <div className="text-xl sm:text-3xl font-bold text-primary-purple/80">
                        납부금액: 0원
                    </div>
                </div>
            ) : (
                <div className="space-y-4 sm:space-y-6">
                    {/* 계산 결과 항목들 */}
                    {result.breakdown?.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center">
                                <span
                                    className={`${
                                        item.isBold
                                            ? "text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold text-black"
                                            : "text-sm sm:text-base lg:text-lg 2xl:text-xl text-black"
                                    }`}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className={`${
                                        item.isBold
                                            ? "text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold text-black"
                                            : "text-sm sm:text-base lg:text-lg 2xl:text-xl text-black"
                                    }`}
                                >
                                    {item.amount.toLocaleString()}원
                                </span>
                            </div>
                            {/* 리브뮤직 납부 공연권료 아래에 단체 정보 표시 */}
                            {(item.label.includes(
                                "리브뮤직 납부 공연권료(3단체)"
                            ) ||
                                item.label.includes(
                                    "리브뮤직 납부 공연권료"
                                )) && (
                                <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 ml-0">
                                    {result.hasNeighboringRights !== false ? (
                                        <>
                                            함께하는음악저작권협회,
                                            한국음악실연자연합회,
                                            <br />
                                            한국연예제작자협회
                                        </>
                                    ) : (
                                        "함께하는음악저작권협회"
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 구분선 */}
                    <hr className="border-gray-300" />

                    {/* 납부액 */}
                    <div className="bg-primary-purple rounded-lg p-4 sm:p-6">
                        <div className="flex justify-between items-center text-white">
                            <div className="text-base sm:text-xl lg:text-2xl 2xl:text-3xl font-bold">
                                {result.customData?.isAnnualPayment
                                    ? "연 납부액"
                                    : "월 납부액"}{" "}
                                {result.hasNeighboringRights !== false && (
                                    <span className="text-xs sm:text-sm font-normal">
                                        (VAT 포함)
                                    </span>
                                )}
                            </div>
                            <div className="text-base sm:text-xl lg:text-2xl 2xl:text-3xl font-bold">
                                {(result.totalAmount === -1
                                    ? 0
                                    : result.totalAmount
                                ).toLocaleString()}
                                원
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 그룹별 비고 */}
            {result.industryNotes && result.industryNotes.length > 0 && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-xs sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                        업종별 안내사항
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-1 sm:space-y-1.5">
                        {result.industryNotes.map(
                            (note: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-1 sm:mr-2 text-gray-600 text-xs sm:text-sm">
                                        •
                                    </span>
                                    <span className="leading-relaxed text-xs lg:text-sm">
                                        {note}
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}

            {/* 일반 안내사항 */}
            <div className="mt-4 sm:mt-6">
                <p className="text-xs lg:text-[13px] text-gray-700 leading-relaxed">
                    - 한국음악저작권협회(KOMCA)의 공연권은 리브뮤직에서 통합
                    징수하지 않습니다.
                    <br />
                    - 한국음악저작권협회 공연권료는 반드시 협회와 별도 계약을
                    진행하신 후 직접 납부해주셔야 합니다.
                    <br />- Tel.02-2660-0551
                </p>
            </div>
        </div>
    );
}

interface BaseCalculatorProps {
    config: CalculationConfig;
    industries?: Array<any>;
    defaultValues?: Record<string, string>;
}

export function BaseCalculator({
    config,
    industries,
    defaultValues,
}: BaseCalculatorProps) {
    const [formData, setFormData] = useState<Record<string, string>>(
        defaultValues || {}
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [calculationResult, setCalculationResult] =
        useState<CalculationResultData | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // 모바일 단계 관리
    const [currentStep, setCurrentStep] = useState<"input" | "result">("input");
    const [showResult, setShowResult] = useState(false);

    // 초기 값 설정 및 업종 변경 처리
    const [previousIndustry, setPreviousIndustry] = useState<string>("");

    useEffect(() => {
        if (defaultValues) {
            const currentIndustry = defaultValues.industry || "";

            setFormData((prev) => {
                const newFormData = { ...prev };

                // 업종이 변경된 경우에만 업종 관련 필드들을 업데이트
                if (currentIndustry !== previousIndustry) {
                    // 업종 필드는 항상 업데이트
                    if (defaultValues.industry) {
                        newFormData.industry = defaultValues.industry;
                    }

                    // 기본 설정값들 (areaUnit, isRural 등)은 값이 없을 때만 설정
                    Object.keys(defaultValues).forEach((key) => {
                        if (
                            key !== "industry" &&
                            (!newFormData[key] || newFormData[key] === "")
                        ) {
                            const value = defaultValues[key];
                            if (value !== undefined) {
                                newFormData[key] = value;
                            }
                        }
                    });

                    setPreviousIndustry(currentIndustry);

                    // 업종 변경 시 계산 결과 초기화
                    setCalculationResult(null);
                    setErrors({});
                } else {
                    // 업종이 같다면 기본값만 빈 필드에 설정
                    Object.keys(defaultValues).forEach((key) => {
                        if (
                            key !== "industry" &&
                            (!newFormData[key] || newFormData[key] === "")
                        ) {
                            const value = defaultValues[key];
                            if (value !== undefined) {
                                newFormData[key] = value;
                            }
                        }
                    });
                }

                return newFormData;
            });
        }
    }, [defaultValues, previousIndustry]);

    // 폼 데이터 업데이트
    const updateFormData = (fieldId: string, value: string) => {
        setFormData((prev) => ({ ...prev, [fieldId]: value }));
        // 에러 클리어
        if (errors[fieldId]) {
            setErrors((prev) => ({ ...prev, [fieldId]: "" }));
        }

        // 업종 필드가 변경된 경우 핸들러 호출
        if (fieldId === "industry" && config.onIndustryChange) {
            config.onIndustryChange(value);
        }
    };

    // 유효성 검사
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        config.fields.forEach((field) => {
            // 조건부 표시 필드가 표시되지 않는 경우 검증 건너뛰기
            if (
                field.conditionalDisplay &&
                !field.conditionalDisplay(formData, industries)
            ) {
                return;
            }

            const value = formData[field.id];

            if (field.required && (!value || value.trim() === "")) {
                newErrors[
                    field.id
                ] = `${field.label}은(는) 필수 입력 항목입니다.`;
            }

            if (field.validation && value && !field.validation(value)) {
                newErrors[
                    field.id
                ] = `${field.label}의 값이 올바르지 않습니다.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 계산 실행
    const handleCalculate = async () => {
        if (!validateForm()) {
            return;
        }

        setIsCalculating(true);
        try {
            // 계산 데이터 준비
            const calculationData = { ...formData };
            const industryValue = formData.industry || "";

            // 선택된 업종 찾기
            const selectedIndustry = industries?.find(
                (ind) => `${ind.groupId || ind.id}-${ind.id}` === industryValue
            );

            // 노래교실과 에어로빅장이 아닌 경우에만 profitType을 기본값으로 설정
            const isNonprofitTarget =
                selectedIndustry?.name === "노래교실" ||
                selectedIndustry?.name === "에어로빅장";

            if (!isNonprofitTarget) {
                calculationData.profitType = "profit"; // 기본값으로 영리 설정
            }

            console.log("selectedIndustry:", selectedIndustry);

            console.log("isNonprofitTarget:", isNonprofitTarget);
            console.log(
                "calculationData.profitType:",
                calculationData.profitType
            );
            console.log(
                "조건 체크:",
                isNonprofitTarget && calculationData.profitType === "nonprofit"
            );

            if (
                isNonprofitTarget &&
                calculationData.profitType === "nonprofit"
            ) {
                console.log("비영리 조건 만족 - 프론트엔드에서 처리");
                const result = {
                    copyrightAmount: 0,
                    neighboringAmount: 0,
                    totalAmount: 0,
                    isExempt: true,
                    exemptMessage:
                        "비영리 운영과 관련된 자세한 내용은 리브뮤직으로 문의해 주세요.\n1811-7696",
                    breakdown: [],
                    industryNotes: [],
                    hasNeighboringRights: true,
                };
                setCalculationResult(result);

                // 모바일에서는 결과 단계로 전환
                if (window.innerWidth < 1024) {
                    setCurrentStep("result");
                    setTimeout(() => setShowResult(true), 100);
                }
                return;
            }

            const result = await config.calculateFunction(calculationData);
            console.log("BaseCalculator: 계산 결과 ->", result);
            console.log(
                "BaseCalculator: hasNeighboringRights ->",
                result.hasNeighboringRights
            );
            console.log("BaseCalculator: breakdown ->", result.breakdown);
            if (result.breakdown) {
                result.breakdown.forEach((item, index) => {
                    console.log(
                        `BaseCalculator: breakdown[${index}].label ->`,
                        item.label
                    );
                });
            }
            setCalculationResult(result);

            // 모바일에서는 결과 단계로 전환
            if (window.innerWidth < 1024) {
                setCurrentStep("result");
                setTimeout(() => setShowResult(true), 100);
            }
        } catch (error) {
            console.error("계산 중 오류:", error);
            alert("계산 중 오류가 발생했습니다.");
        } finally {
            setIsCalculating(false);
        }
    };

    // 업종별 공연권료로 돌아가기 (모바일)
    const handleBackToInput = () => {
        setCurrentStep("input");
        setShowResult(false);
        // 폼 데이터 리셋
        setFormData(defaultValues || {});
        setCalculationResult(null);
        setErrors({});
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* 모바일 뷰 */}
            <div className="block lg:hidden">
                {currentStep === "input" ? (
                    <div className="bg-white rounded-lg p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-black mb-6">
                            사업장 정보 입력
                        </h3>

                        {config.fields.map((field) => {
                            const value = formData[field.id] || "";
                            const error = errors[field.id];

                            // 조건부 표시 체크
                            if (
                                field.conditionalDisplay &&
                                !field.conditionalDisplay(formData, industries)
                            ) {
                                console.log(
                                    `필드 ${field.id} 숨김 - formData:`,
                                    formData
                                );
                                return null;
                            }

                            // profitType 필드인 경우 디버깅 로그
                            if (field.id === "profitType") {
                                console.log(
                                    "profitType 필드 표시됨 - formData:",
                                    formData
                                );
                            }

                            switch (field.type) {
                                case "industry":
                                    return (
                                        <SelectField
                                            key={field.id}
                                            field={field}
                                            value={value}
                                            onChange={(val) =>
                                                updateFormData(field.id, val)
                                            }
                                            options={
                                                industries?.map((ind) => ({
                                                    value: `${
                                                        ind.groupId || ind.id
                                                    }-${ind.id}`,
                                                    label: ind.name,
                                                })) || []
                                            }
                                            error={error}
                                        />
                                    );
                                case "select":
                                    return (
                                        <SelectField
                                            key={field.id}
                                            field={field}
                                            value={value}
                                            onChange={(val) =>
                                                updateFormData(field.id, val)
                                            }
                                            options={field.options || []}
                                            error={error}
                                        />
                                    );
                                case "radio":
                                    return (
                                        <RadioField
                                            key={field.id}
                                            field={field}
                                            value={value}
                                            onChange={(val) =>
                                                updateFormData(field.id, val)
                                            }
                                            error={error}
                                        />
                                    );
                                case "number":
                                default:
                                    return (
                                        <InputField
                                            key={field.id}
                                            field={field}
                                            value={value}
                                            onChange={(val) =>
                                                updateFormData(field.id, val)
                                            }
                                            error={error}
                                        />
                                    );
                            }
                        })}

                        {/* 계산 결과 보기 버튼 */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
                            <button
                                onClick={handleCalculate}
                                disabled={isCalculating}
                                className="w-full bg-primary-purple text-white py-4 rounded-lg text-base font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isCalculating
                                    ? "계산 중..."
                                    : "계산 결과 보기"}
                                {!isCalculating && (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`bg-white rounded-lg p-4 sm:p-6 pb-24 transition-all duration-500 ease-out ${
                            showResult
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h3 className="text-base sm:text-lg font-bold text-black mb-6">
                            공연권료 계산 결과
                        </h3>

                        <CalculationResult
                            result={calculationResult}
                            isCalculating={false}
                        />
                    </div>
                )}

                {/* 모바일 하단 고정 버튼 */}
                {currentStep === "result" && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden">
                        <button
                            onClick={handleBackToInput}
                            className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg text-base font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg
                                className="w-5 h-5 rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            공연권료 다시 계산하기
                        </button>
                    </div>
                )}
            </div>

            {/* 데스크톱 뷰 */}
            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* 왼쪽: 사업장 정보 입력 섹션 */}
                <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8">
                    <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold text-black mb-6 sm:mb-8">
                        사업장 정보 입력
                    </h3>

                    {config.fields.map((field) => {
                        const value = formData[field.id] || "";
                        const error = errors[field.id];

                        // 조건부 표시 체크
                        if (
                            field.conditionalDisplay &&
                            !field.conditionalDisplay(formData, industries)
                        ) {
                            console.log(
                                `필드 ${field.id} 숨김 (데스크톱) - formData:`,
                                formData
                            );
                            return null;
                        }

                        // profitType 필드인 경우 디버깅 로그
                        if (field.id === "profitType") {
                            console.log(
                                "profitType 필드 표시됨 (데스크톱) - formData:",
                                formData
                            );
                        }

                        switch (field.type) {
                            case "industry":
                                return (
                                    <SelectField
                                        key={field.id}
                                        field={field}
                                        value={value}
                                        onChange={(val) =>
                                            updateFormData(field.id, val)
                                        }
                                        options={
                                            industries?.map((ind) => ({
                                                value: `${
                                                    ind.groupId || ind.id
                                                }-${ind.id}`,
                                                label: ind.name,
                                            })) || []
                                        }
                                        error={error}
                                    />
                                );
                            case "select":
                                return (
                                    <SelectField
                                        key={field.id}
                                        field={field}
                                        value={value}
                                        onChange={(val) =>
                                            updateFormData(field.id, val)
                                        }
                                        options={field.options || []}
                                        error={error}
                                    />
                                );
                            case "radio":
                                return (
                                    <RadioField
                                        key={field.id}
                                        field={field}
                                        value={value}
                                        onChange={(val) =>
                                            updateFormData(field.id, val)
                                        }
                                        error={error}
                                    />
                                );
                            case "number":
                            default:
                                return (
                                    <InputField
                                        key={field.id}
                                        field={field}
                                        value={value}
                                        onChange={(val) =>
                                            updateFormData(field.id, val)
                                        }
                                        error={error}
                                    />
                                );
                        }
                    })}

                    {/* 계산 버튼 */}
                    <div className="text-center mt-6">
                        <button
                            onClick={handleCalculate}
                            disabled={isCalculating}
                            className="bg-primary-purple text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCalculating ? "계산 중..." : "계산하기"}
                        </button>
                    </div>
                </div>

                {/* 오른쪽: 계산 결과 */}
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
                    <CalculationResult
                        result={calculationResult}
                        isCalculating={isCalculating}
                    />
                </div>
            </div>
        </div>
    );
}
