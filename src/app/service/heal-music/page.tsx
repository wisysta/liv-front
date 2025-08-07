import Image from "next/image";
import { PageLayout } from "@/components/layout/PageLayout";

export default function HealMusicPage() {
    return (
        <PageLayout headerOverlay={true} fullHeight={false}>
            {/* 히어로 섹션 */}
            <section className="relative h-screen flex items-center justify-center">
                <Image
                    src="/heal-music-hero.jpg"
                    alt="Heal Music 배경 이미지"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-6 leading-tight">
                        체력단련 시설을 위한
                        <br />
                        공연권 라이선스 통합서비스
                    </h1>
                    <div className="space-y-4 text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
                        <p>
                            '음악'은 우리 일상에 활력을 더하고, 공간의 분위기를
                            완성하는 중요한 요소입니다
                        </p>
                        <p>
                            Heal Music은 헬스장 등 체력단련 시설에서 복잡한
                            저작권 문제와 불편한 계약 절차, 공연권료 납부를
                        </p>
                        <p>
                            One-Stop으로 해결할 수 있도록 구성된 [ 매장 맞춤형
                            음악 서비스 ]입니다
                        </p>
                    </div>
                    <div className="mt-8 lg:mt-12">
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-background-dark transition-colors">
                            신청하기
                        </button>
                    </div>
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
                            Heal Music
                        </span>
                    </div>
                </div>
            </section>

            {/* 서비스 설명 섹션 */}
            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-8 lg:space-y-12 text-background-dark">
                        <p className="text-xl lg:text-2xl leading-relaxed font-semibold">
                            그동안 음악 사용과 관련해 명확하지 않은 기준으로
                            인해
                            <br />
                            혼란을 겪었던 현장의 목소리를 듣고,
                            <br />
                            리브뮤직은 이용자와 음악 권리자 모두가 만족할 수
                            있는 구조를 고민했습니다
                        </p>
                        <p className="text-xl lg:text-2xl leading-relaxed font-semibold">
                            Heal Music은 단순한 라이선스를 넘어,
                            <br />
                            건강한 산업 생태계를 함께 만들어가는 상생의
                            시작점입니다
                        </p>
                    </div>
                </div>
            </section>

            {/* 서비스 정보 섹션 */}
            <section className="bg-gray-light py-16 sm:py-20 lg:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        {/* 서비스 정보 */}
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-lg sm:w-32 mb-2 sm:mb-0">
                                    서비스 명칭
                                </span>
                                <span className="text-background-dark font-semibold text-lg">
                                    Heal Music
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-lg sm:w-32 mb-2 sm:mb-0">
                                    서비스 시작일
                                </span>
                                <span className="text-background-dark font-semibold text-lg">
                                    2025년 8월 1일
                                </span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-lg sm:w-40 mb-2 sm:mb-0">
                                    서비스 대상
                                </span>
                                <span className="text-background-dark font-semibold text-lg">
                                    체력단련장(헬스장 등 운동시설)
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-gray-500 font-semibold text-lg sm:w-40 mb-2 sm:mb-0">
                                    Heal Music 이벤트 기간
                                </span>
                                <span className="text-background-dark font-semibold text-lg">
                                    2025.08.01 ~ 2025.10.31
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 요금 혜택 섹션 */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-background-dark mb-8">
                            요금 혜택
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
                            {/* 1년 선납 */}
                            <div className="bg-primary-purple rounded-lg p-8 text-white text-center">
                                <div className="mb-4">
                                    <span className="text-gray-300 text-base uppercase tracking-wider">
                                        YEAR
                                    </span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    1년 선납 시
                                </h3>
                                <div className="text-3xl font-bold text-white">
                                    50% 할인
                                </div>
                            </div>

                            {/* 월 납부 */}
                            <div className="bg-primary-purple rounded-lg p-8 text-white text-center">
                                <div className="mb-4">
                                    <span className="text-gray-300 text-base uppercase tracking-wider">
                                        MONTH
                                    </span>
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    월 납부 시
                                </h3>
                                <div className="text-3xl font-bold text-white">
                                    10% 할인
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heal Music을 선택하는 이유 */}
            <section className="bg-white py-16 sm:py-20 lg:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-background-dark text-center mb-12 lg:mb-16">
                        Heal Music을 선택하는 이유
                    </h2>
                    <div className="space-y-6 lg:space-y-8">
                        <div className="bg-primary-purple rounded-lg p-8 lg:p-12">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white text-center">
                                음악 사용에 대한 복잡한 절차없이 간편한 이용
                            </h3>
                        </div>
                        <div className="bg-gray-light rounded-lg p-8 lg:p-12">
                            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-500 text-center">
                                업종 특성에 맞춘 합리적인 요율과 맞춤형 지원
                            </h3>
                        </div>
                        <div className="bg-gray-light rounded-lg p-8 lg:p-12">
                            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-500 text-center">
                                저작권 분쟁없이 안심하고 음악 사용
                            </h3>
                        </div>
                        <div className="bg-gray-light rounded-lg p-8 lg:p-12">
                            <h3 className="text-2xl lg:text-3xl font-semibold text-gray-500 text-center">
                                이용자와 권리자가 함께 만족하는 상생 구조
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* 최종 CTA 섹션 */}
            <section className="relative py-20 lg:py-24">
                <Image
                    src="/heal-music-cta-bg-445cb1.jpg"
                    alt="Heal Music CTA 배경"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                        건강한 공간에 건강한 음악이 함께할 수 있도록
                        <br />
                        지금 Heal Music과 함께 하세요
                    </h2>
                    <button className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-white hover:text-background-dark transition-colors">
                        신청하기
                    </button>
                </div>
            </section>
        </PageLayout>
    );
}
