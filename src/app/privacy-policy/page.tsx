import { PageLayout } from "@/components/layout/PageLayout";

export default function PrivacyPolicyPage() {
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
                            개인정보처리방침
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                            리브뮤직의 개인정보처리방침을 안내드립니다.
                        </p>
                    </div>

                    {/* 약관 내용 */}
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                        <div className="space-y-6 sm:space-y-8">
                            {/* 제1조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제1조 (총칙)
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    리브뮤직(이하 '회사'라 합니다)은 정보주체의
                                    개인정보를 중요시하며, 「개인정보 보호법」을
                                    비롯한 관련 법령을 준수하고 있습니다. 회사는
                                    본 개인정보처리방침을 통하여 회사가 수집하는
                                    개인정보가 어떠한 용도와 방식으로 이용되고
                                    있으며, 개인정보보호를 위해 어떠한 조치가
                                    취해지고 있는지 알려드립니다.
                                </p>
                            </section>

                            {/* 제2조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제2조 (개인정보의 수집 항목 및 이용 목적)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 이용자의 1:1 문의 응대를 위해
                                        아래와 같은 최소한의 개인정보를 수집하고
                                        있습니다.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>
                                            <strong>수집 항목:</strong> 성함,
                                            이메일 주소, 휴대폰 번호
                                        </li>
                                        <li>
                                            <strong>수집 목적:</strong> 문의,
                                            요청, 불편사항 확인 및 처리 결과
                                            회신
                                        </li>
                                        <li>
                                            <strong>보유 기간:</strong> 문의
                                            처리 완료 후 3년간 보관 후 지체 없이
                                            파기(소비자의 불만 또는 분쟁처리에
                                            관한 기록 보존 의무 근거)
                                        </li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed">
                                        홈페이지 서비스 이용 과정에서 아래와
                                        같은 정보들이 자동으로 생성되어 수집될
                                        수 있습니다.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>
                                            <strong>수집 항목:</strong> 접속 IP
                                            정보, 쿠키, 서비스 이용 기록
                                        </li>
                                        <li>
                                            <strong>수집 목적:</strong> 홈페이지
                                            접속 통계 및 서비스 개선, 부정 이용
                                            방지
                                        </li>
                                    </ul>
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 상기 명시된 목적 외의 용도로
                                        개인정보를 이용하거나 정보주체의 동의
                                        없이 외부에 공개하지 않습니다.
                                    </p>
                                </div>
                            </section>

                            {/* 제3조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제3조 (개인정보의 처리 및 보유 기간)
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    회사는 법령에 따른 개인정보 보유·이용기간
                                    또는 정보주체로부터 개인정보를 수집 시에
                                    동의받은 기간 내에서 개인정보를 처리 및
                                    보유합니다. 원칙적으로 개인정보 수집 및
                                    이용목적이 달성된 후에는 해당 정보를 지체
                                    없이 파기합니다. (단, 제2조 1항에 명시된 1:1
                                    문의 정보는 3년간 보관됩니다.)
                                </p>
                            </section>

                            {/* 제4조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제4조 (개인정보의 파기)
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    회사는 개인정보 보유기간의 경과, 처리목적
                                    달성 등 개인정보가 불필요하게 되었을 때에는
                                    지체 없이 해당 개인정보를 파기합니다. 전자적
                                    파일 형태의 정보는 기록을 재생할 수 없는
                                    기술적 방법을 사용하며, 종이 문서는
                                    분쇄하거나 소각하여 파기합니다.
                                </p>
                            </section>

                            {/* 제5조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제5조 (개인정보의 안전성 확보 조치)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 개인정보의 안전성 확보를 위해
                                        관리적, 기술적, 물리적 조치를 취하고
                                        있습니다.
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>
                                            <strong>관리적 조치:</strong>{" "}
                                            개인정보 취급 직원의 최소화 및 교육,
                                            내부관리계획 수립
                                        </li>
                                        <li>
                                            <strong>기술적 조치:</strong>{" "}
                                            보안프로그램 설치, 주요 정보의
                                            암호화, 접근통제시스템 설치
                                        </li>
                                        <li>
                                            <strong>물리적 조치:</strong>{" "}
                                            자료보관실 등의 접근통제
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* 제6조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제6조 (정보주체의 권리·의무 및 행사방법)
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    정보주체는 언제든지 자신의 개인정보에 대한
                                    조회, 수정, 삭제, 처리정지 요구를 할 수
                                    있습니다. 권리 행사는 서면, 전자우편 등을
                                    통하여 하실 수 있으며 회사는 이에 대해 지체
                                    없이 조치하겠습니다.
                                </p>
                            </section>

                            {/* 제7조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제7조 (개인정보 보호책임자)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        회사는 개인정보 처리에 관한 업무를
                                        총괄해서 책임지고, 정보주체의 불만 처리
                                        및 피해구제 등을 위하여 아래와 같이
                                        개인정보 보호책임자를 지정하고 있습니다.
                                    </p>
                                    <div className="bg-gray-50 p-6 rounded-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-background-dark mb-2">
                                                    보호책임자
                                                </h4>
                                                <ul className="space-y-1 text-gray-700">
                                                    <li>
                                                        <strong>성명:</strong>{" "}
                                                        김용훈
                                                    </li>
                                                    <li>
                                                        <strong>직책:</strong>{" "}
                                                        부대표
                                                    </li>
                                                    <li>
                                                        <strong>연락처:</strong>{" "}
                                                        02-6052-1044
                                                    </li>
                                                    <li>
                                                        <strong>이메일:</strong>{" "}
                                                        kyh6633@livmusic.co.kr
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-background-dark mb-2">
                                                    보호담당자
                                                </h4>
                                                <ul className="space-y-1 text-gray-700">
                                                    <li>
                                                        <strong>성명:</strong>{" "}
                                                        김훈기
                                                    </li>
                                                    <li>
                                                        <strong>직책:</strong>{" "}
                                                        대리
                                                    </li>
                                                    <li>
                                                        <strong>연락처:</strong>{" "}
                                                        02-6052-1027
                                                    </li>
                                                    <li>
                                                        <strong>이메일:</strong>{" "}
                                                        khk@livmusic.co.kr
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 제8조 */}
                            <section>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-background-dark mb-3 sm:mb-4">
                                    제8조 (개인정보처리방침의 변경)
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        본 개인정보처리방침의 내용 추가, 삭제 및
                                        수정이 있을 경우, 개정 최소 7일 전부터
                                        홈페이지 '공지사항'을 통해 고지할
                                        것입니다.
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <ul className="space-y-1 text-gray-700">
                                            <li>
                                                <strong>공고일자:</strong>{" "}
                                                [공고일자]
                                            </li>
                                            <li>
                                                <strong>시행일자:</strong>{" "}
                                                [시행일자]
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
