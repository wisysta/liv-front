import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "공지사항 | 리브뮤직",
    description:
        "리브뮤직의 최신 공지사항과 중요한 안내사항을 확인해보세요. 공연권료 관련 업데이트를 놓치지 마세요.",
    keywords: [...siteConfig.keywords, "공지사항", "안내사항", "업데이트"],
    openGraph: {
        title: "공지사항 | 리브뮤직",
        description:
            "리브뮤직의 최신 공지사항과 중요한 안내사항을 확인해보세요. 공연권료 관련 업데이트를 놓치지 마세요.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/customer/notice`,
    },
    twitter: {
        title: "공지사항 | 리브뮤직",
        description:
            "리브뮤직의 최신 공지사항과 중요한 안내사항을 확인해보세요. 공연권료 관련 업데이트를 놓치지 마세요.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/customer/notice`,
    },
};

export default function NoticeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
