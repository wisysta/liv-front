"use client";

import { useState } from "react";
import { SideMenu } from "./SideMenu";
import { MenuInteractions } from "./MenuInteractions";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import { THEME_COLORS, type ThemeVariant } from "@/lib/constants/theme";

interface HeaderInteractionsProps {
    variant?: ThemeVariant;
    headerOverlay?: boolean;
}

export function HeaderInteractions({
    variant = "dark",
    headerOverlay = false,
}: HeaderInteractionsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 스크롤 감지
    const scrollDetected = useScrollDetection({
        threshold: 50,
        enableOnMobileOnly: true,
    });
    const isScrolled = headerOverlay ? scrollDetected : false;

    // 동적 테마 계산
    const currentTheme: ThemeVariant =
        headerOverlay && isScrolled ? "light" : variant;

    // 헤더 배경 클래스 계산
    const getBackgroundClass = () => {
        if (!headerOverlay || !isScrolled) return "";
        return "bg-white/95 shadow-sm";
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* 동적 배경 오버레이 */}
            {headerOverlay && (
                <div
                    className={`fixed top-0 left-0 right-0 h-[88px] lg:h-[104px] z-[79] transition-all duration-300 ease-in-out ${getBackgroundClass()}`}
                />
            )}

            {/* 햄버거 메뉴 버튼 */}
            <button
                onClick={toggleMobileMenu}
                className="fixed top-6 lg:top-8 left-4 sm:left-6 lg:left-24 z-[81] flex flex-col gap-1.5 w-5 h-3.5 hover:opacity-80 transition-opacity cursor-pointer"
                aria-label="메뉴 열기"
            >
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-full h-2 transition-colors duration-300 ${THEME_COLORS[currentTheme].hamburger}`}
                    />
                ))}
            </button>

            {/* 정적 사이드 메뉴 */}
            <SideMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

            {/* 클라이언트 전용 메뉴 상호작용 */}
            <MenuInteractions
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </>
    );
}
