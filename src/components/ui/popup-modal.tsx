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
    popup: Popup | null;
}

export function PopupModal({ popup }: PopupModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    // 팝업 표시 여부 확인
    useEffect(() => {
        if (!popup) return;

        // 오늘 하루 보지 않기 설정 확인
        const today = new Date().toDateString();
        const dontShowKey = `popup_dont_show_${today}`;
        const shouldNotShow = localStorage.getItem(dontShowKey) === "true";

        if (!shouldNotShow) {
            setIsOpen(true);
        }
    }, [popup]);

    // 팝업 닫기
    const closePopup = useCallback(() => {
        setIsOpen(false);
    }, []);

    // 팝업 클릭 처리
    const handlePopupClick = useCallback(() => {
        if (popup?.linkUrl) {
            window.open(popup.linkUrl, "_blank");
        }
    }, [popup]);

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
            if (event.key === "Escape") {
                closePopup();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closePopup]);

    if (!isOpen || !popup) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 팝업 컨테이너 */}
            <div className="relative bg-white rounded-2xl shadow-2xl  overflow-hidden">
                {/* 팝업 이미지 */}
                <div
                    className={`bg-gray-100 ${
                        popup.linkUrl ? "cursor-pointer" : ""
                    }`}
                    onClick={handlePopupClick}
                >
                    <Image
                        src={popup.imageUrl}
                        alt={popup.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-auto h-auto max-w-[90vw] max-h-[80vh]"
                        style={{ objectFit: "none" }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f3f4f6'/%3E%3Ctext x='200' y='200' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='16'%3E이미지를 불러올 수 없습니다%3C/text%3E%3C/svg%3E";
                        }}
                    />
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
