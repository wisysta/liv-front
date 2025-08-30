import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "공지사항 상세 | 리브뮤직",
    description: "리브뮤직의 공지사항 상세 내용을 확인해보세요.",
    keywords: [...siteConfig.keywords, "공지사항", "상세보기"],
    openGraph: {
        title: "공지사항 상세 | 리브뮤직",
        description: "리브뮤직의 공지사항 상세 내용을 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    twitter: {
        title: "공지사항 상세 | 리브뮤직",
        description: "리브뮤직의 공지사항 상세 내용을 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function NoticeDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
