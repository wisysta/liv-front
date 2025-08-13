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
        const inputValue = e.target.value;

        if (field.type === "number") {
            // 숫자 타입일 때만 검증 로직 적용
            if (inputValue === "") {
                onChange("");
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
        <div className="mb-8">
            <label className="block text-base lg:text-lg 2xl:text-xl font-semibold text-black mb-4">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <input
                        type={field.type === "number" ? "number" : "text"}
                        value={value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full border-2 border-gray-200 rounded-lg p-3 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:border-primary-purple text-background-dark text-base lg:text-lg 2xl:text-xl font-medium ${
                            error ? "border-red-500" : ""
                        }`}
                        min={
                            field.type === "number"
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
                            field.type === "number"
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
    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div className="mb-8">
            <label className="block text-base lg:text-lg 2xl:text-xl font-semibold text-black mb-4">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full border-2 border-gray-200 rounded-lg p-4 bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors focus:outline-none focus:border-primary-purple ${
                        error ? "border-red-500" : ""
                    }`}
                >
                    <span className="text-background-dark text-sm lg:text-base font-medium">
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
                        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md mx-4 max-h-96 flex flex-col">
                            <div className="p-4 border-b border-gray-200 text-center">
                                <h3 className="text-lg font-bold text-background-dark mb-2">
                                    해당하는 업종을 선택하세요
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
                                    placeholder="업종 검색..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-sm"
                                    autoFocus
                                />
                            </div>

                            {/* 옵션 목록 */}
                            <div className="overflow-y-auto max-h-80">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onChange(option.value);
                                                closeDropdown();
                                            }}
                                            className={`w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
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
                                    <div className="p-4 text-center text-gray-500 text-sm">
                                        검색 결과가 없습니다.
                                    </div>
                                )}
                            </div>

                            {/* 닫기 버튼 */}
                            <div className="p-4 border-t border-gray-200 text-center">
                                <button
                                    onClick={closeDropdown}
                                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
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
        <div className="mb-8">
            <label className="block text-base lg:text-lg 2xl:text-xl font-semibold text-black mb-4">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex items-center gap-4 mb-2">
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
                                className={`w-5 h-5 rounded-full border-2 ${
                                    value === option.value
                                        ? "border-primary-purple bg-primary-purple"
                                        : "border-gray-400"
                                } flex items-center justify-center`}
                            >
                                {value === option.value && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                            </div>
                        </div>
                        <span className="text-base lg:text-lg 2xl:text-xl text-gray-600">
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
        return (
            <div className="flex items-center justify-center h-full min-h-96">
                <div className="text-center">
                    <div className="text-gray-400 mb-4">
                        <svg
                            className="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                        정보를 입력하고 계산 버튼을 눌러주세요
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-black mb-8">
                이용권 금액 조회 결과
            </h3>

            {result.isExempt ? (
                <div className="text-center py-12">
                    <div className="text-2xl lg:text-3xl font-bold text-primary-purple mb-4">
                        {result.exemptMessage || "징수 제외 대상입니다"}
                    </div>
                </div>
            ) : result.totalAmount === 0 ? (
                <div className="text-center py-8">
                    <div className="text-xl text-gray-600 mb-4">
                        해당 조건은 징수 대상이 아닙니다.
                    </div>
                    <div className="text-3xl font-bold text-primary-purple/80">
                        납부금액: 0원
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* 계산 결과 항목들 */}
                    {result.breakdown?.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center">
                                <span
                                    className={`${
                                        item.isBold
                                            ? "text-base lg:text-lg 2xl:text-xl font-semibold text-black"
                                            : "text-base lg:text-lg 2xl:text-xl text-black"
                                    }`}
                                >
                                    {item.label}
                                </span>
                                <span
                                    className={`${
                                        item.isBold
                                            ? "text-base lg:text-lg 2xl:text-xl font-semibold text-black"
                                            : "text-base lg:text-lg 2xl:text-xl text-black"
                                    }`}
                                >
                                    {item.amount.toLocaleString()}원
                                </span>
                            </div>
                            {/* 리브뮤직 납부 공연권료(3단체) 아래에 단체 정보 표시 */}
                            {item.label.includes(
                                "리브뮤직 납부 공연권료(3단체)"
                            ) && (
                                <div className="text-sm text-gray-600 mt-2 ml-0">
                                    함께하는음악저작권협회,
                                    한국음악실연자연합회,
                                    <br />
                                    한국연예제작자협회
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 구분선 */}
                    <hr className="border-gray-300" />

                    {/* 월 납부액 */}
                    <div className="bg-primary-purple rounded-lg p-6">
                        <div className="flex justify-between items-center text-white">
                            <div className="text-xl lg:text-2xl 2xl:text-3xl font-bold">
                                월 납부액{" "}
                                <span className="text-sm font-normal">
                                    (VAT 포함)
                                </span>
                            </div>
                            <div className="text-xl lg:text-2xl 2xl:text-3xl font-bold">
                                {result.totalAmount.toLocaleString()}원
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 그룹별 비고 */}
            {result.industryNotes && result.industryNotes.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">
                        업종별 안내사항
                    </h4>
                    <ul className="text-xs text-gray-700 space-y-1.5">
                        {result.industryNotes.map(
                            (note: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <span className="mr-2 text-gray-600 text-sm">
                                        •
                                    </span>
                                    <span className="leading-relaxed">
                                        {note}
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}

            {/* 일반 안내사항 */}
            <div className="mt-6">
                <p className="text-xs text-gray-700">
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
            console.log("BaseCalculator: 업종 변경됨 ->", value);
            config.onIndustryChange(value);
        }
    };

    // 유효성 검사
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        config.fields.forEach((field) => {
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
            const result = await config.calculateFunction(formData);
            setCalculationResult(result);
        } catch (error) {
            console.error("계산 중 오류:", error);
            alert("계산 중 오류가 발생했습니다.");
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* 왼쪽: 사업장 정보 입력 섹션 */}
                <div className="bg-white rounded-lg p-8">
                    <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-black mb-8">
                        사업장 정보 입력
                    </h3>

                    {config.fields.map((field) => {
                        const value = formData[field.id] || "";
                        const error = errors[field.id];

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
                    <div className="text-center">
                        <button
                            onClick={handleCalculate}
                            disabled={isCalculating}
                            className="bg-primary-purple text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCalculating ? "계산 중..." : "계산하기"}
                        </button>
                    </div>
                </div>

                {/* 오른쪽: 계산 결과 */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <CalculationResult
                        result={calculationResult}
                        isCalculating={isCalculating}
                    />
                </div>
            </div>
        </div>
    );
}
