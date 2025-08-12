import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background-dark text-white px-4 sm:px-6 lg:px-24 py-8 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* 로고 및 SNS */}
                <div className="space-y-3 sm:space-y-4">
                    <Image
                        src="/livmusic-logo-white.svg"
                        alt="리브뮤직 로고"
                        width={86}
                        height={16}
                        className="h-3 sm:h-4 w-auto"
                        sizes="(max-width: 640px) 70px, 86px"
                        quality={90}
                    />
                    <div className="flex items-center gap-3">
                        <Image
                            src="/instagram-icon.png"
                            alt="인스타그램"
                            width={19}
                            height={19}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            sizes="(max-width: 640px) 16px, 19px"
                            quality={90}
                        />
                        <Image
                            src="/blog-icon.png"
                            alt="블로그"
                            width={19}
                            height={19}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            sizes="(max-width: 640px) 16px, 19px"
                            quality={90}
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
                            주소 : 서울특별시 서초구 방배로 105, 6층(방배동,
                            디엠타워 2관)
                        </p>
                    </div>
                </div>

                {/* 고객센터 */}
                <div className="space-y-2">
                    <h3 className="font-bold text-sm mb-3 sm:mb-4">고객센터</h3>
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
                    <Link
                        href="/terms-of-service"
                        className="hover:text-white transition-colors"
                    >
                        이용약관
                    </Link>
                    <Link
                        href="/privacy-policy"
                        className="hover:text-white transition-colors"
                    >
                        개인정보처리방침
                    </Link>
                    <a href="#" className="hover:text-white transition-colors">
                        사업자정보확인
                    </a>
                </div>
                <p className="text-left lg:text-right">
                    © 2025. Livmusic. All rights reserved. Designed by
                    beforeworks
                </p>
            </div>
        </footer>
    );
}
