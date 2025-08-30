import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "자주 묻는 질문 | 리브뮤직",
    description:
        "공연권료 납부에 대한 자주 묻는 질문과 답변을 확인해보세요. 궁금한 내용을 빠르게 찾아보실 수 있습니다.",
    keywords: [
        ...siteConfig.keywords,
        "자주 묻는 질문",
        "FAQ",
        "공연권료 문의",
    ],
    openGraph: {
        title: "자주 묻는 질문 | 리브뮤직",
        description:
            "공연권료 납부에 대한 자주 묻는 질문과 답변을 확인해보세요. 궁금한 내용을 빠르게 찾아보실 수 있습니다.",
        images: [siteConfig.ogImage],
        url: `${siteConfig.url}/customer/faq`,
    },
    twitter: {
        title: "자주 묻는 질문 | 리브뮤직",
        description:
            "공연권료 납부에 대한 자주 묻는 질문과 답변을 확인해보세요. 궁금한 내용을 빠르게 찾아보실 수 있습니다.",
        images: [siteConfig.ogImage],
    },
    alternates: {
        canonical: `${siteConfig.url}/customer/faq`,
    },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
