"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface PerformanceFeeHeroProps {
    backgroundImage: string;
    title: string;
    contentBlocks: {
        text: string;
        fontWeight?: "normal" | "semibold";
        fontSize?: "base" | "lg";
    }[];
    laws: string[];
}

export function PerformanceFeeHero({
    backgroundImage,
    title,
    contentBlocks,
    laws,
}: PerformanceFeeHeroProps) {
    // ServiceHero와 동일한 애니메이션 상태
    const [isLoaded, setIsLoaded] = useState(false);
    const [textAnimations, setTextAnimations] = useState({
        content: false,
        mainContent: false,
    });

    // 페이지 로드 시 커튼 애니메이션
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // 커튼 열린 후 텍스트 순차 애니메이션
    useEffect(() => {
        if (isLoaded) {
            const timers = [
                // 제목, 다른 텍스트, 관계법령은 동시에 페이드인
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            content: true,
                        })),
                    600
                ),
                // 메인 텍스트는 나중에 아래에서 위로
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            mainContent: true,
                        })),
                    1200
                ),
            ];

            return () => timers.forEach((timer) => clearTimeout(timer));
        }
    }, [isLoaded]);

    return (
        <>
            {/* 커튼 애니메이션 */}
            <div
                className={`fixed inset-0 pointer-events-none transition-all duration-1000 ease-out ${
                    isLoaded ? "-translate-x-full z-0" : "translate-x-0 z-50"
                }`}
            >
                <div className="absolute left-0 top-0 w-1/2 h-full bg-white"></div>
            </div>
            <div
                className={`fixed inset-0 pointer-events-none transition-all duration-1000 ease-out ${
                    isLoaded ? "translate-x-full z-0" : "translate-x-0 z-50"
                }`}
            >
                <div className="absolute right-0 top-0 w-1/2 h-full bg-white"></div>
            </div>

            {/* 히어로 섹션 */}
            <section className="relative h-screen overflow-hidden">
                <Image
                    src={backgroundImage}
                    alt={`${title} 히어로 배경`}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8">
                    <h1
                        className={`text-3xl lg:text-4xl 2xl:text-5xl font-bold mb-8 lg:mb-12 transition-all duration-700 ease-out ${
                            textAnimations.content ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {title}
                    </h1>

                    <div className="max-w-5xl space-y-6 lg:space-y-8 mb-12 lg:mb-16">
                        {contentBlocks.map((block, index) => {
                            const fontWeightClass =
                                block.fontWeight === "semibold"
                                    ? "font-semibold"
                                    : "";
                            const fontSizeClass =
                                block.fontSize === "base"
                                    ? "text-base lg:text-lg 2xl:text-xl"
                                    : "text-lg lg:text-xl 2xl:text-2xl";

                            // 첫 번째 블록(메인 텍스트)은 아래에서 위로, 나머지는 제자리에서 페이드인
                            const animationClass =
                                index === 0
                                    ? `transition-all duration-700 ease-out ${
                                          textAnimations.mainContent
                                              ? "opacity-100 translate-y-0"
                                              : "opacity-0 translate-y-12"
                                      }`
                                    : `transition-all duration-700 ease-out ${
                                          textAnimations.content
                                              ? "opacity-100"
                                              : "opacity-0"
                                      }`;

                            return (
                                <p
                                    key={index}
                                    className={`${fontSizeClass} leading-relaxed ${fontWeightClass} ${animationClass}`}
                                    dangerouslySetInnerHTML={{
                                        __html: block.text,
                                    }}
                                />
                            );
                        })}
                    </div>

                    {/* 관계법령 버튼들 */}
                    <div
                        className={`flex flex-wrap justify-center items-center gap-3 mb-8 lg:mb-12 transition-all duration-700 ease-out ${
                            textAnimations.content ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <span className="text-white/80 text-sm lg:text-base 2xl:text-lg font-bold">
                            관계법령
                        </span>
                        {laws.map((law, index) => (
                            <div
                                key={index}
                                className="bg-white/20 backdrop-blur-sm border border-none rounded-md px-3 py-1.5"
                            >
                                <span className="text-white text-xs font-medium">
                                    {law}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
