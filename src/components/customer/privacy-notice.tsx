"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface PrivacyNoticeProps {
    isAgreed: boolean;
    onAgreementChange: (agreed: boolean) => void;
}

export function PrivacyNotice({
    isAgreed,
    onAgreementChange,
}: PrivacyNoticeProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="space-y-4">
            {/* 개인정보 수집 안내 */}
            <div className="border border-gray-200 rounded-lg">
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 focus:outline-none transition-colors"
                >
                    <h3 className="text-lg font-semibold text-background-dark">
                        개인정보 수집·이용에 대한 안내
                    </h3>
                    {isExpanded ? (
                        <ChevronUpIcon className="h-5 w-5 text-primary-purple" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                </button>

                {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                        <div className="pt-4 space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                (주)리브뮤직은 이용자 문의를 처리하기 위해
                                다음과 같이 개인정보를 수집 및 이용하며,
                                이용자의 개인정보를 안전하게 취급하는데 최선을
                                다하고 있습니다.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-300">
                                                수집항목
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-r border-gray-300">
                                                수집목적
                                            </th>
                                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                                                보유기간
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-gray-300">
                                            <td className="px-4 py-3 text-sm text-center border-r border-gray-300">
                                                성함, 이메일 주소, 휴대폰 번호
                                            </td>
                                            <td className="px-4 py-3 text-sm text-center border-r border-gray-300">
                                                문의·요청·불편사항 확인 및
                                                처리결과 회신
                                            </td>
                                            <td className="px-4 py-3 text-sm text-center font-semibold">
                                                3년간 보관 후 지체없이 파기
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-sm">
                                위 동의를 거부할 권리가 있으며, 동의를 거부하실
                                경우 문의 처리 및 결과 회신이 제한됩니다.
                                요구하지 않은 개인정보는 입력하지 않도록 주의해
                                주세요.
                            </p>

                            <p className="text-sm">
                                더 자세한 내용에 대해서는 리브뮤직
                                개인정보처리방침을 참고하시기 바랍니다.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* 동의 체크박스 */}
            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={isAgreed}
                    onChange={(e) => onAgreementChange(e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary-purple focus:ring-primary-purple border-gray-300 rounded"
                />
                <label
                    htmlFor="privacy-consent"
                    className="text-sm font-medium text-background-dark"
                >
                    (필수) 개인정보 수집·이용에 대한 안내
                </label>
            </div>
        </div>
    );
}
