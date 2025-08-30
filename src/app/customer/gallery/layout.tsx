import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "갤러리 | 리브뮤직",
    description: "리브뮤직의 다양한 활동 사진과 이벤트 갤러리를 확인해보세요.",
    keywords: [...siteConfig.keywords, "갤러리", "활동사진", "이벤트"],
    openGraph: {
        title: "갤러리 | 리브뮤직",
        description:
            "리브뮤직의 다양한 활동 사진과 이벤트 갤러리를 확인해보세요.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/customer/gallery`,
    },
    twitter: {
        title: "갤러리 | 리브뮤직",
        description:
            "리브뮤직의 다양한 활동 사진과 이벤트 갤러리를 확인해보세요.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/customer/gallery`,
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
