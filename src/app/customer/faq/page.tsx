"use client";

import { getFaqs, getFaqCategories } from "@/actions/faq-actions";
import FaqSection from "@/components/customer/faq-section";
import { PageLayout } from "@/components/layout/PageLayout";
import { CustomerHero } from "@/components/customer/customer-hero";
import { Suspense, useState, useEffect } from "react";
import { Faq } from "@/actions/faq-actions";

export default function FaqPage() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [faqsData, categoriesData] = await Promise.all([
                    getFaqs(),
                    getFaqCategories(),
                ]);
                setFaqs(faqsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("FAQ 데이터 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <PageLayout
            headerOverlay={true}
            fullHeight={false}
            headerVariant="light"
        >
            {/* Hero 섹션 */}
            <CustomerHero
                currentPage="faq"
                title="자주 묻는 질문"
                description="궁금하신 내용을 검색해보세요"
            />

            {/* FAQ 섹션 */}
            <section className="bg-white py-8 lg:py-12 2xl:py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <FaqSkeleton />
                    ) : (
                        <FaqSection
                            initialFaqs={faqs}
                            categories={categories}
                        />
                    )}
                </div>
            </section>
        </PageLayout>
    );
}

function FaqSkeleton() {
    return (
        <div className="space-y-6">
            {/* 카테고리 필터 스켈레톤 */}
            <div className="flex flex-wrap gap-3 justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-12 w-20 bg-gray-200 rounded-full animate-pulse"
                    />
                ))}
            </div>

            {/* FAQ 아이템 스켈레톤 */}
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg border border-gray-200 p-6"
                    >
                        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    );
}
