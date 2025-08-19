"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

interface MaterialPasswordGateProps {
    onAuthenticated: (token: string) => void;
}

export default function MaterialPasswordGate({
    onAuthenticated,
}: MaterialPasswordGateProps) {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/materials/auth`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "인증에 실패했습니다.");
            }

            if (data.success && data.accessToken) {
                // 토큰을 로컬 스토리지에 저장 (24시간 유효)
                localStorage.setItem(
                    "materials-access-token",
                    data.accessToken
                );

                // URL에 토큰 추가하여 페이지 리다이렉트
                const currentPath = window.location.pathname;
                const newUrl = `${currentPath}?token=${data.accessToken}`;
                router.push(newUrl);

                onAuthenticated(data.accessToken);
            } else {
                throw new Error("서버에서 올바르지 않은 응답을 받았습니다.");
            }
        } catch (err) {
            console.error("인증 오류:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "인증 중 오류가 발생했습니다."
            );
            setPassword("");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[400px] flex items-center justify-center bg-white">
            <div className="max-w-md w-full mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    {/* 아이콘 */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-primary-purple/10 rounded-full flex items-center justify-center">
                            <LockClosedIcon className="w-8 h-8 text-primary-purple" />
                        </div>
                    </div>

                    {/* 제목 */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-background-dark mb-2">
                            자료실 접근
                        </h2>
                        <p className="text-gray-600">
                            자료실에 접근하려면 비밀번호를 입력해주세요.
                        </p>
                    </div>

                    {/* 폼 */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                비밀번호
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="비밀번호를 입력하세요"
                                    className="block w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-purple focus:border-transparent transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* 에러 메시지 */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* 제출 버튼 */}
                        <button
                            type="submit"
                            disabled={isLoading || !password.trim()}
                            className="w-full bg-primary-purple text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-purple/90 focus:outline-none focus:ring-2 focus:ring-primary-purple focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    확인 중...
                                </div>
                            ) : (
                                "접근하기"
                            )}
                        </button>
                    </form>

                    {/* 하단 정보 */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            비밀번호를 모르시나요?{" "}
                            <a
                                href="/customer/inquiry"
                                className="text-primary-purple hover:text-primary-purple/80 font-medium"
                            >
                                문의하기
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
