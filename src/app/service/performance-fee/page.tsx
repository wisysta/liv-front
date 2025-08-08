"use client";

import Image from "next/image";
import Link from "next/link";

import { PageLayout } from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function PerformanceFeeInfoPage() {
    // 스크롤 애니메이션 훅들
    const heroSection = useScrollAnimation({ delay: 0 });
    const mainSection = useScrollAnimation({ delay: 200 });
    const faqSection = useScrollAnimation({ delay: 0 });

    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            {/* 히어로 섹션 */}
            <section className="relative h-screen">
                <Image
                    src="/performance-fee-hero.jpg"
                    alt="공연권료란? 히어로 배경"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div
                    ref={heroSection.ref}
                    className={`relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
                        heroSection.isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold mb-8 lg:mb-12">
                        공연권료란?
                    </h1>
                    <div className="max-w-5xl space-y-6 lg:space-y-8 mb-12 lg:mb-16">
                        <p className="text-lg lg:text-xl 2xl:text-2xl leading-relaxed font-semibold">
                            매장에서 음악을 트는 행위, 사실은 단순한 '재생'이
                            아니라 '공연'에 해당
                            <br /> 이를 위해 창작자에게 정당한 보상을 지급하는
                            것
                        </p>
                        <p className="text-base lg:text-lg 2xl:text-xl leading-relaxed">
                            매장처럼 동일한 사람이 운영하는 공간 안에서 손님에게
                            음악을 들려주는 행위도 포함됩니다
                        </p>
                        <p className="text-base lg:text-lg 2xl:text-xl leading-relaxed">
                            손님이 있는 매장에서 음악을 트는 것, 유튜브 영상이나
                            TV를 재생해 음악이 흘러나오는 경우,
                            <br />
                            라이브 공연, DJ 세션, 이벤트 음악 활용 등 모두
                            공연에 해당됩니다
                        </p>
                    </div>

                    {/* 관계법령 버튼들 */}
                    <div className="flex flex-wrap justify-center items-center gap-3 mb-8 lg:mb-12">
                        <span className="text-white/80 text-sm lg:text-base 2xl:text-lg font-bold">
                            관계법령
                        </span>
                        <div className="bg-white/20 backdrop-blur-sm border border-none rounded-md px-3 py-1.5">
                            <span className="text-white text-xs font-medium">
                                저작권법 제 2조 3항
                            </span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm border border-none rounded-md px-3 py-1.5">
                            <span className="text-white text-xs font-medium">
                                저작권법 제 17조
                            </span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm border border-none rounded-md px-3 py-1.5">
                            <span className="text-white text-xs font-medium">
                                저작권법 제 76조의 2
                            </span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm border border-none rounded-md px-3 py-1.5">
                            <span className="text-white text-xs font-medium">
                                저작권법 제 83조의 2
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 꼭 내야하는 건가요? 섹션 */}
            <section className="bg-white py-20 lg:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={faqSection.ref}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ease-out ${
                            faqSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        {/* 왼쪽 텍스트와 버튼들 */}
                        <div className="space-y-6 lg:space-y-8">
                            <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark">
                                꼭 내야하는 건가요?
                            </h2>
                            <p className="text-lg lg:text-xl leading-relaxed text-background-dark">
                                네,{" "}
                                <strong>이건 선택이 아니라 법적인 의무</strong>
                                입니다.
                                <br />
                                하지만 너무 어렵게 생각하진 마세요.
                                <br />
                                리브뮤직은 문화체육관광부로부터 지정된
                                통합징수단체로서
                                <br />
                                여러분이 이 절차를 쉽게 진행할 수 있도록
                                도와드립니다.
                            </p>

                            <Link
                                href="#calculator"
                                className="inline-block bg-primary-purple text-white font-semibold py-3 px-8 lg:px-12 rounded-full hover:bg-primary-purple/90 transition-colors text-sm lg:text-base"
                            >
                                공연권료 계산기
                            </Link>

                            {/* 관계법령 */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-background-dark text-sm lg:text-base font-semibold">
                                        관계법령
                                    </span>
                                    <div className="bg-gray-light rounded-md px-3 py-1.5">
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            저작권법 제 136조(벌칙)
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-background-dark text-sm lg:text-base font-semibold">
                                        지정공고
                                    </span>
                                    <div className="bg-gray-light rounded-md px-3 py-1.5">
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            음악 공연권료 신규 통합징수단체 지정
                                            공고문
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽 이미지 */}
                        <div className="aspect-square rounded-lg overflow-hidden">
                            <Image
                                src="/performance-fee-image-1-5425b2.jpg"
                                alt="공연권료 설명 이미지"
                                width={520}
                                height={520}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 구분선 */}
            <hr className="border-gray-300" />

            {/* 이제는 걱정하지 마세요 섹션 */}
            <section className="bg-white py-20 lg:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={mainSection.ref}
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ease-out ${
                            mainSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        {/* 오른쪽 이미지 (lg에서는 순서 변경) */}
                        <div className="aspect-square rounded-lg overflow-hidden lg:order-2">
                            <Image
                                src="/performance-fee-image-3-314eec.jpg"
                                alt="통합징수 설명 이미지"
                                width={520}
                                height={520}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 왼쪽 텍스트와 버튼들 */}
                        <div className="space-y-6 lg:space-y-8 lg:order-1">
                            <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark">
                                이제는 걱정하지 마세요
                            </h2>
                            <p className="text-lg lg:text-xl leading-relaxed text-background-dark">
                                매번 어디에 얼마를 내야 할지 헷갈리셨다면,
                                <br />한 번만 납부하면, 나머지는 통합징수단체가
                                알아서 <br />
                                처리해드립니다.
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-xl lg:text-2xl font-bold text-background-dark">
                                    통합징수란?
                                </h3>
                                <p className="text-base lg:text-lg leading-relaxed text-background-dark">
                                    매장에서 음악을 틀기 위해서는 4개의
                                    음악단체에 공연권료를
                                    <br />
                                    납부해야 하지만 이를 이용자가 한 곳에 한
                                    번만 납부하면
                                    <br />
                                    통합징수단체에서 음악단체에 정산하는 정부
                                    주도의 편의제도입니다.
                                </p>
                            </div>

                            {/* 관계법령 */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-background-dark text-sm lg:text-base font-semibold">
                                        관계법령
                                    </span>
                                    <div className="bg-gray-light rounded-md px-3 py-1.5">
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            저작권법 제 106조 제3항
                                        </span>
                                    </div>
                                    <div className="bg-gray-light rounded-md px-3 py-1.5">
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            시행령 제51조의2
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 계산기 CTA 섹션 */}
            <section
                id="calculator"
                className="bg-primary-purple py-16 lg:py-24"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-background-dark rounded-full inline-flex items-center gap-3 px-6 py-3 mb-8">
                        <span className="text-white text-sm lg:text-base font-semibold">
                            공연권료 계산기
                        </span>
                        <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                            <path
                                d="M0 8L4 4.5L0 1"
                                stroke="white"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                    <p className="text-white text-lg lg:text-xl 2xl:text-2xl leading-relaxed">
                        내 매장에 맞는 공연권료를
                        <br />
                        간편하게 계산해보세요
                    </p>
                </div>
            </section>
        </PageLayout>
    );
}
