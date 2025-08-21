import { PageLayout } from "@/components/layout/PageLayout";

export default function TermsOfServicePage() {
    return (
        <PageLayout
            headerOverlay={false}
            fullHeight={false}
            headerVariant="light"
        >
            <div className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 페이지 헤더 */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-background-dark mb-3 sm:mb-4">
                            이용약관
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                            리브뮤직 홈페이지 이용약관을 안내드립니다.
                        </p>
                    </div>

                    {/* 약관 내용 */}
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                        <div className="space-y-6 sm:space-y-8">
                            {/* 제1조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제1조 (목적)
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    이 약관은 리브뮤직(이하 '회사'라 합니다)이
                                    운영하는 공식 홈페이지(이하 '홈페이지'라
                                    합니다)를 이용함에 있어 회사와 이용자의
                                    권리, 의무 및 책임사항을 규정함을 목적으로
                                    합니다.
                                </p>
                            </section>

                            {/* 제2조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제2조 (용어의 정의)
                                </h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>
                                        <strong>홈페이지:</strong> 회사가 저작권
                                        관련 정보 제공, 회사 소식 전달 등을
                                        목적으로 운영하는 웹사이트를 의미합니다.
                                    </li>
                                    <li>
                                        <strong>이용자:</strong> 홈페이지에
                                        접속하여 이 약관에 따라 회사가 제공하는
                                        정보를 이용하는 모든 방문객을
                                        의미합니다.
                                    </li>
                                    <li>
                                        <strong>게시물:</strong> 회사가
                                        홈페이지에 게시한 문자, 문서, 그림,
                                        음성, 동영상 등 모든 정보와 자료를
                                        의미합니다.
                                    </li>
                                </ul>
                            </section>

                            {/* 제3조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제3조 (약관의 명시와 개정)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 이 약관의 내용을 이용자가 쉽게 알
                                        수 있도록 홈페이지 초기 화면에
                                        게시합니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 관련 법령을 위배하지 않는
                                        범위에서 이 약관을 개정할 수 있으며,
                                        개정 시에는 적용일자 7일 이전부터
                                        공지합니다.
                                    </p>
                                </div>
                            </section>

                            {/* 제4조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제4조 (서비스의 제공 및 중단)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 홈페이지를 통해 회사 소개,
                                        공연권료 안내, 보도자료, 공지사항 등의
                                        정보를 제공합니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        컴퓨터 등 정보통신설비의 보수점검, 교체
                                        및 고장, 통신두절 등의 사유가 발생한
                                        경우에는 서비스 제공을 일시적으로 중단할
                                        수 있습니다.
                                    </p>
                                </div>
                            </section>

                            {/* 제5조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제5조 (회사의 의무)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 법령과 이 약관이 정하는 바에 따라
                                        지속적이고 안정적으로 홈페이지를
                                        운영하는 데 최선을 다합니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 이용자가 1:1 문의 시 제공한
                                        개인정보를 보호하기 위해 노력하며, 관련
                                        사항은 회사의 '개인정보처리방침'에
                                        따릅니다.
                                    </p>
                                </div>
                            </section>

                            {/* 제6조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제6조 (이용자의 의무)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        이용자는 다음 행위를 하여서는 안 됩니다.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>
                                            회사가 게시한 정보의 변경 또는 무단
                                            복제·배포 행위
                                        </li>
                                        <li>
                                            컴퓨터 바이러스 유포 등 홈페이지의
                                            안정적인 운영을 방해하는 행위
                                        </li>
                                        <li>
                                            1:1 문의 시 허위 내용을 기재하는
                                            행위
                                        </li>
                                        <li>
                                            회사 및 기타 제3자의 저작권 등
                                            지식재산권을 침해하는 행위
                                        </li>
                                        <li>
                                            회사 및 기타 제3자의 명예를
                                            손상시키거나 업무를 방해하는 행위
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* 제7조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제7조 (게시물의 저작권)
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    홈페이지에 게시된 모든 게시물의 저작권은
                                    회사에 귀속됩니다. 이용자는 회사의 사전 승낙
                                    없이 이를 영리 목적으로 복제, 송신, 출판,
                                    배포, 방송 기타 방법에 의하여 이용하거나
                                    제3자에게 이용하게 하여서는 안 됩니다.
                                </p>
                            </section>

                            {/* 제8조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제8조 (책임 제한)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 천재지변 또는 이에 준하는
                                        불가항력으로 인하여 서비스를 제공할 수
                                        없는 경우에 책임이 면제됩니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 이용자의 귀책사유로 인한 홈페이지
                                        이용의 장애에 대하여 책임을 지지
                                        않습니다.
                                    </p>
                                </div>
                            </section>

                            {/* 제9조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제9조 (준거법 및 재판관할)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사와 이용자 간에 발생한 분쟁에
                                        관하여는 대한민국 법을 준거법으로
                                        합니다.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        본 약관과 관련한 분쟁에 관한 소송은
                                        민사소송법상의 관할법원에 제기합니다.
                                    </p>
                                </div>
                            </section>

                            {/* 부칙 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    부칙
                                </h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700 leading-relaxed">
                                        이 약관은 [시행일자]부터 시행됩니다.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
