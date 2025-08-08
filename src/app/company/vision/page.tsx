"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CompanyNavigation } from "@/components/layout/CompanyNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ValuesSwiper } from "@/components/ui/ValuesSwiper";
import { ScrollInteractionSection } from "@/components/ui/ScrollInteractionSection";

export default function CompanyVisionPage() {
    const [scrollY, setScrollY] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [windowHeight, setWindowHeight] = useState(800); // 기본값 설정
    const frameRef = useRef<number | null>(null);

    // 스크롤 애니메이션 훅들
    const heroSection = useScrollAnimation({ delay: 200 });
    const heroAnimation = useScrollAnimation({ delay: 0 });
    const descriptionAnimation = useScrollAnimation({ delay: 0 });

    // 클라이언트 사이드에서만 실행
    useEffect(() => {
        setIsClient(true);
        setWindowHeight(window.innerHeight);

        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener("resize", handleResize, { passive: true });

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 최적화된 스크롤 이벤트 처리
    useEffect(() => {
        if (!isClient) return;

        let lastScrollY = 0;

        const handleScroll = () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            frameRef.current = requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                // 스크롤 변화가 충분할 때만 업데이트 (성능 최적화)
                if (Math.abs(currentScrollY - lastScrollY) > 2) {
                    setScrollY(currentScrollY);
                    lastScrollY = currentScrollY;
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isClient]);

    // 스크롤에 따른 히어로 섹션 스타일 계산
    const getHeroStyles = () => {
        if (!isClient) {
            return {
                height: "350px",
                marginLeft: "192px",
                marginRight: "192px",
                borderRadius: "8px",
            };
        }

        const maxScroll = 200;
        const progress = Math.min(scrollY / maxScroll, 1);
        const targetHeight = windowHeight - 350;

        return {
            height: `${350 + progress * targetHeight}px`,
            marginLeft: `${192 * (1 - progress)}px`,
            marginRight: `${192 * (1 - progress)}px`,
            borderRadius: `${8 * (1 - progress)}px`,
        };
    };

    // 추가 설명 텍스트 표시 조건 및 페이드인 계산
    const shouldShowDescription = scrollY > 150;
    const descriptionOpacity = isClient
        ? Math.min(Math.max((scrollY - 150) / 100, 0), 1)
        : 0;

    // 스크롤에 따른 폰트 크기 계산
    const getFontSizeStyle = () => {
        if (!isClient) return {};

        const maxScroll = 200;
        const progress = Math.min(scrollY / maxScroll, 1);

        // 기본 크기에서 한 단계 큰 크기로 변화
        // 1.125rem(18px) → 1.5rem(24px)
        const baseSize = 1.5; // text-2xl
        const targetSize = 1.875; // text-3xl

        const currentSize = baseSize + (targetSize - baseSize) * progress;

        return {
            fontSize: `${currentSize}rem`,
        };
    };

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero 섹션 */}
            <section className="bg-white pt-24 lg:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 회사 네비게이션 */}
                    <div
                        ref={heroSection.ref}
                        className={`mb-12 lg:mb-14 2xl:mb-16 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <CompanyNavigation currentPage="vision" />
                    </div>

                    {/* 제목 */}
                    <div
                        className={`text-center mb-16 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark mb-4">
                            기업비전
                        </h1>
                    </div>
                </div>
            </section>

            {/* 히어로 이미지 섹션 */}
            <section
                className="relative overflow-hidden transition-all duration-300 ease-out mt-12 lg:mt-24 2xl:mt-32"
                style={getHeroStyles()}
            >
                <Image
                    src="/기업소개_메인.jpg"
                    alt="기업비전 히어로 배경"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8">
                    <div
                        ref={heroAnimation.ref}
                        className={`max-w-md lg:max-w-4xl transition-all delay-700 duration-1500 ease-out ${
                            heroAnimation.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h1
                            className={`font-semibold leading-relaxed mb-8 transition-all duration-300 ease-out ${
                                !isClient
                                    ? "text-lg lg:text-xl 2xl:text-2xl"
                                    : ""
                            }`}
                            style={getFontSizeStyle()}
                        >
                            주식회사 리브뮤직은
                            <br />
                            국내 최초 K-POP 디지털 전환(DX) 기반
                            <br />
                            공연권 통합징수 플랫폼입니다
                        </h1>

                        {/* 추가 설명 텍스트 */}
                        <div
                            className="max-w-4xl transition-all duration-500 ease-out overflow-hidden"
                            style={{
                                opacity: descriptionOpacity,
                                transform: `translateY(${
                                    (1 - descriptionOpacity) * 20
                                }px)`,
                                maxHeight:
                                    descriptionOpacity > 0 ? "500px" : "0px",
                            }}
                        >
                            <p className="text-base lg:text-lg leading-relaxed mb-6">
                                카페, 헬스장, 식당 등 일상 속 공간에서 음악이
                                자유롭게 사용되며
                                <br />
                                음악의 가치가 정당하게 보상되는 선순환 구조를
                                만드는 것을 목표로 하고 있습니다
                            </p>

                            <p className="text-base lg:text-lg leading-relaxed mb-6">
                                복잡한 음악 이용계약과 공연권료 납부 절차를
                                하나로 통합해 이용자에게는 편리함을 제공하고,
                                <br />
                                창작자와 가창자 등 권리자에게는 정당한 권리가
                                돌아가는 건강한 음악 생태계를 만들어갑니다
                            </p>

                            <p className="text-base lg:text-lg font-semibold">
                                이것이 리브뮤직이 만들어가는 새로운 길입니다
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 가치 섹션 */}
            <section className="py-20 lg:py-32 bg-white">
                {/* 가치 카드 스와이퍼 */}
                <ValuesSwiper />
            </section>

            {/* 스크롤 인터렉션 섹션 */}
            <ScrollInteractionSection />
        </PageLayout>
    );
}
