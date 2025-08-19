"use client";

import { useState, useEffect } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [screenSize, setScreenSize] = useState<
        "mobile" | "tablet" | "desktop"
    >("mobile");
    const [isClient, setIsClient] = useState(false);

    // 클라이언트 사이드 렌더링 확인
    useEffect(() => {
        setIsClient(true);
    }, []);

    // 화면 크기 감지
    useEffect(() => {
        if (!isClient) return;

        const checkScreenSize = () => {
            const width = window.innerWidth;

            if (width < 640) {
                setScreenSize("mobile");
            } else if (width < 1024) {
                setScreenSize("tablet");
            } else {
                setScreenSize("desktop");
            }
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, [isClient]);

    // body 스크롤 제어
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // 컴포넌트 언마운트 시 정리
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const menuSections = [
        {
            id: "about",
            title: "공연권료란?",
            href: "/performance-fee",
            items: [],
        },
        {
            id: "rates",
            title: "공연권 납부대상 확인",
            href: "/performance-fee/industry",
            items: [],
        },
        {
            id: "calculator",
            title: "공연권료 계산기",
            href: "/performance-fee/calculator",
            items: [],
        },
        {
            id: "application",
            title: "공연권 신청안내",
            href: "/performance-fee/application",
            items: [],
        },
        {
            id: "service",
            title: "서비스 소개",
            items: [
                { title: "통합징수", href: "/service/integrated-collection" },
                { title: "Heal Music", href: "/service/heal-music" },
            ],
        },
        {
            id: "company",
            title: "기업소개",
            items: [
                { title: "CEO 인사말", href: "/company/ceo" },
                { title: "기업비전", href: "/company/vision" },
                { title: "기업연혁", href: "/company/history" },
                // { title: "인재상", href: "/company/talent" },
            ],
        },
        {
            id: "support",
            title: "고객센터",
            items: [
                { title: "자주 묻는 질문", href: "/customer/faq" },
                { title: "1:1 문의", href: "/customer/inquiry" },
                { title: "공지사항", href: "/customer/notice" },
                { title: "보도자료", href: "/customer/press-release" },
                { title: "갤러리", href: "/customer/gallery" },
                { title: "자료실", href: "/customer/materials" },
            ],
        },
    ];

    const handleSectionClick = (section: any) => {
        // 하위 메뉴가 있으면 첫 번째 아이템으로 이동
        if (
            section.items &&
            section.items.length > 0 &&
            section.items[0].href
        ) {
            window.location.href = section.items[0].href;
            onClose();
            return;
        }

        // href가 있는 메뉴는 해당 링크로 이동
        if (section.href) {
            window.location.href = section.href;
            onClose();
        }
    };

    // 고객센터만 서브메뉴 표시, 나머지는 숨김
    const shouldShowSubMenu = (sectionId: string) => {
        return sectionId === "support"; // 고객센터만 표시
    };

    // 화면 크기별 동적 스타일 클래스 (서버/클라이언트 일관성 유지)
    const getMenuContainerClass = () => {
        const baseClass = "px-6 pb-8 h-full overflow-y-auto";
        // 서버 렌더링 시에는 기본 클래스 사용
        if (!isClient) return baseClass;

        switch (screenSize) {
            case "mobile":
                return `${baseClass} px-4`;
            case "tablet":
                return `${baseClass} px-6`;
            case "desktop":
                return `${baseClass} px-10`;
            default:
                return baseClass;
        }
    };

    return (
        <>
            {/* 백그라운드 오버레이 */}
            <div
                className={`fixed inset-0 bg-black/60 z-200 transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* 슬라이드 메뉴 */}
            <div
                className={`fixed top-0 left-0 h-full w-72 sm:w-80 md:w-96 lg:w-[420px] xl:w-[450px] bg-gray-light z-500 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* 메뉴 헤더 */}
                <div className="flex justify-end px-4 sm:px-6 lg:px-8 py-2 lg:py-3 2xl:py-4">
                    <button
                        onClick={onClose}
                        className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <svg
                            className="w-5 h-5 lg:w-6 lg:h-6 text-background-dark"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* 메뉴 컨텐츠 */}
                <div className={getMenuContainerClass()}>
                    <nav className="space-y-1.5 sm:space-y-2">
                        {menuSections.map((section, index) => (
                            <div key={section.id}>
                                {/* 고객센터 메뉴 앞에 구분선 추가 */}
                                {section.id === "support" && (
                                    <div className="border-t border-gray-300 my-4" />
                                )}

                                {/* href가 있으면 링크로, 없으면 버튼으로 */}
                                {(section as any).href ? (
                                    <a
                                        href={(section as any).href}
                                        className="block w-full text-left text-background-dark font-semibold text-base lg:text-lg py-[3.5px] sm:py-1 lg:py-[5px] xl-py-1.5 hover:text-primary-purple transition-colors cursor-pointer"
                                        onClick={onClose}
                                    >
                                        {section.title}
                                    </a>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleSectionClick(section)
                                        }
                                        className="w-full text-left text-background-dark font-semibold text-base lg:text-lg py-[3.5px] sm:py-1 lg:py-[5px] xl-py-1.5 hover:text-primary-purple transition-colors cursor-pointer"
                                    >
                                        {section.title}
                                    </button>
                                )}

                                {/* 서브메뉴 (고객센터만 표시) */}
                                {!(section as any).href &&
                                    section.items.length > 0 &&
                                    shouldShowSubMenu(section.id) && (
                                        <div className="ml-4 sm:ml-6 lg:ml-7 2xl:ml-8 mt-0 sm:mt-1 2xl:mt-2 space-y-1">
                                            {section.items.map(
                                                (item, index) => (
                                                    <a
                                                        key={index}
                                                        href={item.href}
                                                        className="block text-gray-600 text-sm sm:text-base py-1 lg:py-1 hover:text-primary-purple transition-colors"
                                                        onClick={onClose}
                                                    >
                                                        {item.title}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
