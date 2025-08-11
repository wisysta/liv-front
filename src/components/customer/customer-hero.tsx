"use client";

import { CustomerNavigation } from "@/components/layout/CustomerNavigation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CustomerHeroProps {
    currentPage:
        | "faq"
        | "inquiry"
        | "notice"
        | "press-release"
        | "gallery"
        | "materials";
    title?: string;
    description?: string;
}

export function CustomerHero({
    currentPage,
    title,
    description,
}: CustomerHeroProps) {
    // 스크롤 애니메이션 훅
    const heroSection = useScrollAnimation({ delay: 200 });

    return (
        <section className="bg-white pt-24 lg:pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 고객 네비게이션 */}
                <div
                    ref={heroSection.ref}
                    className={`mb-12 lg:mb-14 2xl:mb-16 transition-all duration-700 ease-out ${
                        heroSection.isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <CustomerNavigation currentPage={currentPage} />
                </div>

                {/* 제목 */}
                {(title || description) && (
                    <div
                        className={`text-center mb-8 transition-all duration-700 ease-out ${
                            heroSection.isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                    >
                        {title && (
                            <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-background-dark mb-4">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-lg text-gray-600">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
