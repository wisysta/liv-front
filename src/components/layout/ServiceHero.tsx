"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ServiceHeroProps {
    backgroundImage: string;
    currentService: "integrated-collection" | "heal-music";
    title: string;
    subtitle?: string;
    description: string;
    mobileDescription?: string;
    buttonText?: string;
    buttonLink?: string;
    children?: React.ReactNode;
}

export function ServiceHero({
    backgroundImage,
    currentService,
    title,
    subtitle,
    description,
    mobileDescription,
    buttonText,
    buttonLink,
    children,
}: ServiceHeroProps) {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [textAnimations, setTextAnimations] = useState({
        navigation: false,
        title: false,
        content: false,
        button: false,
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
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            navigation: true,
                        })),
                    300
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({ ...prev, title: true })),
                    600
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            content: true,
                        })),
                    900
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            button: true,
                        })),
                    1200
                ),
            ];

            return () => timers.forEach((timer) => clearTimeout(timer));
        }
    }, [isLoaded]);

    // 페이지 이동 시 이미지 스케일 애니메이션
    const handlePageTransition = (href: string) => {
        setIsTransitioning(true);

        // 100ms 후에 페이지 이동 시작
        setTimeout(() => {
            router.push(href);
        }, 100);

        // 전체 애니메이션이 끝나면 상태 리셋
        setTimeout(() => {
            setIsTransitioning(false);
        }, 1000);
    };

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
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage}
                        alt={`${title} 배경 이미지`}
                        fill
                        className={`object-cover transition-transform duration-500 ease-in ${
                            isTransitioning ? "scale-200" : "scale-100"
                        }`}
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/20 z-[1]" />

                {/* 상단 네비게이션 */}
                <div
                    className={`absolute top-[18vh] sm:top-28 lg:top-[15vh] left-0 right-0 z-12 text-center text-white transition-all duration-700 ease-out ${
                        textAnimations.navigation
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <div className="flex items-center justify-center space-x-8 mb-8 sm:mb-8 lg:mb-12 2xl:mb-18">
                        <Link
                            href="/service/integrated-collection"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageTransition(
                                    "/service/integrated-collection"
                                );
                            }}
                            className={`text-sm lg:text-base 2xl:text-xl transition-colors border-b-2 pb-1 ${
                                currentService === "integrated-collection"
                                    ? "font-semibold border-white"
                                    : "text-white/80 hover:text-white border-transparent"
                            }`}
                        >
                            통합징수
                        </Link>
                        <Link
                            href="/service/heal-music"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageTransition("/service/heal-music");
                            }}
                            className={`text-sm lg:text-base 2xl:text-xl transition-colors border-b-2 pb-1 ${
                                currentService === "heal-music"
                                    ? "font-semibold border-white"
                                    : "text-white/80 hover:text-white border-transparent"
                            }`}
                        >
                            Heal Music
                        </Link>
                    </div>

                    {/* 페이지 타이틀 */}
                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-semibold whitespace-pre">
                        {title}
                    </h1>
                </div>

                {/* 메인 콘텐츠 - 화면 정중앙 */}
                <div className="absolute inset-0 flex items-center justify-center z-[3] mt-20">
                    <div className="text-center text-white px-4">
                        {subtitle && (
                            <h2
                                className={`text-2xl lg:text-3xl 2xl:text-4xl font-semibold mb-4 lg:mb-8 leading-normal transition-all duration-700 ease-out whitespace-pre-line ${
                                    textAnimations.content
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                {subtitle}
                            </h2>
                        )}

                        {/* 데스크톱용 설명 */}
                        <div
                            className={`hidden lg:block space-y-6 text-lg 2xl:text-xl max-w-4xl mx-auto leading-relaxed mb-12 lg:mg-14 2xl:mb-18 transition-all duration-700 ease-out ${
                                textAnimations.content
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        </div>

                        {/* 모바일용 설명 */}
                        <div
                            className={`lg:hidden space-y-6 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed mb-12 transition-all duration-700 ease-out ${
                                textAnimations.content
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            {mobileDescription ? (
                                <div className="whitespace-pre-line">
                                    {mobileDescription}
                                </div>
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: description,
                                    }}
                                />
                            )}
                        </div>

                        {buttonText && buttonLink && (
                            <div
                                className={`transition-all duration-700 ease-out ${
                                    textAnimations.button
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                <Link
                                    href={buttonLink}
                                    target={
                                        buttonLink.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        buttonLink.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    className="border border-white text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-10 lg:px-16 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer"
                                >
                                    {buttonText}
                                </Link>
                            </div>
                        )}

                        {children}
                    </div>
                </div>
            </section>
        </>
    );
}
