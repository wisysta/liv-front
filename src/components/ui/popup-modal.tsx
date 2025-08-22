"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Popup {
    id: number;
    title: string;
    imageUrl: string;
    linkUrl: string | null;
    isActive: boolean;
    order: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface PopupModalProps {
    popups: Popup[];
}

export function PopupModal({ popups }: PopupModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    // 팝업 표시 여부 확인
    useEffect(() => {
        if (popups.length === 0) return;

        // currentIndex가 범위를 벗어나면 0으로 초기화
        if (currentIndex >= popups.length) {
            setCurrentIndex(0);
        }

        // 오늘 하루 보지 않기 설정 확인
        const today = new Date().toDateString();
        const dontShowKey = `popup_dont_show_${today}`;
        const shouldNotShow = localStorage.getItem(dontShowKey) === "true";

        if (!shouldNotShow) {
            setIsOpen(true);
        }
    }, [popups, currentIndex]);

    // 팝업 닫기
    const closePopup = useCallback(() => {
        setIsOpen(false);
    }, []);

    // 다음 팝업으로 이동
    const nextPopup = useCallback(() => {
        if (popups.length > 1) {
            setCurrentIndex((prev) => (prev + 1) % popups.length);
        }
    }, [popups.length]);

    // 이전 팝업으로 이동
    const prevPopup = useCallback(() => {
        if (popups.length > 1) {
            setCurrentIndex(
                (prev) => (prev - 1 + popups.length) % popups.length
            );
        }
    }, [popups.length]);

    // 팝업 클릭 처리
    const handlePopupClick = useCallback(() => {
        const currentPopup = popups[currentIndex];
        if (currentPopup?.linkUrl) {
            window.open(currentPopup.linkUrl, "_blank");
        }
    }, [popups, currentIndex]);

    // 터치 이벤트 처리
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0]?.clientX || 0);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0]?.clientX || 0);
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && popups.length > 1) {
            nextPopup();
        }
        if (isRightSwipe && popups.length > 1) {
            prevPopup();
        }
    }, [touchStart, touchEnd, popups.length, nextPopup, prevPopup]);

    // 오늘 하루 보지 않기 처리
    const handleDontShowToday = useCallback(() => {
        const today = new Date().toDateString();
        const dontShowKey = `popup_dont_show_${today}`;
        localStorage.setItem(dontShowKey, "true");
        setIsOpen(false);
    }, []);

    // 키보드 이벤트 처리
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "Escape":
                    closePopup();
                    break;
                case "ArrowLeft":
                    if (popups.length > 1) prevPopup();
                    break;
                case "ArrowRight":
                    if (popups.length > 1) nextPopup();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, popups.length, closePopup, prevPopup, nextPopup]);

    if (!isOpen || popups.length === 0) {
        return null;
    }

    const currentPopup = popups[currentIndex];
    if (!currentPopup) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 팝업 컨테이너 */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                {/* 헤더 */}
                <div className="relative">
                    {/* 팝업 이미지 */}
                    <div
                        className={`aspect-square bg-gray-100 ${
                            currentPopup.linkUrl ? "cursor-pointer" : ""
                        }`}
                        onClick={handlePopupClick}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <Image
                            src={currentPopup.imageUrl}
                            alt={currentPopup.title}
                            fill
                            className="object-cover"
                            key={currentIndex}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3E이미지를 불러올 수 없습니다%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>

                    {/* 스와이퍼 인디케이터 */}
                    {popups.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {popups.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentIndex
                                            ? "bg-white"
                                            : "bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 하단 버튼 영역 */}
                <div className="px-4 py-1">
                    {/* 버튼 그룹 */}
                    <div className="flex items-center text-base text-gray-600">
                        <button
                            onClick={closePopup}
                            className="flex-1 text-sm sm:text-base text-center hover:text-gray-900 transition-colors py-3 font-medium"
                        >
                            닫기
                        </button>
                        <span className="text-gray-400 px-2">|</span>
                        <button
                            onClick={handleDontShowToday}
                            className="flex-1 text-sm sm:text-base text-center hover:text-gray-900 transition-colors py-2 font-medium"
                        >
                            오늘 하루 보지 않기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
