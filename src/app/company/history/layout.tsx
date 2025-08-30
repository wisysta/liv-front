import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "기업연혁 | 리브뮤직",
    description:
        "리브뮤직의 성장 과정과 주요 연혁을 확인해보세요. 문화체육관광부 지정 통합징수단체로서의 발전 과정을 소개합니다.",
    keywords: [...siteConfig.keywords, "기업연혁", "회사소개", "통합징수단체"],
    openGraph: {
        title: "기업연혁 | 리브뮤직",
        description:
            "리브뮤직의 성장 과정과 주요 연혁을 확인해보세요. 문화체육관광부 지정 통합징수단체로서의 발전 과정을 소개합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/company/history`,
    },
    twitter: {
        title: "기업연혁 | 리브뮤직",
        description:
            "리브뮤직의 성장 과정과 주요 연혁을 확인해보세요. 문화체육관광부 지정 통합징수단체로서의 발전 과정을 소개합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/company/history`,
    },
};

export default function CompanyHistoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
