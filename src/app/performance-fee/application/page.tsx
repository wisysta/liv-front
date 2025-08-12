"use client";

import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function ApplicationInfoPage() {
    // 스크롤 애니메이션 훅들
    const titleSection = useScrollAnimation({ delay: 200 });
    const videoSection = useScrollAnimation({ delay: 0 });
    const descriptionAnimation = useScrollAnimation({ delay: 400 });
    return (
        <PageLayout
            headerOverlay={false}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Title Section */}
            <section className="bg-white pb-16 lg:pb-20 pt-18 lg:pt-24 2xl:pt-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        ref={titleSection.ref}
                        className={`transition-all duration-1000 ease-out ${
                            titleSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold text-background-dark mb-6 lg:mb-8 2xl:mb-12 leading-tight">
                            저작권 비즈니스 지원센터 신청방법
                        </h1>

                        <div
                            ref={descriptionAnimation.ref}
                            className={`space-y-6 lg:space-y-8 text-background-dark transition-all duration-1000 ease-out ${
                                descriptionAnimation.isVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
                                우리 가게도 해당이 될까요?
                            </h2>

                            <p className="text-base lg:text-lg 2xl:text-xl leading-relaxed font-normal">
                                가게에서 배경음악(BGM), TV에서 음악 방송을
                                켜두는 등 <br className="hidden lg:block" />
                                매장에서 음악이 흘러나오고 있다면, 대상이 될 수
                                있습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="bg-white pb-20 lg:pb-32 2xl:pb-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        ref={videoSection.ref}
                        className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
                            videoSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                        }`}
                    >
                        <div className="aspect-video bg-white rounded-lg overflow-hidden shadow-lg">
                            <video
                                controls
                                className="w-full h-full object-cover"
                                poster="/performance-fee-hero.jpg"
                            >
                                <source
                                    src="https://customer-bgy8mp6bray7e5r8.cloudflarestream.com/8a8d54ccd7fd8c113ebdd1f7a0e06ccc/downloads/default.mp4"
                                    type="video/mp4"
                                />
                                브라우저가 비디오를 지원하지 않습니다.
                            </video>
                        </div>

                        {/* Video Description */}
                        <div className="mt-6 lg:mt-8 text-center">
                            <p className="text-gray-500 text-base lg:text-lg 2xl:text-xl">
                                공연권 신청 과정에 대한 자세한 안내 영상입니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}

export default ApplicationInfoPage;
