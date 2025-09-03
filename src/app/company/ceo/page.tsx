"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CompanyNavigation } from "@/components/layout/CompanyNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CEOPage() {
    // 모바일 자동 애니메이션을 위한 상태
    const [isMobileAnimated, setIsMobileAnimated] = useState(false);

    // 스크롤 애니메이션 훅들 (데스크톱용)
    const heroSection = useScrollAnimation({ delay: 200 });
    const introSection = useScrollAnimation({ delay: 300 });
    const messageSection = useScrollAnimation({ delay: 300 });
    const signatureSection = useScrollAnimation({ delay: 400 });

    // 모바일 자동 애니메이션 실행
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMobileAnimated(true);
        }, 300); // 0.3초 후 시작

        return () => clearTimeout(timer);
    }, []);

    return (
        <PageLayout
            headerOverlay={true}
            headerVariant="light"
            fullHeight={false}
        >
            {/* Hero 섹션 */}
            <section className="bg-white pt-24 lg:pt-32">
                <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    {/* 회사 네비게이션 */}
                    <div
                        ref={heroSection.ref}
                        className={`mb-12 lg:mb-14 2xl:mb-16 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <CompanyNavigation currentPage="ceo" />
                    </div>

                    {/* 제목 */}
                    <div
                        className={`text-center mb-12 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark lg:mb-4">
                            CEO 인사말
                        </h1>
                    </div>
                </div>
            </section>

            {/* 메인 콘텐츠 섹션 */}
            <section className="bg-white pb-12 sm:pb-12 lg:pb-24">
                <div className="lg:max-w-6xl 2xl:max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                    {/* 모바일용 레이아웃 (lg 미만) */}
                    <div className="lg:hidden space-y-12">
                        {/* 모바일 - 메시지 콘텐츠가 먼저 */}
                        <div className="py-4">
                            <div className="space-y-8">
                                {/* 제목 */}
                                <div
                                    className={`transition-all duration-700 ease-out ${
                                        isMobileAnimated
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}
                                >
                                    <h2 className="text-2xl font-bold text-primary-purple mb-6">
                                        K-POP DX Enterprise,
                                        <br />
                                        LIV MUSIC
                                    </h2>

                                    <div className="text-background-dark text-sm leading-relaxed font-semibold mb-6">
                                        <p>
                                            주식회사 리브뮤직은
                                            한국음악콘텐츠협회의 <br />
                                            사내벤처로 출범해 2023년 6월 13일
                                            <br />
                                            문화체육관광부로부터 공연권 통합징수
                                            단체로 <br />
                                            지정된
                                            <span className="text-primary-purple font-bold">
                                                [국내 유일의 통합징수 플랫폼]
                                            </span>
                                            입니다.
                                        </p>
                                    </div>
                                </div>
                                {/* 모바일 - CEO 이미지가 나중에 */}
                                <div
                                    className={`transition-all mb-8 duration-1000 ease-out delay-300 ${
                                        isMobileAnimated
                                            ? "opacity-100 scale-100"
                                            : "opacity-0 scale-95"
                                    }`}
                                >
                                    <Image
                                        src="/ceo-liv.jpg"
                                        alt="최광호 대표이사"
                                        width={434}
                                        height={650}
                                        className="w-full h-auto rounded-lg"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* 메시지 본문 */}
                            <div
                                className={`text-gray-500 font-medium text-sm leading-relaxed space-y-4 transition-all duration-700 ease-out delay-200 ${
                                    isMobileAnimated
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                <p>
                                    음악은 우리의 삶을 풍요롭게 하고, 사회의
                                    변화를 이끄는 소중한 가치입니다.
                                </p>

                                <p>
                                    더 많은 공간에서 음악이 자유롭게 울려 퍼지고
                                    <br />그 가치가 정당하게 보상받을 수 있도록
                                    <br />
                                    기술과 정책, 산업을 잇는 가교가 되어
                                    <br />
                                    이용자와 권리자가 모두 신뢰할 수 있는
                                    <br />
                                    플랫폼으로 자리매김하겠습니다.
                                </p>

                                <p>앞으로도 많은 관심과 성원을 부탁드립니다.</p>
                            </div>

                            {/* 서명 */}
                            <div
                                className={`text-right pt-6 transition-all duration-700 ease-out delay-400 ${
                                    isMobileAnimated
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                <div className="text-background-dark text-sm font-semibold">
                                    <p>리브뮤직 대표이사</p>
                                    <p className="text-lg font-bold mt-2">
                                        최광호
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 데스크톱용 레이아웃 (lg 이상) */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* 좌측 - CEO 이미지 */}
                        <div className="lg:col-span-5">
                            <div
                                ref={introSection.ref}
                                className={`transition-all duration-1000 ease-out ${
                                    introSection.isVisible
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95"
                                }`}
                            >
                                <Image
                                    src="/ceo-liv.jpg"
                                    alt="최광호 대표이사"
                                    width={434}
                                    height={650}
                                    className="w-full h-auto rounded-lg"
                                    priority
                                />
                            </div>
                        </div>

                        {/* 우측 - 메시지 콘텐츠 */}
                        <div className="lg:col-span-7 py-4 lg:py-6 2xl:py-8">
                            <div className="space-y-12">
                                {/* 제목 */}
                                <div
                                    ref={messageSection.ref}
                                    className={`transition-all duration-700 ease-out ${
                                        messageSection.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}
                                >
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-primary-purple leading-tight mb-6 lg:mb-8 2xl:mb-10">
                                        K-POP DX Enterprise, LIV MUSIC
                                    </h2>

                                    <div className="text-background-dark text-sm sm:text-base lg:text-base 2xl:text-lg leading-relaxed font-semibold mb-6">
                                        <p>
                                            주식회사 리브뮤직은
                                            한국음악콘텐츠협회의 사내벤처로
                                            출범해
                                        </p>
                                        <p>
                                            2023년 6월 13일 문화체육관광부로부터
                                            공연권 통합징수 단체로
                                        </p>
                                        <p>
                                            지정된{" "}
                                            <span className="text-primary-purple font-bold">
                                                [국내 유일의 통합징수 플랫폼]
                                            </span>
                                            입니다.
                                        </p>
                                    </div>
                                </div>

                                {/* 메시지 본문 */}
                                <div
                                    className={`text-gray-500 font-medium lg:text-base 2xl:text-lg leading-relaxed space-y-5 transition-all duration-700 ease-out delay-200 ${
                                        messageSection.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}
                                >
                                    <p>
                                        음악은 우리의 삶을 풍요롭게 하고, 사회의
                                        변화를 이끄는 소중한 가치입니다.
                                    </p>

                                    <p>
                                        더 많은 공간에서 음악이 자유롭게 울려
                                        퍼지고 그 가치가 정당하게
                                        <br />
                                        보상받을 수 있도록 기술과 정책, 산업을
                                        잇는 가교가 되어 이용자와 권리자가
                                        <br />
                                        모두 신뢰할 수 있는 플랫폼으로
                                        자리매김하겠습니다.
                                    </p>

                                    <p>
                                        앞으로도 많은 관심과 성원을
                                        부탁드립니다.
                                    </p>
                                </div>

                                {/* 서명 */}
                                <div
                                    ref={signatureSection.ref}
                                    className={`text-right pt-8 transition-all duration-700 ease-out ${
                                        signatureSection.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}
                                >
                                    <div className="text-background-dark lg:text-base 2xl:text-lg font-semibold">
                                        <p>리브뮤직 대표이사</p>
                                        <p className="text-xl lg:text-2xl font-bold mt-2">
                                            최광호
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
