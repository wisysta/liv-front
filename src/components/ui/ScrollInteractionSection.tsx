"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ScrollInteractionSection() {
    const [scrollY, setScrollY] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const frameRef = useRef<number | null>(null);

    // 텍스트 애니메이션을 위한 훅
    const textAnimation = useScrollAnimation({
        delay: 300,
        rootMargin: "0px 0px -100px 0px",
    });

    useEffect(() => {
        setIsClient(true);
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

    // 검정 박스 높이 계산 (스크롤에 따라 변화)
    const getBlackBoxHeight = () => {
        if (!isClient || !sectionRef.current) return "60%";

        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        const scrollProgress = Math.max(
            0,
            (scrollY - sectionTop + window.innerHeight) /
                (sectionHeight + window.innerHeight)
        );

        // 60%에서 90%까지 변화
        const minHeight = 60;
        const maxHeight = 90;
        const height = Math.min(
            maxHeight,
            minHeight + scrollProgress * (maxHeight - minHeight)
        );

        return `${height}%`;
    };

    // 이미지 둥둥 떠있는 효과 계산
    const getFloatingStyle = (index: number) => {
        if (!isClient) return {};

        // 각 이미지마다 완전히 다른 진폭과 주기 설정
        const amplitudes = [45, 120, 65, 100]; // 각 이미지별 기본 진폭
        const frequencies = [0.0045, 0.0012, 0.0035, 0.0022]; // 각 이미지별 주기
        const phases = [
            Math.PI * 1.4,
            Math.PI * 0.3,
            Math.PI * 0.7,
            Math.PI * 1.6,
        ]; // 각 이미지별 위상차
        const baseOffsets = [-40, 0, 0, 0]; // 각 이미지별 기본 위치 오프셋

        const amplitude = amplitudes[index] || 50;
        const frequency = frequencies[index] || 0.002;
        const phase = phases[index] || 0;
        const baseOffset = baseOffsets[index] || 0;

        const primaryOffset = Math.sin(scrollY * frequency + phase) * amplitude;
        const secondaryOffset =
            Math.cos(
                scrollY * frequency * (0.5 + index * 0.3) + phase + index * 1.5
            ) *
            (amplitude * (0.3 + index * 0.1));
        const tertiaryOffset =
            Math.sin(
                scrollY * frequency * (1.1 + index * 0.4) + phase + index * 2.1
            ) *
            (amplitude * (0.2 + index * 0.05));

        return {
            transform: `translateY(${
                baseOffset + primaryOffset + secondaryOffset + tertiaryOffset
            }px)`,
        };
    };

    // 이미지 간격 조정 (스크롤에 따라 변화)
    const getImageSpacing = (index: number) => {
        if (!isClient || !sectionRef.current) return {};

        const sectionTop = sectionRef.current.offsetTop;
        const scrollProgress = Math.max(
            0,
            (scrollY - sectionTop + window.innerHeight * 0.5) /
                window.innerHeight
        );

        // 각 이미지마다 다른 간격 변화
        const spacingMultiplier = [1, 1.2, 0.8, 1.1][index] || 1;
        const maxSpacing = 20 * spacingMultiplier;
        const spacing = Math.min(maxSpacing, scrollProgress * maxSpacing);

        return {
            marginTop: `${spacing}px`,
            marginBottom: `${spacing}px`,
        };
    };

    const images = [
        { src: "/기업소개_스크롤1.jpg", alt: "스크롤 이미지 1" },
        { src: "/기업소개_스크롤2.jpg", alt: "스크롤 이미지 2" },
        { src: "/기업소개_스크롤3.jpg", alt: "스크롤 이미지 3" },
        { src: "/기업소개_스크롤4.jpg", alt: "스크롤 이미지 4" },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-white overflow-hidden py-20 lg:py-32 "
        >
            {/* 검정 박스 (스크롤에 따라 높아짐) */}
            <div
                className="absolute bottom-0 left-0 right-0 bg-background-dark transition-all duration-300 ease-out"
                style={{ height: getBlackBoxHeight() }}
            />

            {/* 이미지들 */}
            <div className="relative z-10 lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {images.map((image, index) => (
                        <div
                            key={`scroll-section-${index}`}
                            className="relative transition-all duration-500 ease-out"
                            style={{
                                ...getFloatingStyle(index),
                                ...getImageSpacing(index),
                            }}
                        >
                            <div className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 텍스트 (아래에서 올라오는 효과) */}
            <div
                ref={textAnimation.ref}
                className={`relative z-20 text-center mt-16 lg:mt-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
                    textAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                }`}
            >
                <div className="max-w-4xl mx-auto lg:pb-8 lg:pt-4  2xl:pb-12 2xl:pt-6">
                    <p className="text-xl lg:text-2xl xl:text-3xl leading-relaxed text-white/90 font-medium">
                        리브뮤직은 앞으로도 음악을 사랑하는 사람들과 함께 음악의
                        가치를 지키고
                        <br />
                        <b className="text-white font-bold">
                            음악이 만들어내는 새로운 가능성을 확장시켜
                            나가겠습니다
                        </b>
                    </p>
                </div>
            </div>
        </section>
    );
}
