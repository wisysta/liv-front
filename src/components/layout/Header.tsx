"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useScrollDetection } from "@/hooks/useScrollDetection";

interface HeaderProps {
    variant?: "dark" | "light";
    headerOverlay?: boolean; // 헤더가 오버레이 모드인지 여부
}

export function Header({
    variant = "dark",
    headerOverlay = false,
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 스크롤 감지 (항상 호출하되 오버레이 모드일 때만 사용)
    const scrollDetected = useScrollDetection({
        threshold: 50,
        enableOnMobileOnly: true,
    });
    const isScrolled = headerOverlay ? scrollDetected : false;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // 동적 테마 계산 (오버레이 + 스크롤 상태 고려)
    const getCurrentTheme = () => {
        if (headerOverlay && isScrolled) {
            // 오버레이 모드에서 스크롤됨 → light 테마 강제
            return "light";
        }
        return variant;
    };

    const currentTheme = getCurrentTheme();

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

    // 헤더 배경 클래스 계산
    const getHeaderBackgroundClass = () => {
        if (!headerOverlay) return ""; // 오버레이가 아니면 배경 없음

        if (isScrolled) {
            return "bg-white/95 shadow-sm"; // 스크롤 시 배경 추가
        }

        return ""; // 오버레이이지만 스크롤 전이면 투명
    };

    return (
        <>
            <header
                className={`flex justify-between items-center px-4 sm:px-6 lg:px-24 py-6 lg:py-8 ${
                    headerOverlay ? "fixed top-0 left-0 right-0" : "relative"
                } z-[80] transition-all duration-300 ease-in-out ${getHeaderBackgroundClass()}`}
            >
                {/* 햄버거 메뉴 - 왼쪽 */}
                <div className="flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="relative flex flex-col gap-1.5 w-5 h-3.5 hover:opacity-80 transition-opacity cursor-pointer before:content-[''] before:absolute before:inset-[-12px] before:z-10"
                    >
                        <div
                            className={`w-full h-2 transition-colors duration-300 ${themeColors[currentTheme].hamburger}`}
                        ></div>
                        <div
                            className={`w-full h-2 transition-colors duration-300 ${themeColors[currentTheme].hamburger}`}
                        ></div>
                        <div
                            className={`w-full h-2 transition-colors duration-300 ${themeColors[currentTheme].hamburger}`}
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
                            src={themeColors[currentTheme].logo}
                            alt="리브뮤직 로고"
                            width={105}
                            height={20}
                            className="h-4 sm:h-5 w-auto transition-opacity duration-300"
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
