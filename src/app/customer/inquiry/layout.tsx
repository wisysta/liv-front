import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "문의하기 | 리브뮤직",
    description:
        "공연권료 납부 관련 문의사항이 있으시면 언제든지 연락주세요. 친절하고 신속한 상담을 제공합니다.",
    keywords: [
        ...siteConfig.keywords,
        "문의하기",
        "상담",
        "고객지원",
        "연락처",
    ],
    openGraph: {
        title: "문의하기 | 리브뮤직",
        description:
            "공연권료 납부 관련 문의사항이 있으시면 언제든지 연락주세요. 친절하고 신속한 상담을 제공합니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/customer/inquiry`,
    },
    twitter: {
        title: "문의하기 | 리브뮤직",
        description:
            "공연권료 납부 관련 문의사항이 있으시면 언제든지 연락주세요. 친절하고 신속한 상담을 제공합니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/customer/inquiry`,
    },
};

export default function InquiryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
