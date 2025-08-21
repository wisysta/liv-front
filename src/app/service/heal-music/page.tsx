"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServiceHero } from "@/components/layout/ServiceHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HealMusicPage() {
    // 타이핑 애니메이션 상태
    const [typingText, setTypingText] = useState("");
    const [typingCompleted, setTypingCompleted] = useState(false);
    const fullText =
        "Heal Music은 단순한 라이선스를 넘어,\n건강한 산업 생태계를 함께 만들어가는 상생의 시작점입니다.";

    // 스크롤 애니메이션 훅들
    const sectionContainer = useScrollAnimation({ delay: 0 }); // 전체 섹션용
    const typingParagraph = useScrollAnimation({ delay: 0 }); // 타이핑 문단용
    const serviceInfoSection = useScrollAnimation({ delay: 200 });
    const benefitSection = useScrollAnimation({ delay: 0 });
    const reasonSection = useScrollAnimation({ delay: 0 });
    const ctaSection = useScrollAnimation({ delay: 200 });

    // 개별 카드 애니메이션
    const [visibleCards, setVisibleCards] = useState([false, false]);
    const [visibleReasons, setVisibleReasons] = useState([
        false,
        false,
        false,
        false,
    ]);

    // 타이핑 애니메이션 효과
    useEffect(() => {
        if (typingParagraph.isVisible && typingText.length < fullText.length) {
            const timer = setTimeout(() => {
                setTypingText(fullText.slice(0, typingText.length + 1));

                // 타이핑 완료 시
                if (typingText.length + 1 === fullText.length) {
                    setTypingCompleted(true);
                }
            }, 40);
            return () => clearTimeout(timer);
        }
    }, [typingParagraph.isVisible, typingText, fullText]);

    // 요금 혜택 카드 애니메이션
    useEffect(() => {
        if (benefitSection.isVisible) {
            const timer1 = setTimeout(
                () => setVisibleCards([true, false]),
                300
            );
            const timer2 = setTimeout(() => setVisibleCards([true, true]), 600);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [benefitSection.isVisible]);

    // 선택하는 이유 카드 애니메이션
    useEffect(() => {
        if (reasonSection.isVisible) {
            const timers = [
                setTimeout(
                    () => setVisibleReasons([true, false, false, false]),
                    200
                ),
                setTimeout(
                    () => setVisibleReasons([true, true, false, false]),
                    800
                ),
                setTimeout(
                    () => setVisibleReasons([true, true, true, false]),
                    1200
                ),
                setTimeout(
                    () => setVisibleReasons([true, true, true, true]),
                    2000
                ),
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [reasonSection.isVisible]);

    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            <ServiceHero
                backgroundImage="/heal-music-hero.jpg"
                currentService="heal-music"
                title="Heal Music"
                subtitle={"체력단련 시설을 위한\n공연권 라이선스 통합서비스"}
                description="<p>'음악'은 우리 일상에 활력을 더하고, 공간의 분위기를 완성하는 중요한 요소입니다</p><p>Heal Music은 헬스장 등 체력단련 시설에서 복잡한 저작권 문제와 불편한 계약 절차, 공연권료 납부를<br />One-Stop으로 해결할 수 있도록 구성된 [ <b>매장 맞춤형 음악 서비스</b> ]입니다</p>"
                mobileDescription={
                    "'음악'은 우리 일상에 활력을 더하고, 공간의 분위기를\n완성하는 중요한 요소입니다. Heal Music은 헬스장 등\n 체력단련 시설에서 복잡한 저작권 문제와 불편한 계약 절차,\n 공연권료 납부를 One-Stop으로 해결할 수 있도록 구성된\n[매장 맞춤형 음악 서비스 ]입니다"
                }
                buttonText="신청하기"
                buttonLink="https://docs.google.com/forms/d/1wbzTdKvYxH9BuIj2TZbgoWoeecqgd1swL_O_J0_YOHQ/viewform?pli=1&edit_requested=true"
            />

            {/* 서비스 설명 섹션 */}
            <section className="bg-white py-24 lg:py-48 2xl:py-60 ">
                <div className="max-w-5xl mx-auto px-8 sm:px-6 lg:px-8 text-center">
                    <div
                        ref={sectionContainer.ref}
                        className="space-y-12 lg:space-y-16 text-background-dark"
                    >
                        <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl leading-relaxed font-normal">
                            그동안 음악 사용과 관련해 명확하지 않은 기준으로
                            인해
                            <br />
                            혼란을 겪었던 현장의 목소리를 듣고,
                            <br />
                            리브뮤직은 이용자와 음악 권리자 모두가 만족할 수
                            있는 구조를 고민했습니다
                        </p>
                        <p
                            ref={typingParagraph.ref}
                            className="sm:text-xl lg:text-2xl 2xl:text-3xl leading-relaxed font-semibold whitespace-pre-line inline-block min-h-24"
                        >
                            {typingText}
                            {typingText.length < fullText.length && (
                                <span className="animate-pulse">|</span>
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* 서비스 정보 섹션 */}
            <section className="bg-gray-light py-12 sm:py-16 lg:py-20 xl:py-32">
                <div className="max-w-6xl mx-auto px-8 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark text-center mb-8 sm:mb-10 lg:mb-16 2xl:mb-20">
                        요금 혜택
                    </h2>
                    <div
                        ref={serviceInfoSection.ref}
                        className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${
                            serviceInfoSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        {/* 첫 번째 열 */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-8">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-sm sm:text-xl sm:w-40 mb-2 sm:mb-0">
                                    서비스 대상
                                </span>
                                <span className="text-background-dark font-semibold text-sm sm:text-xl">
                                    체력단련장(헬스장 등 운동시설)
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-sm sm:text-xl sm:w-40 mb-2 sm:mb-0">
                                    서비스 시작일
                                </span>
                                <span className="text-background-dark font-semibold text-sm sm:text-xl">
                                    2025년 8월 1일
                                </span>
                            </div>
                        </div>
                        {/* 두 번째 열 */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-8">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-sm sm:text-xl sm:w-48 mb-2 sm:mb-0">
                                    서비스 명칭
                                </span>
                                <span className="text-background-dark font-semibold text-sm sm:text-xl">
                                    Heal Music
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-sm sm:text-xl sm:w-48 mb-2 sm:mb-0">
                                    이벤트 기간
                                </span>
                                <span className="text-background-dark font-semibold text-sm sm:text-xl">
                                    2025.08.01 ~ 2025.10.31
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 요금 혜택 섹션 */}
                    <div
                        ref={benefitSection.ref}
                        className="text-center mb-8 sm:mb-12 lg:mb-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
                            {/* 1년 선납 */}
                            <div
                                className={`bg-white rounded-lg px-4 py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10 shadow-md text-center border border-gray-100 transition-all duration-700 ease-out ${
                                    visibleCards[0]
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-80"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4 sm:mb-6 2xl:mb-8">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-background-dark">
                                        1년 선납 시
                                    </h3>
                                    <span className="text-gray-300 text-sm sm:text-xl lg:text-2xl uppercase tracking-wider font-bold">
                                        YEAR
                                    </span>
                                </div>
                                <div className="inline-block bg-primary-purple text-white w-full px-4 py-2 sm:px-8 sm:py-3 rounded-lg text-lg sm:text-xl lg:text-2xl font-bold">
                                    50% 할인
                                </div>
                            </div>

                            {/* 월 납부 */}
                            <div
                                className={`bg-white rounded-lg px-4 py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10 shadow-md text-center border border-gray-100 transition-all duration-700 ease-out ${
                                    visibleCards[1]
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-80"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4 sm:mb-6 2xl:mb-8">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-background-dark">
                                        월 납부 시
                                    </h3>
                                    <span className="text-gray-300 text-sm sm:text-xl lg:text-2xl uppercase tracking-wider font-bold">
                                        MONTH
                                    </span>
                                </div>
                                <div className="inline-block bg-primary-purple text-white w-full px-4 py-2 sm:px-8 sm:py-3 rounded-lg text-lg sm:text-xl lg:text-2xl font-bold">
                                    10% 할인
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heal Music을 선택하는 이유 */}
            <section className="bg-white py-20 lg:py-32">
                <div className="max-w-6xl mx-auto px-8 sm:px-6 lg:px-8">
                    <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark text-center mb-12 lg:mb-16 2xl:mb-20">
                        Heal Music을 선택하는 이유
                    </h2>
                    <div
                        ref={reasonSection.ref}
                        className={`space-y-6 lg:space-y-8 transition-all duration-1000 ease-out ${
                            reasonSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                        }`}
                    >
                        <div
                            className={`rounded-lg px-6 py-6 2xl:py-8 lg:px-8 2xl:px-10 lg:py-10 transition-all duration-700 ease-out ${
                                visibleReasons[0]
                                    ? "bg-primary-purple opacity-100 translate-y-0"
                                    : "bg-gray-light  translate-y-8"
                            }`}
                        >
                            <h3
                                className={`text-sm sm:text-xl lg:text-2xl font-bold text-left leading-tight transition-colors duration-700 ${
                                    visibleReasons[0]
                                        ? "text-white"
                                        : "text-gray-500"
                                }`}
                            >
                                음악 사용에 대한 복잡한 절차없이 간편한 이용
                            </h3>
                        </div>
                        <div
                            className={`rounded-lg px-6 py-6 2xl:py-8 lg:px-8 2xl:px-10 lg:py-10 transition-all duration-700 ease-out ${
                                visibleReasons[1]
                                    ? "bg-primary-purple translate-y-0"
                                    : "bg-gray-light translate-y-8"
                            }`}
                        >
                            <h3
                                className={`text-sm sm:text-xl lg:text-2xl font-semibold text-left leading-tight transition-colors duration-700 ${
                                    visibleReasons[1]
                                        ? "text-white"
                                        : "text-gray-500"
                                }`}
                            >
                                업종 특성에 맞춘 합리적인 요율과 맞춤형 지원
                            </h3>
                        </div>
                        <div
                            className={`rounded-lg px-6 py-6 2xl:py-8 lg:px-8 2xl:px-10 lg:py-10 transition-all duration-700 ease-out ${
                                visibleReasons[2]
                                    ? "bg-primary-purple translate-y-0"
                                    : "bg-gray-light translate-y-8"
                            }`}
                        >
                            <h3
                                className={`text-sm sm:text-xl lg:text-2xl font-semibold text-left leading-tight transition-colors duration-700 ${
                                    visibleReasons[2]
                                        ? "text-white"
                                        : "text-gray-500"
                                }`}
                            >
                                저작권 분쟁없이 안심하고 음악 사용
                            </h3>
                        </div>
                        <div
                            className={`rounded-lg px-6 py-6 2xl:py-8 lg:px-8 2xl:px-10 lg:py-10 transition-all duration-700 ease-out ${
                                visibleReasons[3]
                                    ? "bg-primary-purple translate-y-0"
                                    : "bg-gray-light translate-y-8"
                            }`}
                        >
                            <h3
                                className={`text-sm sm:text-xl lg:text-2xl font-semibold text-left leading-tight transition-colors duration-700 ${
                                    visibleReasons[3]
                                        ? "text-white"
                                        : "text-gray-500"
                                }`}
                            >
                                이용자와 권리자가 함께 만족하는 상생 구조
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 최종 CTA 섹션 */}
            <section className="relative py-24 lg:py-32">
                <Image
                    src="/heal-music-cta-bg.jpg"
                    alt="Heal Music CTA 배경"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div
                    ref={ctaSection.ref}
                    className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white transition-all duration-1000 ease-out ${
                        ctaSection.isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <h2 className="text-base sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold mb-10 lg:mb-12 2xl:mb-16 leading-normal">
                        건강한 공간에 건강한 음악이 함께할 수 있도록
                        <br />
                        지금 Heal Music과 함께 하세요
                    </h2>
                    <Link
                        href="https://docs.google.com/forms/d/1wbzTdKvYxH9BuIj2TZbgoWoeecqgd1swL_O_J0_YOHQ/viewform?pli=1&edit_requested=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white text-white font-semibold py-3 px-16 sm:px-10 lg:px-16 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer"
                    >
                        신청하기
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}
