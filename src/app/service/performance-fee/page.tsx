"use client";

import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";

export default function PerformanceFeePage() {
    const handleCalculatorClick = () => {
        alert(
            "공연권료 계산기 서비스는 준비 중입니다. 곧 만나보실 수 있습니다!"
        );
    };
    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            {/* Hero Section */}
            <section className="relative min-h-[970px] flex items-center justify-center">
                <Image
                    src="/performance-fee-hero-bg-670829.jpg"
                    alt="공연권료란 배경"
                    fill
                    className="object-cover z-0"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 z-10" />

                <div className="relative z-20 text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                        공연권료란?
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="w-3 h-3 border border-white opacity-70"></span>
                        <span className="text-xs">공연권료란</span>
                    </div>
                </div>

                {/* 계산기 버튼 */}
                <div className="absolute bottom-16 left-40 z-20">
                    <button
                        onClick={handleCalculatorClick}
                        className="bg-[#2D265A] text-white px-6 py-3 rounded-[35px] text-sm font-semibold flex items-center gap-3 hover:bg-[#3d3470] transition-colors"
                    >
                        공원권료 계산기
                        <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                            <path
                                d="M1 1L4 4.5L1 8"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </svg>
                    </button>
                </div>
            </section>

            {/* 메인 콘텐츠 */}
            <section className="py-16 px-4 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-2xl font-semibold mb-8 text-white">
                        매장에서 음악을 트는 행위, 사실은 단순한
                        &apos;재생&apos;이 아니라 &apos;공연&apos;에 해당
                        <br />
                        이를 위해 창작자에게 정당한 보상을 지급하는 것
                    </h2>
                    <p className="text-lg text-white leading-relaxed max-w-4xl mx-auto">
                        매장처럼 동일한 사람이 운영하는 공간 안에서 손님에게
                        음악을 들려주는 행위도 포함됩니다
                        <br />
                        <br />
                        손님이 있는 매장에서 음악을 트는 것, 유튜브 영상이나
                        TV를 재생해 음악이 흘러나오는 경우,
                        <br />
                        라이브 공연, DJ 세션, 이벤트 음악 활용 등 모두 공연에
                        해당됩니다
                    </p>
                </div>

                {/* 관계법령 섹션 */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
                        <span className="text-white font-semibold mr-6">
                            관계법령
                        </span>
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-white/15 text-white text-xs px-4 py-2 rounded-lg">
                                저작권법 제 2조 3항
                            </span>
                            <span className="bg-white/15 text-white text-xs px-4 py-2 rounded-lg">
                                저작권법 제 17조
                            </span>
                            <span className="bg-white/15 text-white text-xs px-4 py-2 rounded-lg">
                                저작권법 제 76조의 2
                            </span>
                            <span className="bg-white/15 text-white text-xs px-4 py-2 rounded-lg">
                                저작권법 제 83조의 2
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Q&A 섹션 */}
            <section className="py-16 px-4 max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* 왼쪽 컬럼 */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-4xl font-bold text-[#17171B] mb-6">
                                꼭 내야하는 건가요?
                            </h3>
                            <p className="text-lg text-[#17171B] leading-relaxed">
                                네, 이건 선택이 아니라 법적인 의무입니다.
                                <br />
                                하지만 너무 어렵게 생각하진 마세요.
                                <br />
                                리브뮤직은 문화체육관광부로부터 지정된
                                통합징수단체로서
                                <br />
                                여러분이 이 절차를 쉽게 진행할 수 있도록
                                도와드립니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold text-[#17171B] mb-6">
                                이제는 걱정하지 마세요
                            </h3>
                            <p className="text-lg text-[#17171B] leading-relaxed">
                                매번 어디에 얼마를 내야 할지 헷갈리셨다면,
                                <br />한 번만 납부하면, 나머지는 통합징수단체가
                                알아서 처리해드립니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#8C8B8B] mb-4">
                                통합징수란?
                            </h3>
                            <p className="text-lg text-[#8C8B8B] leading-relaxed">
                                매장에서 음악을 틀기 위해서는 4개의 음악단체에
                                공연권료를
                                <br />
                                납부해야 하지만 이를 이용자가 한 곳에 한 번만
                                납부하면
                                <br />
                                통합징수단체에서 음악단체에 정산하는 정부 주도의
                                편의제도입니다.
                            </p>
                        </div>
                    </div>

                    {/* 오른쪽 컬럼 - 이미지들 */}
                    <div className="space-y-8">
                        <div className="relative w-full h-[520px] rounded-lg overflow-hidden">
                            <Image
                                src="/performance-fee-image-1-5425b2.jpg"
                                alt="공연권료 이미지 1"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-full h-[520px] rounded-lg overflow-hidden">
                            <Image
                                src="/performance-fee-image-2-41223b.jpg"
                                alt="공연권료 이미지 2"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="relative w-full h-[520px] rounded-lg overflow-hidden">
                            <Image
                                src="/performance-fee-image-3-314eec.jpg"
                                alt="공연권료 이미지 3"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 관계법령 하단 섹션 */}
            <section className="py-16 px-4 max-w-6xl mx-auto border-t border-[#8C8B8B]/30">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-[#17171B] mb-4">
                            관계법령
                        </h3>
                        <div className="flex gap-3">
                            <span className="bg-[#F4F4F4] text-[#17171B] text-xs px-5 py-3 rounded-lg">
                                저작권법 제 136조(벌칙)
                            </span>
                            <span className="bg-[#F4F4F4] text-[#17171B] text-xs px-5 py-3 rounded-lg">
                                저작권법 제 106조 제3항
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-[#17171B] mb-4">
                            지정공고
                        </h3>
                        <div>
                            <span className="bg-[#F4F4F4] text-[#17171B] text-xs px-5 py-3 rounded-lg">
                                음악 공연권료 신규 통합징수단체 지정 공고문
                            </span>
                            <span className="bg-[#F4F4F4] text-[#17171B] text-xs px-5 py-3 rounded-lg ml-3">
                                시행령 제51조의2
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
