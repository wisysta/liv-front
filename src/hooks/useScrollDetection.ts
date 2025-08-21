import { useState, useEffect } from "react";

interface UseScrollDetectionOptions {
    threshold?: number; // 스크롤 임계값 (px)
    enableOnMobileOnly?: boolean; // 모바일에서만 활성화
}

export function useScrollDetection({
    threshold = 50,
    enableOnMobileOnly = true,
}: UseScrollDetectionOptions = {}) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const isMobile = window.innerWidth < 640; // sm 브레이크포인트

            if (enableOnMobileOnly && !isMobile) {
                setIsScrolled(false);
                return;
            }

            setIsScrolled(scrollPosition > threshold);
        };

        // 초기 상태 체크
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [threshold, enableOnMobileOnly]);

    return isScrolled;
}
