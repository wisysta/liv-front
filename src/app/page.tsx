import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Home() {
    return (
        <PageLayout headerOverlay={true} fullHeight={true}>
            {/* 히어로 섹션 - 100vh */}
            <div className="h-full relative min-h-screen">
                {/* 메인 배경 이미지 */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/main-hero.jpg"
                        alt="리브뮤직 메인 배경"
                        fill
                        className="object-cover object-center"
                        priority
                        quality={100}
                    />
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* 컨텐츠 */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-24 text-center">
                    <div className="mb-6 sm:mb-8">
                        <p className="text-white text-xs sm:text-sm lg:text-base 2xl:text-lg font-semibold mb-3 sm:mb-4 lg:mb-6 tracking-wide">
                            LIVE MUSIC COMPANY
                        </p>
                        <h1 className="text-white text-2xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-semibold leading-tight mb-4 sm:mb-6  lg:mb-12">
                            공연권료 납부
                            <br />
                            쉽게 해결하세요
                        </h1>
                        <p className="text-white text-xs sm:text-sm lg:text-base 2xl:text-lg mb-8 sm:mb-12 max-w-lg mx-auto">
                            따뜻한 소통과 친절한 태도로 공연권료 납부를
                            도와드리겠습니다
                        </p>
                    </div>

                    {/* CTA 버튼들 */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-lg">
                        <button className="text-primary-purple font-semibold bg-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-primary-purple hover:text-white transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer">
                            공연권료 계산기
                        </button>
                        <button className="border border-white text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer">
                            서비스 소개
                        </button>
                        <button className="border border-white text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm min-w-28 sm:min-w-32 lg:min-w-40 cursor-pointer">
                            고객센터
                        </button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
