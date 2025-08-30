import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "힐링뮤직 서비스 | 리브뮤직",
    description:
        "리브뮤직의 힐링뮤직 서비스를 소개합니다. 치유와 힐링을 위한 음악 서비스로 더 나은 음악 경험을 제공합니다.",
    keywords: [
        ...siteConfig.keywords,
        "힐링뮤직",
        "치유음악",
        "음악서비스",
        "힐링",
        "음악치료",
    ],
    openGraph: {
        title: "힐링뮤직 서비스 | 리브뮤직",
        description:
            "리브뮤직의 힐링뮤직 서비스를 소개합니다. 치유와 힐링을 위한 음악 서비스로 더 나은 음악 경험을 제공합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/service/heal-music`,
    },
    twitter: {
        title: "힐링뮤직 서비스 | 리브뮤직",
        description:
            "리브뮤직의 힐링뮤직 서비스를 소개합니다. 치유와 힐링을 위한 음악 서비스로 더 나은 음악 경험을 제공합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/service/heal-music`,
    },
};

export default function HealMusicLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
