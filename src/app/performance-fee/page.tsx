"use client";

import Image from "next/image";
import Link from "next/link";

import { PageLayout } from "@/components/layout/PageLayout";
import { PerformanceFeeHero } from "@/components/layout/PerformanceFeeHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function PerformanceFeeInfoPage() {
    // 스크롤 애니메이션 훅들
    const mainSection = useScrollAnimation({ delay: 200 });
    const faqSection = useScrollAnimation({ delay: 0 });

    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            <PerformanceFeeHero
                backgroundImage="/performance-fee-hero2.jpg"
                title="공연권료란?"
                contentBlocks={[
                    {
                        text: "매장에서 음악을 재생하는 행위, 사실은 단순한 '재생'이 아니라 '공연'에 해당<br /> 이를 위해 창작자에게 정당한 보상을 지급하는 것",
                        fontWeight: "semibold",
                        fontSize: "lg",
                    },
                    {
                        text: "매장처럼 동일한 사람이 운영하는 공간 안에서 손님에게 음악을 들려주는 행위도 포함됩니다",
                        fontWeight: "normal",
                        fontSize: "base",
                    },
                    {
                        text: "손님이 있는 매장에서 음악을 트는 것, 유튜브 영상이나 TV를 재생해 음악이 흘러나오는 경우,<br />라이브 공연, DJ 세션, 이벤트 음악 활용 등 모두 공연에 해당됩니다",
                        fontWeight: "normal",
                        fontSize: "base",
                    },
                ]}
                laws={[
                    {
                        text: "저작권법 제 2조 3항",
                        url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95/%EC%A0%9C2%EC%A1%B0",
                    },
                    {
                        text: "저작권법 제 17조",
                        url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95/%EC%A0%9C17%EC%A1%B0",
                    },
                    {
                        text: "저작권법 제 76조의 2",
                        url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95/%EC%A0%9C76%EC%A1%B0%EC%9D%982",
                    },
                    {
                        text: "저작권법 제 83조의 2",
                        url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95/%EC%A0%9C83%EC%A1%B0%EC%9D%982",
                    },
                ]}
            />

            {/* 꼭 내야하는 건가요? 섹션 */}
            <section className="bg-white py-20 lg:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={faqSection.ref}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    >
                        {/* 왼쪽 텍스트와 버튼들 - 아래에서 위로 */}
                        <div
                            className={`space-y-6 lg:space-y-8 transition-all duration-1500 ease-out ${
                                faqSection.isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-20"
                            }`}
                        >
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
                                className="inline-block bg-primary-purple text-white font-semibold py-3 px-8 lg:px-12 rounded-full hover:bg-primary-purple/90 transition-colors text-sm lg:text-base mb-8 lg:mb-14"
                            >
                                공연권료 계산기
                            </Link>

                            {/* 관계법령 */}
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-background-dark text-sm lg:text-base font-semibold">
                                        관계법령
                                    </span>
                                    <Link
                                        href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95/%EC%A0%9C136%EC%A1%B0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-light rounded-md px-3 py-1.5 hover:bg-gray-300 transition-colors"
                                    >
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            저작권법 제 136조(벌칙)
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-background-dark text-sm lg:text-base font-semibold">
                                        지정공고
                                    </span>
                                    <Link
                                        href="https://www.mcst.go.kr/kor/s_notice/notice/noticeView.jsp?pSeq=17433"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-light rounded-md px-3 py-1.5 hover:bg-gray-300 transition-colors"
                                    >
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            문화체육관광부 음악저작권 공연권료
                                            통합징수단체 지정공고
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽 이미지 - 우측에서 슬라이드 */}
                        <div
                            className={`aspect-square rounded-lg overflow-hidden transition-all duration-1500 ease-out ${
                                faqSection.isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-96"
                            }`}
                        >
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
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    >
                        {/* 오른쪽 이미지 (lg에서는 순서 변경) - 우측에서 슬라이드 */}
                        <div
                            className={`aspect-square rounded-lg overflow-hidden lg:order-2 transition-all duration-1500 ease-out ${
                                mainSection.isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-16"
                            }`}
                        >
                            <Image
                                src="/performance-fee-image-3-314eec.jpg"
                                alt="통합징수 설명 이미지"
                                width={520}
                                height={520}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* 왼쪽 텍스트와 버튼들 - 아래에서 위로 */}
                        <div
                            className={`space-y-6 lg:space-y-8 lg:order-1 transition-all duration-1500 ease-out ${
                                mainSection.isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-20"
                            }`}
                        >
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
                                    <Link
                                        href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95/%EC%A0%9C106%EC%A1%B0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-light rounded-md px-3 py-1.5 hover:bg-gray-300 transition-colors"
                                    >
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            저작권법 제 106조 제3항
                                        </span>
                                    </Link>
                                    <Link
                                        href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%A0%80%EC%9E%91%EA%B6%8C%EB%B2%95%20%EC%8B%9C%ED%96%89%EB%A0%B9/%EC%A0%9C51%EC%A1%B02"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-light rounded-md px-3 py-1.5 hover:bg-gray-300 transition-colors"
                                    >
                                        <span className="text-background-dark text-xs lg:text-sm font-medium">
                                            시행령 제51조의2
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
