import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "인재상 | 리브뮤직",
    description:
        "리브뮤직이 추구하는 인재상을 소개합니다. 함께 성장하는 팀워크형 인재, 진심으로 소통하고 존중할 줄 아는 태도를 가진 분들과 함께합니다.",
    keywords: [
        ...siteConfig.keywords,
        "인재상",
        "채용",
        "팀워크",
        "소통",
        "성장",
        "인재채용",
    ],
    openGraph: {
        title: "인재상 | 리브뮤직",
        description:
            "리브뮤직이 추구하는 인재상을 소개합니다. 함께 성장하는 팀워크형 인재, 진심으로 소통하고 존중할 줄 아는 태도를 가진 분들과 함께합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/company/talent`,
    },
    twitter: {
        title: "인재상 | 리브뮤직",
        description:
            "리브뮤직이 추구하는 인재상을 소개합니다. 함께 성장하는 팀워크형 인재, 진심으로 소통하고 존중할 줄 아는 태도를 가진 분들과 함께합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/company/talent`,
    },
};

export default function TalentLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
