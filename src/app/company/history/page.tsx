"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { CompanyNavigation } from "@/components/layout/CompanyNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

interface TimelineEvent {
    month: string;
    description: string;
}

interface TimelineYear {
    year: number;
    events: TimelineEvent[];
}

const HISTORY_DATA: TimelineYear[] = [
    {
        year: 2025,
        events: [
            { month: "5월", description: "리브뮤직 최광호 대표이사 취임" },
            {
                month: "3월",
                description:
                    "리브뮤직, 대한피트니스경영자협회, 음악3단체 업무협약 체결",
            },
            { month: "1월", description: "문화체육관광부 통합징수단체 재지정" },
        ],
    },
    {
        year: 2024,
        events: [
            { month: "3월", description: "공연권 통합징수 업무 시작" },
            { month: "1월", description: "문화체육관광부 통합징수단체 재지정" },
        ],
    },
    {
        year: 2023,
        events: [
            { month: "6월", description: "문화체육관광부 통합징수단체 지정" },
            { month: "3월", description: "리브뮤직 창사" },
        ],
    },
];

export default function CompanyHistoryPage() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!hasScrolled) {
                setHasScrolled(true);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasScrolled]);

    const heroSection = useScrollAnimation({ delay: 150 });

    // 각 타임라인에 대한 개별 useScrollAnimation 호출
    const timeline2025 = useScrollAnimation({
        delay: 300,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    });
    const timeline2024 = useScrollAnimation({
        delay: 0,
        threshold: 0.3,
        rootMargin: "0px 0px -150px 0px",
    });
    const timeline2023 = useScrollAnimation({
        delay: 0,
        threshold: 0.3,
        rootMargin: "0px 0px -150px 0px",
    });

    const timelineRefs = [timeline2025, timeline2024, timeline2023];

    return (
        <PageLayout
            headerOverlay={true}
            headerVariant="light"
            fullHeight={false}
        >
            {/* Hero */}
            <section className="bg-white pt-24 lg:pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 서브 내비게이션 */}
                    <div
                        ref={heroSection.ref}
                        className={`mb-12 lg:mb-14 2xl:mb-16 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        }`}
                    >
                        <CompanyNavigation currentPage="history" />
                    </div>

                    {/* 페이지 타이틀 */}
                    <div
                        className={`text-center mb-8 lg:mb-12 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        }`}
                    >
                        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark">
                            기업연혁
                        </h1>
                    </div>
                </div>
            </section>

            {/* 타임라인 */}
            <section className="bg-white py-16 lg:py-24 2xl:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className="">
                            {HISTORY_DATA.map((block, blockIndex) => (
                                <div
                                    key={block.year}
                                    ref={timelineRefs[blockIndex]?.ref}
                                    className={`relative transition-all duration-700 ease-out ${
                                        (blockIndex === 0 &&
                                            timelineRefs[blockIndex]
                                                ?.isVisible) ||
                                        (blockIndex > 0 &&
                                            hasScrolled &&
                                            timelineRefs[blockIndex]?.isVisible)
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8"
                                    }`}
                                    style={{
                                        transitionDelay: `${
                                            blockIndex * 200
                                        }ms`,
                                    }}
                                >
                                    {/* 연도와 도트 */}
                                    <div
                                        className={`relative flex items-start ${
                                            blockIndex === 0
                                                ? "min-h-[240px] lg:min-h-[270px] 2xl:min-h-[340px]"
                                                : "min-h-[180px] lg:min-h-[200px] 2xl:min-h-[240px]"
                                        }`}
                                    >
                                        {/* 연도 */}
                                        <div className="pr-12 text-right">
                                            <h3 className="text-3xl font-bold text-background-dark">
                                                {block.year}
                                            </h3>
                                        </div>

                                        {/* 도트와 수직라인 */}
                                        <div className="relative flex flex-col items-center flex-shrink-0">
                                            <div className="relative top-2 h-3 w-3 rounded-full bg-primary-purple z-10" />
                                            {/* 모든 항목에 수직 라인 표시 */}
                                            {blockIndex <
                                                HISTORY_DATA.length - 1 && (
                                                <div
                                                    className={`w-1 mt-4 bg-primary-purple transition-all duration-1000 ease-out ${
                                                        hasScrolled &&
                                                        timelineRefs[
                                                            blockIndex + 1
                                                        ]?.isVisible
                                                            ? blockIndex === 0
                                                                ? "h-64 lg:h-80 2xl:h-96 opacity-100"
                                                                : "h-48 lg:h-56 2xl:h-64 opacity-100"
                                                            : "h-0 opacity-0"
                                                    }`}
                                                    style={{
                                                        transitionDelay:
                                                            hasScrolled &&
                                                            timelineRefs[
                                                                blockIndex
                                                            ]?.isVisible
                                                                ? "300ms"
                                                                : "0ms",
                                                    }}
                                                />
                                            )}
                                        </div>

                                        {/* 이벤트 목록 */}
                                        <div className="ml-8 flex-1">
                                            <div className="space-y-12 lg:space-y-16 2xl:space-y-20">
                                                {block.events.map(
                                                    (event, idx) => (
                                                        <div
                                                            key={`${block.year}-${idx}`}
                                                            className={`flex gap-8 transition-all duration-700 ease-out ${
                                                                (blockIndex ===
                                                                    0 &&
                                                                    timelineRefs[
                                                                        blockIndex
                                                                    ]
                                                                        ?.isVisible) ||
                                                                (blockIndex >
                                                                    0 &&
                                                                    hasScrolled &&
                                                                    timelineRefs[
                                                                        blockIndex
                                                                    ]
                                                                        ?.isVisible)
                                                                    ? "opacity-100 translate-x-0"
                                                                    : "opacity-0 translate-x-8"
                                                            }`}
                                                            style={{
                                                                transitionDelay: `${
                                                                    (blockIndex ===
                                                                        0 &&
                                                                        timelineRefs[
                                                                            blockIndex
                                                                        ]
                                                                            ?.isVisible) ||
                                                                    (blockIndex >
                                                                        0 &&
                                                                        hasScrolled &&
                                                                        timelineRefs[
                                                                            blockIndex
                                                                        ]
                                                                            ?.isVisible)
                                                                        ? blockIndex *
                                                                              200 +
                                                                          idx *
                                                                              150 +
                                                                          400
                                                                        : 0
                                                                }ms`,
                                                            }}
                                                        >
                                                            {/* 월 */}
                                                            <div className="w-12 text-gray-500 font-medium text-lg">
                                                                {event.month}
                                                            </div>
                                                            {/* 설명 */}
                                                            <div className="flex-1 text-background-dark font-semibold text-lg">
                                                                {
                                                                    event.description
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
