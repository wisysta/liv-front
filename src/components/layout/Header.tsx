import Image from "next/image";
import Link from "next/link";
import { HeaderInteractions } from "./HeaderInteractions";
import { THEME_COLORS, type ThemeVariant } from "@/lib/constants/theme";

interface HeaderProps {
    variant?: ThemeVariant;
    headerOverlay?: boolean;
}

export function Header({
    variant = "dark",
    headerOverlay = false,
}: HeaderProps) {
    return (
        <>
            {/* SSR 가능한 헤더 구조 */}
            <header
                className={`flex justify-between items-center px-4 sm:px-6 lg:px-24 py-6 lg:py-8 ${
                    headerOverlay ? "fixed top-0 left-0 right-0" : "relative"
                } z-[80]`}
            >
                {/* 햄버거 메뉴 영역 - 왼쪽 */}
                <div className="flex items-center w-5 h-3.5" />

                {/* 로고 - 중앙 */}
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Image
                        src={THEME_COLORS[variant].logo}
                        alt="리브뮤직 로고"
                        width={105}
                        height={20}
                        className={`h-4 sm:h-5 w-auto transition-opacity duration-300 ${
                            headerOverlay ? "opacity-100" : "opacity-100"
                        }`}
                        sizes="(max-width: 640px) 80px, 105px"
                        quality={90}
                        priority
                    />
                </Link>

                {/* 빈 공간 - 오른쪽 */}
                <div className="w-5" />
            </header>

            {/* 클라이언트 전용 상호작용 기능 */}
            <HeaderInteractions
                variant={variant}
                headerOverlay={headerOverlay}
            />
        </>
    );
}
