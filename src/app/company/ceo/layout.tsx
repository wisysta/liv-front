import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "CEO 인사말 | 리브뮤직",
    description:
        "리브뮤직 최광호 대표이사의 인사말을 전해드립니다. 공연권료 통합징수를 통한 음악산업 발전 비전을 확인해보세요.",
    keywords: [
        ...siteConfig.keywords,
        "CEO 인사말",
        "대표이사",
        "최광호",
        "경영진",
    ],
    openGraph: {
        title: "CEO 인사말 | 리브뮤직",
        description:
            "리브뮤직 최광호 대표이사의 인사말을 전해드립니다. 공연권료 통합징수를 통한 음악산업 발전 비전을 확인해보세요.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/company/ceo`,
    },
    twitter: {
        title: "CEO 인사말 | 리브뮤직",
        description:
            "리브뮤직 최광호 대표이사의 인사말을 전해드립니다. 공연권료 통합징수를 통한 음악산업 발전 비전을 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/company/ceo`,
    },
};

export default function CeoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
