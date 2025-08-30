import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "통합징수 서비스 | 리브뮤직",
    description:
        "리브뮤직의 통합징수 서비스를 소개합니다. 문화체육관광부 지정 통합징수단체로서 공연권료를 한 번에 간편하게 납부할 수 있습니다.",
    keywords: [
        ...siteConfig.keywords,
        "통합징수",
        "통합징수단체",
        "공연권료 통합납부",
        "문화체육관광부",
        "음악단체",
    ],
    openGraph: {
        title: "통합징수 서비스 | 리브뮤직",
        description:
            "리브뮤직의 통합징수 서비스를 소개합니다. 문화체육관광부 지정 통합징수단체로서 공연권료를 한 번에 간편하게 납부할 수 있습니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/service/integrated-collection`,
    },
    twitter: {
        title: "통합징수 서비스 | 리브뮤직",
        description:
            "리브뮤직의 통합징수 서비스를 소개합니다. 문화체육관광부 지정 통합징수단체로서 공연권료를 한 번에 간편하게 납부할 수 있습니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/service/integrated-collection`,
    },
};

export default function IntegratedCollectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
