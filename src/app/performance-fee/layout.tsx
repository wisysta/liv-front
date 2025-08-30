import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "공연권료란? | 리브뮤직",
    description:
        "매장에서 음악을 재생하는 행위는 공연에 해당합니다. 창작자에게 정당한 보상을 지급하는 공연권료에 대해 알아보세요.",
    keywords: [
        ...siteConfig.keywords,
        "공연권료 설명",
        "음악 저작권",
        "매장 음악 사용",
    ],
    openGraph: {
        title: "공연권료란? | 리브뮤직",
        description:
            "매장에서 음악을 재생하는 행위는 공연에 해당합니다. 창작자에게 정당한 보상을 지급하는 공연권료에 대해 알아보세요.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/performance-fee`,
    },
    twitter: {
        title: "공연권료란? | 리브뮤직",
        description:
            "매장에서 음악을 재생하는 행위는 공연에 해당합니다. 창작자에게 정당한 보상을 지급하는 공연권료에 대해 알아보세요.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/performance-fee`,
    },
};

export default function PerformanceFeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
