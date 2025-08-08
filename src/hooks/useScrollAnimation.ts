"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
    threshold?: number;
    delay?: number;
    rootMargin?: string;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const {
        threshold = 0.1,
        delay = 0,
        rootMargin = "0px 0px -50px 0px",
    } = options;
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry && entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold,
                rootMargin, // 사용자 정의 또는 기본값 사용
            }
        );

        const currentElement = ref.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [threshold, delay, rootMargin]);

    return { ref, isVisible };
}
