import { NavigationMenu } from "./NavigationMenu";

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

// SSR 가능한 사이드 메뉴 (정적 구조)
export function SideMenu({ isOpen, onClose }: SideMenuProps) {
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
                        aria-label="메뉴 닫기"
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

                {/* 메뉴 컨텐츠 - 정적 네비게이션 */}
                <div className="px-4 sm:px-6 lg:px-8 pb-8 h-full overflow-y-auto">
                    <NavigationMenu onItemClick={onClose} />
                </div>
            </div>
        </>
    );
}
