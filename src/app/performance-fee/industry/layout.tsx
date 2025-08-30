import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "납부대상 확인 | 리브뮤직",
    description:
        "내 업종이 공연권료 납부 대상인지 확인해보세요. 업종별 상세 정보와 납부 기준을 제공합니다.",
    keywords: [
        ...siteConfig.keywords,
        "납부대상",
        "업종 확인",
        "공연권료 대상",
    ],
    openGraph: {
        title: "납부대상 확인 | 리브뮤직",
        description:
            "내 업종이 공연권료 납부 대상인지 확인해보세요. 업종별 상세 정보와 납부 기준을 제공합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/performance-fee/industry`,
    },
    twitter: {
        title: "납부대상 확인 | 리브뮤직",
        description:
            "내 업종이 공연권료 납부 대상인지 확인해보세요. 업종별 상세 정보와 납부 기준을 제공합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/performance-fee/industry`,
    },
};

export default function IndustryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
