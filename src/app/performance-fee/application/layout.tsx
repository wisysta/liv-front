import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "공연권 신청안내 | 리브뮤직",
    description:
        "공연권료 납부 신청 방법과 절차를 안내합니다. 간편한 온라인 신청으로 공연권료를 납부하고 음악 사용 권한을 확보하세요.",
    keywords: [
        ...siteConfig.keywords,
        "공연권 신청",
        "납부 신청",
        "신청방법",
        "신청절차",
        "온라인 신청",
    ],
    openGraph: {
        title: "공연권 신청안내 | 리브뮤직",
        description:
            "공연권료 납부 신청 방법과 절차를 안내합니다. 간편한 온라인 신청으로 공연권료를 납부하고 음악 사용 권한을 확보하세요.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/performance-fee/application`,
    },
    twitter: {
        title: "공연권 신청안내 | 리브뮤직",
        description:
            "공연권료 납부 신청 방법과 절차를 안내합니다. 간편한 온라인 신청으로 공연권료를 납부하고 음악 사용 권한을 확보하세요.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/performance-fee/application`,
    },
};

export default function ApplicationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
