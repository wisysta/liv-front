import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "자료실 | 리브뮤직",
    description:
        "리브뮤직의 각종 자료와 문서를 다운로드하실 수 있습니다. 공연권료 관련 양식과 안내자료를 제공합니다.",
    keywords: [
        ...siteConfig.keywords,
        "자료실",
        "다운로드",
        "양식",
        "안내자료",
    ],
    openGraph: {
        title: "자료실 | 리브뮤직",
        description:
            "리브뮤직의 각종 자료와 문서를 다운로드하실 수 있습니다. 공연권료 관련 양식과 안내자료를 제공합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/customer/materials`,
    },
    twitter: {
        title: "자료실 | 리브뮤직",
        description:
            "리브뮤직의 각종 자료와 문서를 다운로드하실 수 있습니다. 공연권료 관련 양식과 안내자료를 제공합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/customer/materials`,
    },
    robots: {
        index: false, // 비밀번호가 필요한 페이지이므로 인덱싱 제외
        follow: false,
    },
};

export default function MaterialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
