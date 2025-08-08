"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
    variant?: "dark" | "light";
}

export function Header({ variant = "dark" }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // 테마별 색상 설정
    const themeColors = {
        dark: {
            hamburger: "bg-white",
            logo: "/livmusic-logo-white.svg",
        },
        light: {
            hamburger: "bg-background-dark",
            logo: "/livmusic-logo-black.svg",
        },
    };

    return (
        <>
            <header className="flex justify-between items-center px-4 sm:px-6 lg:px-24 py-6 lg:py-8 relative z-[80]">
                {/* 햄버거 메뉴 - 왼쪽 */}
                <div className="flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="relative flex flex-col gap-1.5 w-5 h-3.5 hover:opacity-80 transition-opacity cursor-pointer before:content-[''] before:absolute before:inset-[-12px] before:z-10"
                    >
                        <div
                            className={`w-full h-2 ${themeColors[variant].hamburger}`}
                        ></div>
                        <div
                            className={`w-full h-2 ${themeColors[variant].hamburger}`}
                        ></div>
                        <div
                            className={`w-full h-2 ${themeColors[variant].hamburger}`}
                        ></div>
                    </button>
                </div>

                {/* 로고 - 중앙 */}
                <div className="flex items-center">
                    <Link
                        href="/"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src={themeColors[variant].logo}
                            alt="리브뮤직 로고"
                            width={105}
                            height={20}
                            className="h-4 sm:h-5 w-auto"
                            sizes="(max-width: 640px) 80px, 105px"
                            quality={90}
                        />
                    </Link>
                </div>

                {/* 빈 공간 - 오른쪽 */}
                <div className="flex items-center">
                    {/* 데스크톱에서는 빈 공간 */}
                    <div className="w-5"></div>
                </div>
            </header>

            {/* 모바일 메뉴 */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        </>
    );
}
