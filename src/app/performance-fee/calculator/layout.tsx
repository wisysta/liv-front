import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "공연권료 계산기 | 리브뮤직",
    description:
        "업종별 공연권료를 간편하게 계산해보세요. 매장 규모와 업종에 따른 정확한 공연권료를 확인할 수 있습니다.",
    keywords: [
        ...siteConfig.keywords,
        "공연권료 계산기",
        "요금 계산",
        "업종별 요금",
    ],
    openGraph: {
        title: "공연권료 계산기 | 리브뮤직",
        description:
            "업종별 공연권료를 간편하게 계산해보세요. 매장 규모와 업종에 따른 정확한 공연권료를 확인할 수 있습니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/performance-fee/calculator`,
    },
    twitter: {
        title: "공연권료 계산기 | 리브뮤직",
        description:
            "업종별 공연권료를 간편하게 계산해보세요. 매장 규모와 업종에 따른 정확한 공연권료를 확인할 수 있습니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/performance-fee/calculator`,
    },
};

export default function CalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
