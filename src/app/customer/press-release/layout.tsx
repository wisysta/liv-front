import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "보도자료 | 리브뮤직",
    description:
        "리브뮤직의 최신 보도자료와 언론 발표 내용을 확인해보세요. 공연권료 관련 주요 뉴스와 업계 동향을 제공합니다.",
    keywords: [
        ...siteConfig.keywords,
        "보도자료",
        "언론발표",
        "뉴스",
        "업계동향",
    ],
    openGraph: {
        title: "보도자료 | 리브뮤직",
        description:
            "리브뮤직의 최신 보도자료와 언론 발표 내용을 확인해보세요. 공연권료 관련 주요 뉴스와 업계 동향을 제공합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/customer/press-release`,
    },
    twitter: {
        title: "보도자료 | 리브뮤직",
        description:
            "리브뮤직의 최신 보도자료와 언론 발표 내용을 확인해보세요. 공연권료 관련 주요 뉴스와 업계 동향을 제공합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/customer/press-release`,
    },
};

export default function PressReleaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
