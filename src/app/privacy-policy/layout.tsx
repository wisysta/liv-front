import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "개인정보처리방침 | 리브뮤직",
    description:
        "리브뮤직의 개인정보처리방침을 확인해보세요. 고객의 개인정보 보호를 위한 정책과 처리 방침을 상세히 안내합니다.",
    keywords: [
        ...siteConfig.keywords,
        "개인정보처리방침",
        "개인정보보호",
        "정보보호정책",
        "프라이버시",
    ],
    openGraph: {
        title: "개인정보처리방침 | 리브뮤직",
        description:
            "리브뮤직의 개인정보처리방침을 확인해보세요. 고객의 개인정보 보호를 위한 정책과 처리 방침을 상세히 안내합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/privacy-policy`,
    },
    twitter: {
        title: "개인정보처리방침 | 리브뮤직",
        description:
            "리브뮤직의 개인정보처리방침을 확인해보세요. 고객의 개인정보 보호를 위한 정책과 처리 방침을 상세히 안내합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/privacy-policy`,
    },
    robots: {
        index: true,
        follow: false, // 개인정보처리방침은 follow 하지 않음
    },
};

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
