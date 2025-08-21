"use client";

import Link from "next/link";

interface CompanyNavigationProps {
    currentPage: "ceo" | "vision" | "history" | "talent";
    className?: string;
}

export function CompanyNavigation({
    currentPage,
    className = "",
}: CompanyNavigationProps) {
    const navigationItems = [
        { key: "ceo", label: "CEO 인사말", href: "/company/ceo" },
        { key: "vision", label: "기업비전", href: "/company/vision" },
        { key: "history", label: "기업연혁", href: "/company/history" },
        // { key: "talent", label: "인재상", href: "/company/talent" },
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
                            ? "text-sm sm:text-base 2xl:text-lg text-background-dark font-semibold border-b-2 border-primary-purple"
                            : "text-sm sm:text-base 2xl:text-lg text-gray-500 hover:text-background-dark transition-colors"
                    }
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}
