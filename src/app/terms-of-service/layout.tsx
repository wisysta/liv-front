import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "서비스 이용약관 | 리브뮤직",
    description:
        "리브뮤직 서비스 이용약관을 확인해보세요. 공연권료 납부 서비스 이용 시 필요한 약관과 조건을 상세히 안내합니다.",
    keywords: [
        ...siteConfig.keywords,
        "서비스 이용약관",
        "이용약관",
        "서비스 약관",
        "이용조건",
    ],
    openGraph: {
        title: "서비스 이용약관 | 리브뮤직",
        description:
            "리브뮤직 서비스 이용약관을 확인해보세요. 공연권료 납부 서비스 이용 시 필요한 약관과 조건을 상세히 안내합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/terms-of-service`,
    },
    twitter: {
        title: "서비스 이용약관 | 리브뮤직",
        description:
            "리브뮤직 서비스 이용약관을 확인해보세요. 공연권료 납부 서비스 이용 시 필요한 약관과 조건을 상세히 안내합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/terms-of-service`,
    },
    robots: {
        index: true,
        follow: false, // 약관 페이지는 follow 하지 않음
    },
};

export default function TermsOfServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
