"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Home() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [textAnimations, setTextAnimations] = useState({
        subtitle: false,
        title: false,
        description: false,
        buttons: false,
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
                            subtitle: true,
                        })),
                    500
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({ ...prev, title: true })),
                    800
                ),
                setTimeout(
                    () =>
                        setTextAnimations((prev) => ({
                            ...prev,
                            description: true,
                            buttons: true,
                        })),
                    1100
                ),
            ];

            return () => timers.forEach((timer) => clearTimeout(timer));
        }
    }, [isLoaded]);

    // 페이지 이동 시 이미지 스케일 애니메이션
    const handlePageTransition = (href: string) => {
        setIsTransitioning(true);

        // 100ms 후에 페이지 이동 시작 (애니메이션 초기 단계에서)
        setTimeout(() => {
            router.push(href);
        }, 100);

        // 전체 애니메이션이 끝나면 상태 리셋 (1000ms 총 시간)
        setTimeout(() => {
            setIsTransitioning(false);
        }, 1000);
    };

    return (
        <PageLayout headerOverlay={true} fullHeight={true}>
            {/* 커튼 애니메이션 */}
            <div
                className={`fixed inset-0 z-50 pointer-events-none transition-transform duration-1000 ease-out ${
                    isLoaded ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <div className="absolute left-0 top-0 w-1/2 h-full bg-white"></div>
            </div>
            <div
                className={`fixed inset-0 z-50 pointer-events-none transition-transform duration-1000 ease-out ${
                    isLoaded ? "translate-x-full" : "translate-x-0"
                }`}
            >
                <div className="absolute right-0 top-0 w-1/2 h-full bg-white"></div>
            </div>

            {/* 히어로 섹션 - 100vh */}
            <div className="h-full relative min-h-screen overflow-hidden">
                {/* 메인 배경 이미지 */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/main-hero.jpg"
                        alt="리브뮤직 메인 배경"
                        fill
                        className={`object-cover object-center transition-transform duration-500 ease-in ${
                            isTransitioning ? "scale-200" : "scale-100"
                        }`}
                        priority
                        quality={100}
                    />
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* 컨텐츠 */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-24 text-center">
                    <div className="mb-6 sm:mb-8">
                        <p
                            className={`text-white text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 2xl:mb-8 tracking-wide transition-all duration-700 ease-out ${
                                textAnimations.subtitle
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            LIV MUSIC COMPANY
                        </p>
                        <h1
                            className={`text-white text-2xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-[54px] font-semibold leading-tight mb-4 sm:mb-6 lg:mb-12 2xl:mb-14 transition-all duration-700 ease-out ${
                                textAnimations.title
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            공연권료 납부
                            <br />
                            쉽게 해결하세요
                        </h1>
                        <p
                            className={`text-white text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl mb-8 sm:mb-12 max-w-lg mx-auto transition-all duration-700 ease-out ${
                                textAnimations.description
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            따뜻한 소통과 친절한 태도로 공연권료 납부를
                            도와드리겠습니다
                        </p>
                    </div>

                    {/* CTA 버튼들 */}
                    <div
                        className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-lg transition-all duration-700 ease-out ${
                            textAnimations.buttons
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <button
                            // onClick={() => handlePageTransition("/calculator")}
                            className="text-primary-purple font-semibold bg-white py-2 sm:py-2.5 xl:py-3 px-6 sm:px-7 xl:px-8 rounded-full hover:bg-primary-purple hover:text-white transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer"
                        >
                            공연권료 계산기
                        </button>
                        <button
                            onClick={() =>
                                handlePageTransition(
                                    "/service/integrated-collection"
                                )
                            }
                            className="border border-white text-white font-semibold py-2 sm:py-2.5 xl:py-3 px-6 sm:px-7 xl:px-8 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer"
                        >
                            서비스 소개
                        </button>
                        <button
                            onClick={() =>
                                handlePageTransition("/customer/faq")
                            }
                            className="border border-white text-white font-semibold py-2 sm:py-2.5 xl:py-3 px-6 sm:px-7 xl:px-8 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer"
                        >
                            고객센터
                        </button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
