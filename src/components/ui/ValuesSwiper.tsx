"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// 가치 데이터
const valuesData = [
    {
        id: 1,
        title: "공연권의 새로운 기준을 제시합니다",
        description:
            "기술과 정책, 산업을 연결해\n공연권 시장의 투명한 중재자로서 새로운 문화를 만듭니다",
        image: "/value-01-min.jpg",
        alt: "공연권의 새로운 기준",
    },
    {
        id: 2,
        title: "음악 산업의 미래를 설계합니다",
        description:
            "오래된 방식으로 풀 수 없었던 문제들을\n기술과 데이터, 그리고 신뢰로 해결해 나갑니다",
        image: "/value-02-min.jpg",
        alt: "음악 산업의 미래",
    },
    {
        id: 3,
        title: "모두가 함께 성장하는 생태계",
        description:
            "오래된 방식으로 풀 수 없었던 문제들을 기술과 데이터, \n그리고 신뢰로 해결해 나갑니다\n\n공연권 시장의 혁신을 넘어, 모두가 함께 성장하는 산업 생태계를 만들어갑니다",
        image: "/value-03-min.jpg",
        alt: "함께 성장하는 생태계",
    },
];

export function ValuesSwiper() {
    const [isClient, setIsClient] = useState(false);
    const [visibleCards, setVisibleCards] = useState([false, false, false]);

    const valuesAnimation = useScrollAnimation({
        delay: 400,
        rootMargin: "0px 0px -100px 0px",
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    // 모바일에서 순차 페이드인 효과
    useEffect(() => {
        if (valuesAnimation.isVisible) {
            const timers = [
                setTimeout(() => setVisibleCards([true, false, false]), 200),
                setTimeout(() => setVisibleCards([true, true, false]), 600),
                setTimeout(() => setVisibleCards([true, true, true]), 1000),
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [valuesAnimation.isVisible]);

    return (
        <div ref={valuesAnimation.ref}>
            {/* 모바일 레이아웃 (lg 미만) */}
            <div className="lg:hidden max-w-[1440px] mx-auto w-full px-4 sm:px-6">
                <div className="space-y-8">
                    {valuesData.map((value, index) => (
                        <div
                            key={value.id}
                            className={`bg-white rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
                                visibleCards[index]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            {/* 타이틀 */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-background-dark mb-4 text-center leading-tight">
                                    {value.title}
                                </h3>
                            </div>

                            {/* 이미지 */}
                            <div className="relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={value.image}
                                    alt={value.alt}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* 이미지 위 텍스트 오버레이 */}
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="text-sm leading-normal whitespace-pre-line font-semibold text-left max-w-xs">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 데스크톱 레이아웃 (lg 이상) - 기존 스와이퍼 */}
            <div
                className={`hidden lg:block transition-all duration-700 ease-out ${
                    valuesAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                }`}
            >
                <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 1.3,
                                spaceBetween: 40,
                            },
                            1280: {
                                slidesPerView: 1.4,
                                spaceBetween: 48,
                            },
                        }}
                        className="values-swiper"
                    >
                        {valuesData.map((value) => (
                            <SwiperSlide key={value.id}>
                                <div className="bg-white rounded-2xl overflow-hidden group transition-all duration-300 h-full max-w-6xl mx-auto">
                                    {/* 타이틀 (이미지 바깥) */}
                                    <div className="p-6 lg:p-8">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-background-dark mb-4 text-center leading-tight">
                                            {value.title}
                                        </h3>
                                    </div>

                                    {/* 이미지 */}
                                    <div className="relative h-80 lg:h-[480px] 2xl:h-[560px] rounded-lg overflow-hidden">
                                        <Image
                                            src={value.image}
                                            alt={value.alt}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* 이미지 위 텍스트 오버레이 (좌측 하단) */}
                                        <div className="absolute bottom-6 2xl:bottom-8 left-6 2xl:left-10 text-white">
                                            <p className="text-lg 2xl:text-xl leading-normal whitespace-pre-line font-semibold text-left max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 커스텀 스타일 */}
                <style jsx global>{`
                    .values-swiper .swiper-slide {
                        transform: scale(0.85);
                        opacity: 0.7;
                        transition: all 0.3s ease;
                    }

                    .values-swiper .swiper-slide-active {
                        transform: scale(1);
                        opacity: 1;
                    }

                    .values-swiper .swiper-slide-next {
                        transform: scale(0.9);
                        opacity: 0.8;
                    }

                    .values-swiper .swiper-slide-prev {
                        transform: scale(0.9);
                        opacity: 0.8;
                    }
                `}</style>
            </div>
        </div>
    );
}
