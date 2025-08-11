"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServiceHero } from "@/components/layout/ServiceHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function IntegratedCollectionPage() {
    // 같은 섹션이 보이면 바로 시차를 두고 트리거
    const sectionContainer = useScrollAnimation({ delay: 0 }); // 섹션 전체 감지용
    const [easyVisible, setEasyVisible] = useState(false);

    // sectionContainer가 보이면 1200ms 후에 Easy 섹션 트리거
    useEffect(() => {
        if (sectionContainer.isVisible) {
            const timer = setTimeout(() => {
                setEasyVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [sectionContainer.isVisible]);

    // 개별 텍스트 페이드 인 애니메이션
    const simpleTitle = useScrollAnimation({
        delay: 100,
        rootMargin: "0px 0px -50px 0px",
    });
    const simpleContent = useScrollAnimation({ delay: 200 });
    const easyTitle = useScrollAnimation({ delay: 100 });
    const easyContent = useScrollAnimation({ delay: 200 });
    const easyButton = useScrollAnimation({ delay: 300 });

    // simpleTitle이 보이면 우측 Easy 섹션 트리거
    useEffect(() => {
        if (simpleTitle.isVisible) {
            setEasyVisible(true);
        }
    }, [simpleTitle.isVisible]);
    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            <ServiceHero
                backgroundImage="/integrated-collection-hero.jpg"
                currentService="integrated-collection"
                title="통합징수"
                subtitle="매장음악, 자유롭게 사용하세요"
                description="공간에 흐르는 음악은 단순한 배경이 아니라,<br />매장의 분위기를 완성하고 손님의 시간을 특별하게 만듭니다"
            />

            {/* Simple & Easy 섹션 */}
            <section
                ref={sectionContainer.ref}
                className="bg-white py-20 lg:py-32"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* 좌측 - Simple */}
                        <div
                            className={`text-center lg:text-left transition-all duration-1200 ease-out opacity-100 ${
                                sectionContainer.isVisible
                                    ? "translate-y-0"
                                    : "translate-y-96"
                            }`}
                        >
                            <div className="relative mb-12">
                                <Image
                                    src="/service-01.jpg"
                                    alt="Simple 서비스 이미지"
                                    width={549}
                                    height={660}
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute top-6 left-6">
                                    <h3 className="text-4xl font-bold text-white">
                                        Simple
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2
                                    ref={simpleTitle.ref}
                                    className={`text-2xl xl:text-3xl font-bold text-background-dark transition-all duration-700 ease-out ${
                                        simpleTitle.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    정당한 사용, 간단한 납부
                                </h2>
                                <div
                                    ref={simpleContent.ref}
                                    className={`space-y-6 text-background-dark lg:text-lg leading-relaxed transition-all duration-700 ease-out ${
                                        simpleContent.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    <p>
                                        하지만 음악을 사용하기 위해서는
                                        <br />
                                        권리자에게 사용료를 납부해야 합니다.
                                    </p>
                                    <p>
                                        <b>
                                            이 과정은 생각보다 복잡하고 번거로울
                                            수 있습니다.
                                        </b>
                                        <br />
                                        여러 단체와 각각 계약을 체결하고,
                                        <br />
                                        매달 사용료를 나누어 납부해야 했기
                                        때문입니다.
                                    </p>
                                    <p>
                                        <b>
                                            리브뮤직은 이런 어려움을 해결하기
                                            위해 탄생
                                        </b>
                                        했습니다.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 우측 - Easy */}
                        <div
                            className={`text-center lg:text-left transition-all duration-1200 ease-out ${
                                easyVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-96"
                            }`}
                        >
                            <div className="relative mb-12">
                                <Image
                                    src="/service-02.jpg"
                                    alt="Easy 서비스 이미지"
                                    width={549}
                                    height={660}
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute top-6 left-6">
                                    <h3 className="text-4xl font-bold text-white">
                                        Easy
                                    </h3>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2
                                    ref={easyTitle.ref}
                                    className={`text-2xl xl:text-3xl font-bold text-background-dark transition-all duration-700 ease-out ${
                                        easyTitle.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    통합 창구로 더 편리하게
                                </h2>
                                <div
                                    ref={easyContent.ref}
                                    className={`space-y-6 text-background-dark lg:text-lg leading-relaxed transition-all duration-700 ease-out ${
                                        easyContent.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    <p>
                                        매장에서 음악을 자유롭게 사용하면서도
                                        <br />
                                        이용자는
                                        <b>통합된 창구에서 간단히 계약하고</b>
                                        <br />
                                        공연권료를 납부할 수 있습니다.
                                    </p>
                                    <p>
                                        창작자와 가창자 등 음악 권리자에게는
                                        정당한 권리가 돌아가고,
                                        <br />
                                        이용자는 음악을 통해 더 나은 공간을
                                        만들어갈 수 있습니다.
                                    </p>
                                </div>

                                {/* 공연권 신청안내 버튼 */}
                                <div
                                    ref={easyButton.ref}
                                    className={`pt-8 transition-all duration-700 ease-out ${
                                        easyButton.isVisible
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    <Link
                                        href="/performance-fee"
                                        className="inline-flex items-center bg-primary-purple text-white px-12 py-4 rounded-full text-base font-semibold hover:bg-primary-purple/90 transition-colors"
                                    >
                                        공연권 신청안내
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
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
