"use client";

import { useState, useEffect } from "react";

interface MenuInteractionsProps {
    isOpen: boolean;
    onClose: () => void;
}

// 클라이언트 전용 메뉴 상호작용 (스크롤 제어, 키보드 이벤트)
export function MenuInteractions({ isOpen, onClose }: MenuInteractionsProps) {
    // body 스크롤 제어
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // 컴포넌트 언마운트 시 정리
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // 키보드 이벤트 처리 (ESC로 메뉴 닫기)
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return null; // UI 렌더링 없음, 상호작용만 처리
}
