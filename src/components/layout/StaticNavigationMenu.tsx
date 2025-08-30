// SSR 전용 정적 네비게이션 메뉴 (이벤트 핸들러 없음)
interface NavigationItem {
    title: string;
    href?: string;
    items: { title: string; href: string }[];
}

interface StaticNavigationMenuProps {
    className?: string;
    showSubMenus?: boolean;
}

// 메뉴 데이터 상수
const MENU_SECTIONS: NavigationItem[] = [
    {
        title: "공연권료란?",
        href: "/performance-fee",
        items: [],
    },
    {
        title: "공연권 납부대상 확인",
        href: "/performance-fee/industry",
        items: [],
    },
    {
        title: "공연권료 계산기",
        href: "/performance-fee/calculator",
        items: [],
    },
    {
        title: "공연권 신청안내",
        href: "/performance-fee/application",
        items: [],
    },
    {
        title: "서비스 소개",
        items: [
            { title: "통합징수", href: "/service/integrated-collection" },
            { title: "Heal Music", href: "/service/heal-music" },
        ],
    },
    {
        title: "기업소개",
        items: [
            { title: "CEO 인사말", href: "/company/ceo" },
            { title: "기업비전", href: "/company/vision" },
            { title: "기업연혁", href: "/company/history" },
        ],
    },
    {
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
] as const;

export function StaticNavigationMenu({
    className = "",
    showSubMenus = true,
}: StaticNavigationMenuProps) {
    const shouldShowSubMenu = (section: NavigationItem) => {
        return showSubMenus && section.title === "고객센터";
    };

    const isCustomerService = (title: string) => title === "고객센터";

    return (
        <nav aria-label="주요 메뉴" role="navigation" className={className}>
            <ul className="space-y-1.5 sm:space-y-2" role="menubar">
                {MENU_SECTIONS.map((section, index) => (
                    <li key={`nav-${index}`} role="none">
                        {/* 고객센터 메뉴 앞에 구분선 추가 */}
                        {isCustomerService(section.title) && (
                            <hr
                                className="border-t border-gray-300 my-4"
                                aria-hidden="true"
                            />
                        )}

                        {/* 메뉴 아이템 렌더링 - href가 있는 것만 링크로 */}
                        {section.href ? (
                            <a
                                href={section.href}
                                className="block w-full text-left text-background-dark font-semibold text-base lg:text-lg py-[3.5px] sm:py-1 lg:py-[5px] xl-py-1.5 hover:text-primary-purple transition-colors cursor-pointer"
                                role="menuitem"
                                tabIndex={0}
                            >
                                {section.title}
                            </a>
                        ) : (
                            <>
                                {/* href가 없는 경우 첫 번째 서브메뉴로 링크 */}
                                <a
                                    href={section.items[0]?.href || "#"}
                                    className="block w-full text-left text-background-dark font-semibold text-base lg:text-lg py-[3.5px] sm:py-1 lg:py-[5px] xl-py-1.5 hover:text-primary-purple transition-colors cursor-pointer"
                                    role="menuitem"
                                    tabIndex={0}
                                >
                                    {section.title}
                                </a>

                                {/* 서브메뉴 (고객센터만 표시) */}
                                {section.items.length > 0 &&
                                    shouldShowSubMenu(section) && (
                                        <ul
                                            className="ml-4 sm:ml-6 lg:ml-7 2xl:ml-8 mt-0 sm:mt-1 2xl:mt-2 space-y-1"
                                            role="menu"
                                            aria-labelledby={`menu-${section.title}`}
                                        >
                                            {section.items.map(
                                                (item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        role="none"
                                                    >
                                                        <a
                                                            href={item.href}
                                                            className="block text-gray-600 text-sm sm:text-base py-1 lg:py-1 hover:text-primary-purple transition-colors"
                                                            role="menuitem"
                                                            tabIndex={0}
                                                        >
                                                            {item.title}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// 메뉴 데이터 export
export { MENU_SECTIONS };
export type { NavigationItem };
