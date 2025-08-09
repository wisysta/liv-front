"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function HeroVision() {
    const containerRef = useRef<HTMLElement>(null);
    const rafRef = useRef<number | null>(null);
    const lastYRef = useRef<number>(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const heroAnimation = useScrollAnimation({ delay: 0 });
    const imageAnimation = useScrollAnimation({ delay: 300 }); // 이미지 페이드인용

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        let viewportHeight = window.innerHeight;

        const update = () => {
            if (!containerRef.current) return;

            // 스크롤 계산 최적화
            const scrollY = window.scrollY;
            const travelled = Math.max(0, scrollY > 30 ? scrollY - 150 : 0);
            const progress = Math.min(1, travelled / 300); // 듀레이션 1.5배 증가
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic 인라인

            // 높이 계산 캐시
            const baseHeight =
                viewportHeight <= 640
                    ? 350
                    : viewportHeight <= 1024
                    ? 380
                    : viewportHeight <= 1440
                    ? 520
                    : 720; // 1440px 이상에서 더 큰 높이
            const heroHeight =
                baseHeight + (viewportHeight - baseHeight) * eased;

            // 값 계산 최적화 - 변화가 있을 때만 업데이트
            if (progress !== lastYRef.current) {
                const scale = 0.85 + 0.21 * eased; // 0.85 -> 1.06
                const radius = 12 * (1 - eased); // 12px -> 0px

                // 텍스트 애니메이션
                const descProgress = Math.max(
                    0,
                    Math.min(1, (progress - 0.4) / 0.4)
                );

                // 메인 제목 텍스트 크기 애니메이션
                const titleScale = 1 + 0.15 * eased; // 1.0 -> 1.15 (15% 증가)

                // 한번에 모든 CSS 변수 설정
                const style = containerRef.current.style;
                style.setProperty("--hero-scale", scale.toFixed(3));
                style.setProperty("--hero-radius", `${radius.toFixed(1)}px`);
                style.setProperty("--title-scale", titleScale.toFixed(3));
                style.setProperty("--desc-opacity", descProgress.toFixed(3));
                style.setProperty(
                    "--desc-translate-y",
                    `${(16 * (1 - descProgress)).toFixed(1)}px`
                );
                style.setProperty(
                    "--desc-height",
                    descProgress > 0 ? "auto" : "0px"
                );

                lastYRef.current = progress;
            }

            // 항상 높이는 설정 (스크롤 진행도와 관계없이)
            const style = containerRef.current.style;
            style.setProperty("--hero-height", `${Math.round(heroHeight)}px`);
        };

        const onScroll = () => {
            if (rafRef.current) return; // 이미 스케줄된 경우 스킵

            rafRef.current = requestAnimationFrame(() => {
                update();
                rafRef.current = null;
            });
        };

        const onResize = () => {
            viewportHeight = window.innerHeight; // 캐시 업데이트
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                update();
                rafRef.current = null;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            className="relative mt-12 lg:mt-24 2xl:mt-32"
            ref={containerRef}
        >
            <div
                ref={imageAnimation.ref}
                className={`relative overflow-hidden transition-opacity duration-700 ease-out ${
                    imageAnimation.isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    transform: "scale(var(--hero-scale, 0.85))",
                    borderRadius: "var(--hero-radius, 12px)",
                    willChange: "transform, border-radius, opacity",
                }}
            >
                <Image
                    src="/기업소개_메인.jpg"
                    alt="기업비전 히어로 배경"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div
                    ref={contentRef}
                    className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8"
                    style={{
                        height: "var(--hero-height)",
                        minHeight: "350px", // 최소 높이 보장
                    }}
                >
                    <div
                        ref={heroAnimation.ref}
                        className={`max-w-md lg:max-w-4xl transition-all delay-300 duration-700 ease-out ${
                            heroAnimation.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h1
                            className="font-semibold leading-relaxed mb-8 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl transition-transform duration-100 ease-out"
                            style={{
                                transform: "scale(var(--title-scale, 1))",
                                willChange: "transform",
                            }}
                        >
                            주식회사 리브뮤직은
                            <br />
                            국내 최초 K-POP 디지털 전환(DX) 기반
                            <br />
                            공연권 통합징수 플랫폼입니다
                        </h1>

                        {/* 추가 설명 텍스트 */}
                        <div
                            className="max-w-4xl transition-all duration-300 ease-out overflow-hidden"
                            style={{
                                opacity: "var(--desc-opacity, 0)",
                                transform:
                                    "translateY(var(--desc-translate-y, 16px))",
                                height: "var(--desc-height, 0px)",
                            }}
                        >
                            <p className="text-base lg:text-lg leading-relaxed mb-6 opacity-90">
                                카페, 헬스장, 식당 등 일상 속 공간에서 음악이
                                자유롭게 사용되며
                                <br />
                                음악의 가치가 정당하게 보상되는 선순환 구조를
                                만드는 것을 목표로 하고 있습니다
                            </p>

                            <p className="text-base lg:text-lg leading-relaxed mb-6 opacity-90">
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
            </div>
        </section>
    );
}
