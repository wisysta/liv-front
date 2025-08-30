import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "기업비전 | 리브뮤직",
    description:
        "리브뮤직의 기업 비전과 핵심 가치를 소개합니다. 음악산업의 미래를 이어가는 리브뮤직의 비전을 확인해보세요.",
    keywords: [...siteConfig.keywords, "기업비전", "핵심가치", "미션", "비전"],
    openGraph: {
        title: "기업비전 | 리브뮤직",
        description:
            "리브뮤직의 기업 비전과 핵심 가치를 소개합니다. 음악산업의 미래를 이어가는 리브뮤직의 비전을 확인해보세요.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/company/vision`,
    },
    twitter: {
        title: "기업비전 | 리브뮤직",
        description:
            "리브뮤직의 기업 비전과 핵심 가치를 소개합니다. 음악산업의 미래를 이어가는 리브뮤직의 비전을 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/company/vision`,
    },
};

export default function VisionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
