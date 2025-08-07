import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen relative">
            {/* 메인 배경 이미지 */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/main-bg.jpg"
                    alt="리브뮤직 메인 배경"
                    fill
                    className="object-cover"
                    priority
                />
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* 컨텐츠 */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* 헤더 */}
                <header className="flex justify-between items-center px-4 sm:px-6 lg:px-24 py-6 lg:py-8">
                    <div className="flex items-center">
                        <Image
                            src="/livmusic-logo-white.png"
                            alt="리브뮤직 로고"
                            width={105}
                            height={20}
                            className="h-4 sm:h-5 w-auto"
                        />
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* 메뉴 아이콘 */}
                        <button className="flex flex-col gap-1.5 w-5 h-3.5 lg:hidden">
                            <div className="w-full h-0.5 bg-white"></div>
                            <div className="w-full h-0.5 bg-white"></div>
                            <div className="w-full h-0.5 bg-white"></div>
                        </button>

                        {/* 고객센터 버튼 */}
                        <button className="border border-white rounded-full px-4 sm:px-7 py-2 sm:py-2.5 text-white text-xs sm:text-sm font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                            고객센터
                        </button>
                    </div>
                </header>

                {/* 메인 컨텐츠 */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-24 text-center">
                    <div className="mb-6 sm:mb-8">
                        <p className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4 tracking-wide">
                            LIVE MUSIC COMPANY
                        </p>
                        <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-4 sm:mb-6">
                            공연권료 납부
                            <br />
                            쉽게 해결하세요
                        </h1>
                        <p className="text-white text-sm sm:text-base mb-8 sm:mb-12 max-w-lg mx-auto">
                            따뜻한 소통과 친절한 태도로 공연권료 납부를
                            도와드리겠습니다
                        </p>
                    </div>

                    {/* CTA 버튼들 */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md">
                        <button className="bg-white text-purple-900 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-gray-100 transition-colors text-sm">
                            공연권료 계산기
                        </button>
                        <button className="border border-white text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-white hover:text-gray-900 transition-colors text-sm">
                            서비스 소개
                        </button>
                    </div>
                </main>

                {/* 푸터 */}
                <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-24 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* 로고 및 SNS */}
                        <div className="space-y-3 sm:space-y-4">
                            <Image
                                src="/livmusic-logo-white.png"
                                alt="리브뮤직 로고"
                                width={86}
                                height={16}
                                className="h-3 sm:h-4 w-auto"
                            />
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/instagram-icon.png"
                                    alt="인스타그램"
                                    width={19}
                                    height={19}
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                            </div>
                        </div>

                        {/* 회사 정보 */}
                        <div className="space-y-2">
                            <h3 className="font-bold text-sm mb-3 sm:mb-4">
                                회사 정보
                            </h3>
                            <div className="text-xs space-y-1.5 sm:space-y-2 text-gray-300">
                                <p>상호 : (주) 리브뮤직</p>
                                <p>대표이사 : 최광호</p>
                                <p>사업자등록번호 : 645-88-02658</p>
                                <p className="break-words">
                                    주소 : 서울특별시 서초구 방배로 105,
                                    6층(방배동, 디엠타워 2관)
                                </p>
                            </div>
                        </div>

                        {/* 고객센터 */}
                        <div className="space-y-2">
                            <h3 className="font-bold text-sm mb-3 sm:mb-4">
                                고객센터
                            </h3>
                            <div className="text-xs space-y-1.5 sm:space-y-2 text-gray-300">
                                <p>평일 : 09:00 ~ 18:00</p>
                                <p>점심시간 : 12:00 - 13:00</p>
                                <p>주말 및 공휴일 휴무</p>
                            </div>
                        </div>
                    </div>

                    {/* 하단 링크 및 저작권 */}
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 flex flex-col lg:flex-row justify-between items-start lg:items-center text-xs text-gray-400 space-y-4 lg:space-y-0">
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                이용약관
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                개인정보처리방침
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                사업자정보확인
                            </a>
                        </div>
                        <p className="text-left lg:text-right">
                            © 2025. Livmusic. All rights reserved. Designed by
                            beforeworks
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
