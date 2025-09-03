import type { Metadata } from "next";
import "./globals.css";
import { StructuredData } from "@/components/seo/StructuredData";
import { SiteStructure } from "@/components/seo/SiteStructure";
import { PopupModal } from "@/components/ui/popup-modal";
import { getActivePopups } from "@/actions/popup-actions";
import { siteConfig } from "@/config/site";

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 2,
    userScalable: true,
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "ko_KR",
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - 공연권료 납부 서비스`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "oOxWTE0J7hnmtnlMXRUWw7rFFyfAGfBUMhO0aMD-kGs",
        other: {
            "naver-site-verification":
                "1f53042b93a5b41c4dd963a573df9a626ad3488f",
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 활성화된 팝업 데이터 가져오기
    const popups = await getActivePopups();
    // 첫 번째 팝업만 사용 (단일 팝업 시스템)
    const activePopup = popups?.[0] ?? null;

    return (
        <html lang="ko">
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="리브뮤직 최신 소식"
                    href="/rss"
                />
            </head>
            <body className="font-pretendard antialiased">
                <StructuredData type="organization" />
                <StructuredData type="website" />
                <SiteStructure />
                {children}
                {/* 팝업 모달 */}
                <PopupModal popup={activePopup} />
            </body>
        </html>
    );
}
