"use client";

import Link from "next/link";

interface CustomerNavigationProps {
    currentPage:
        | "faq"
        | "inquiry"
        | "notice"
        | "press-release"
        | "gallery"
        | "materials";
    className?: string;
}

export function CustomerNavigation({
    currentPage,
    className = "",
}: CustomerNavigationProps) {
    const navigationItems = [
        { key: "faq", label: "자주 묻는 질문", href: "/customer/faq" },
        { key: "inquiry", label: "1:1 문의", href: "/customer/inquiry" },
        { key: "notice", label: "공지사항", href: "/customer/notice" },
        {
            key: "press-release",
            label: "보도자료",
            href: "/customer/press-release",
        },
        { key: "gallery", label: "갤러리", href: "/customer/gallery" },
        { key: "materials", label: "자료실", href: "/customer/materials" },
    ];

    return (
        <div
            className={`flex flex-wrap justify-center gap-8 lg:gap-12 ${className}`}
        >
            {navigationItems.map((item) => (
                <Link
                    key={item.key}
                    href={item.href}
                    className={
                        currentPage === item.key
                            ? "text-base 2xl:text-lg text-background-dark font-semibold border-b-2 border-primary-purple"
                            : "text-base 2xl:text-lg text-gray-500 hover:text-background-dark transition-colors"
                    }
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}
