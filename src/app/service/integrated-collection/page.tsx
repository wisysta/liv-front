import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";

export default function IntegratedCollectionPage() {
    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            {/* 히어로 섹션 */}
            <section className="relative h-screen flex items-center justify-center">
                <Image
                    src="/integrated-collection-hero.jpg"
                    alt="통합징수 배경 이미지"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-6">
                        매장음악, 자유롭게 사용하세요
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
                        공간에 흐르는 음악은 단순한 배경이 아니라,
                        <br />
                        매장의 분위기를 완성하고 손님의 시간을 특별하게 만듭니다
                    </p>
                </div>
            </section>

            {/* 브레드크럼 섹션 */}
            <section className="bg-white py-4 sm:py-6 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center space-x-2 text-sm">
                        <span className="text-gray-500">서비스소개</span>
                        <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-primary-purple font-medium">
                            통합징수
                        </span>
                    </div>
                </div>
            </section>

            {/* Simple & Easy 섹션 */}
            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* 좌측 이미지 */}
                        <div className="order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                <div className="space-y-4 lg:space-y-6">
                                    <Image
                                        src="/service-image-1-363c20.jpg"
                                        alt="서비스 이미지 1"
                                        width={270}
                                        height={324}
                                        className="w-full h-auto rounded-lg"
                                    />
                                    <div className="bg-gray-light rounded-lg p-6 lg:p-8 text-center">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-primary-purple mb-2">
                                            Simple
                                        </h3>
                                    </div>
                                </div>
                                <div className="space-y-4 lg:space-y-6 pt-8 lg:pt-12">
                                    <div className="bg-gray-light rounded-lg p-6 lg:p-8 text-center">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-primary-purple mb-2">
                                            Easy
                                        </h3>
                                    </div>
                                    <Image
                                        src="/service-image-2-6da174.jpg"
                                        alt="서비스 이미지 2"
                                        width={270}
                                        height={324}
                                        className="w-full h-auto rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 우측 콘텐츠 */}
                        <div className="order-1 lg:order-2 space-y-8 lg:space-y-12">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-background-dark mb-6">
                                    정당한 사용, 간단한 납부
                                </h2>
                                <div className="space-y-6 text-background-dark">
                                    <p className="text-lg lg:text-xl leading-relaxed">
                                        하지만 음악을 사용하기 위해서는
                                        <br />
                                        권리자에게 사용료를 납부해야 합니다.
                                    </p>
                                    <p className="text-lg lg:text-xl leading-relaxed">
                                        이 과정은 생각보다 복잡하고 번거로울 수
                                        있습니다.
                                        <br />
                                        여러 단체와 각각 계약을 체결하고,
                                        <br />
                                        매달 사용료를 나누어 납부해야 했기
                                        때문입니다.
                                    </p>
                                    <p className="text-lg lg:text-xl leading-relaxed">
                                        리브뮤직은 이런 어려움을 해결하기 위해
                                        탄생했습니다.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-background-dark mb-6">
                                    통합 창구로 더 편리하게
                                </h3>
                                <div className="space-y-4 text-background-dark">
                                    <p className="text-lg lg:text-xl leading-relaxed">
                                        매장에서 음악을 자유롭게 사용하면서도
                                        <br />
                                        이용자는 통합된 창구에서 간단히 계약하고
                                        <br />
                                        공연권료를 납부할 수 있습니다.
                                    </p>
                                    <p className="text-lg lg:text-xl leading-relaxed">
                                        창작자와 가창자 등 음악 권리자에게는
                                        정당한 권리가 돌아가고,
                                        <br />
                                        이용자는 음악을 통해 더 나은 공간을
                                        만들어갈 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA 섹션 */}
            <section className="bg-primary-purple py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-purple transition-colors">
                        공연권 신청 안내
                        <svg
                            className="inline-block w-4 h-4 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </section>
        </PageLayout>
    );
}
