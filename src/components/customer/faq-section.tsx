"use client";

import { useState, useMemo } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { Faq } from "@/actions/faq-actions";

interface FaqSectionProps {
    initialFaqs: Faq[];
    categories: string[];
}

export default function FaqSection({
    initialFaqs,
    categories,
}: FaqSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

    // FAQ 필터링
    const filteredFaqs = useMemo(() => {
        let filtered = initialFaqs;

        // 카테고리 필터
        if (selectedCategory !== "전체") {
            filtered = filtered.filter(
                (faq) => faq.category === selectedCategory
            );
        }

        // 검색 필터
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (faq) =>
                    faq.title.toLowerCase().includes(query) ||
                    faq.content.toLowerCase().includes(query)
            );
        }

        return filtered.sort((a, b) => a.order - b.order);
    }, [initialFaqs, selectedCategory, searchQuery]);

    const toggleExpanded = (id: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    return (
        <div className="space-y-8">
            {/* 검색 박스 */}
            <div className="mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="궁금하신 내용을 검색해보세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-8 pr-0 py-3 border-0 border-b border-gray-200 bg-transparent placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-purple text-background-dark font-medium transition-all duration-200"
                    />
                </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-3 mb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                            selectedCategory === category
                                ? "bg-primary-purple text-white shadow-md transform scale-105"
                                : "bg-gray-100 text-background-dark hover:bg-primary-purple/10 hover:text-primary-purple border border-gray-200 hover:border-primary-purple/30"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* FAQ 목록 */}
            <div className="divide-y divide-gray-200">
                {filteredFaqs.length === 0 ? (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-background-dark">
                            검색 결과가 없습니다
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            다른 키워드로 검색해보시거나 카테고리를
                            변경해보세요.
                        </p>
                    </div>
                ) : (
                    filteredFaqs.map((faq) => (
                        <FaqItem
                            key={faq.id}
                            faq={faq}
                            isExpanded={expandedItems.has(faq.id)}
                            onToggle={() => toggleExpanded(faq.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

interface FaqItemProps {
    faq: Faq;
    isExpanded: boolean;
    onToggle: () => void;
}

function FaqItem({ faq, isExpanded, onToggle }: FaqItemProps) {
    return (
        <div className="py-6">
            <button
                onClick={onToggle}
                className="w-full text-left hover:bg-gray-50/50 focus:outline-none transition-colors py-2 -mx-2 px-2 rounded-lg"
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-3 mb-3">
                            <span className="text-xs font-bold text-primary-purple uppercase tracking-wide">
                                {faq.category}
                            </span>
                        </div>
                        <h3 className="text-lg font-medium text-background-dark leading-relaxed">
                            {faq.title}
                        </h3>
                    </div>
                    <div className="flex-shrink-0 ml-4 pt-1">
                        {isExpanded ? (
                            <ChevronUpIcon className="h-5 w-5 text-primary-purple" />
                        ) : (
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                </div>
            </button>

            {isExpanded && (
                <div className="pt-4 pb-2">
                    <div
                        className="prose prose-sm max-w-none text-gray-600 leading-relaxed pl-2"
                        dangerouslySetInnerHTML={{
                            __html: faq.content.replace(/\n/g, "<br />"),
                        }}
                    />
                </div>
            )}
        </div>
    );
}
