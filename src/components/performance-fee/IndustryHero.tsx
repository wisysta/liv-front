"use client";

import { useState, useEffect } from "react";

export function IndustryHero() {
    // 애니메이션 상태
    const [isLoaded, setIsLoaded] = useState(false);
    const [textAnimations, setTextAnimations] = useState({
        title: false,
        subtitle: false,
        description: false,
    });

    // 페이지 로드 시 애니메이션
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // 텍스트 순차 애니메이션
    useEffect(() => {
        if (isLoaded) {
            const timers = [
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            title: true,
                        })),
                    300
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            subtitle: true,
                        })),
                    600
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            description: true,
                        })),
                    900
                ),
            ];

            return () => timers.forEach((timer) => clearTimeout(timer));
        }
    }, [isLoaded]);

    return (
        <section className="bg-white pt-24 pb-16 lg:pt-32 lg:pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* 제목 */}
                <h1
                    className={`text-3xl lg:text-4xl 2xl:text-5xl font-bold text-background-dark mb-6 lg:mb-8 2xl:mb-12 transition-all duration-700 ease-out ${
                        textAnimations.title
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}
                >
                    업종별 공연권료
                </h1>

                {/* 부제목 */}
                <h2
                    className={`text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark mb-8 lg:mb-12 transition-all duration-700 ease-out ${
                        textAnimations.subtitle
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}
                >
                    우리 가게도 해당이 될까요?
                </h2>

                {/* 설명 */}
                <p
                    className={`text-base lg:text-lg 2xl:text-xl leading-relaxed text-background-dark max-w-4xl mx-auto transition-all duration-700 ease-out ${
                        textAnimations.description
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                    }`}
                >
                    가게에서 배경음악(BGM), TV에서 음악 방송을 켜두는 등
                    <br />
                    매장에서 음악이 흘러나오고 있다면, 대상이 될 수 있습니다
                </p>
            </div>
        </section>
    );
}
