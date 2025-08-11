"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { CompanyNavigation } from "@/components/layout/CompanyNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

interface TalentItem {
    icon: string;
    title: string;
    description: string;
}

const TALENT_DATA: TalentItem[] = [
    {
        icon: "/talent01.svg",
        title: "함께 성장하는\n팀워크형 인재",
        description:
            "동료와 협력하고 고객과의 신뢰를 소중히 여기며,\n같은 방향을 바라보는 '우리'의 가치를 추구합니다",
    },
    {
        icon: "/talent02.svg",
        title: "진심으로 소통하고\n존중할 줄 아는 태도",
        description:
            "고객, 동료, 파트너 누구에게든 열린 마음과\n따뜻한 말로 관계를 이어갑니다",
    },
    {
        icon: "/talent03.svg",
        title: "변화에 유연하고\n창의적인 사고의 소유자",
        description:
            "진부함에서 벗어나 새로운 시각으로 문제를\n바라보고, 더 즐겁고 의미 있는 일의 방식을 고민합니다",
    },
    {
        icon: "/talent04.svg",
        title: "배움을 즐기며\n끊임없이 성장하는 자세",
        description:
            "어제보다 나은 자신을 위해 꾸준히 노력하고,\n새로운 기회를 조직과 함께 만들어냅니다",
    },
    {
        icon: "/talent05.svg",
        title: "책임감을 갖고\n몰입하는 태도",
        description:
            "맡은 일에 진심을 담고, 결과만이 아닌 과정에서도\n신뢰를 쌓으며 성과를 함께 만들어갑니다",
    },
];

export default function CompanyTalentPage() {
    const heroSection = useScrollAnimation({ delay: 150 });
    const introSection = useScrollAnimation({ delay: 300, threshold: 0.1 });

    // 각 카드에 대한 개별 애니메이션 훅
    const cardAnimation0 = useScrollAnimation({ delay: 200, threshold: 0.1 });
    const cardAnimation1 = useScrollAnimation({ delay: 350, threshold: 0.1 });
    const cardAnimation2 = useScrollAnimation({ delay: 500, threshold: 0.1 });
    const cardAnimation3 = useScrollAnimation({ delay: 650, threshold: 0.1 });
    const cardAnimation4 = useScrollAnimation({ delay: 800, threshold: 0.1 });

    const cardAnimations = [
        cardAnimation0,
        cardAnimation1,
        cardAnimation2,
        cardAnimation3,
        cardAnimation4,
    ];

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
                        <CompanyNavigation currentPage="talent" />
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
                            인재상
                        </h1>
                    </div>
                </div>
            </section>

            {/* 인재상 소개 */}
            <section className="relative py-24 lg:py-48 2xl:py-56 mt-16 lg:mt-24 2xl:mt-32 overflow-hidden">
                {/* 배경 이미지 */}
                <div
                    ref={introSection.ref}
                    className={`absolute inset-0 transition-all duration-1000 ease-out ${
                        introSection.isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src="/인재상_배너.jpg"
                        alt="인재상 배너"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* 콘텐츠 */}
                <div
                    className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out ${
                        introSection.isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <div>
                        <h2 className="text-xl lg:text-2xl 2xl:text-3xl text-white leading-relaxed">
                            리브뮤직은 음악 산업의 더 나은 가치를 만들어가기
                            위해
                            <br />
                            <b>
                                사람과 일에 대한 바른 태도를 가진 사람들과
                                함께합니다
                            </b>
                        </h2>
                    </div>
                </div>
            </section>

            {/* 인재상 카드들 */}
            <section className="bg-white py-16 lg:py-32 2xl:py-48">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-12 lg:gap-20 2xl:gap-28">
                        {TALENT_DATA.map((talent, index) => (
                            <div
                                key={index}
                                ref={cardAnimations[index].ref}
                                className={`text-left transition-all duration-700 ease-out ${
                                    cardAnimations[index].isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                {/* 아이콘 */}
                                <div className="mb-8 flex justify-start">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24">
                                        <Image
                                            src={talent.icon}
                                            alt={`인재상 ${index + 1}`}
                                            width={96}
                                            height={96}
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* 제목 */}
                                <h3 className="text-lg lg:text-xl 2xl:text-2xl font-bold text-background-dark mb-4 leading-relaxed whitespace-pre-line">
                                    {talent.title}
                                </h3>

                                {/* 설명 */}
                                <p className="text-sm lg:text-base text-background-dark leading-relaxed whitespace-pre-line">
                                    {talent.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
