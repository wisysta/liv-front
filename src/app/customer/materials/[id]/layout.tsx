import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "자료실 상세 | 리브뮤직",
    description: "리브뮤직 자료실의 상세 자료를 확인해보세요.",
    keywords: [...siteConfig.keywords, "자료실", "상세보기", "다운로드"],
    openGraph: {
        title: "자료실 상세 | 리브뮤직",
        description: "리브뮤직 자료실의 상세 자료를 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    twitter: {
        title: "자료실 상세 | 리브뮤직",
        description: "리브뮤직 자료실의 상세 자료를 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    robots: {
        index: false, // 자료실은 비밀번호가 필요하므로 인덱싱 제외
        follow: false,
    },
};

export default function MaterialDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
