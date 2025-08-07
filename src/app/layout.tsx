import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "리브뮤직 - 공연권료 납부 쉽게 해결하세요",
    description:
        "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다. 리브뮤직과 함께 공연권료 계산과 납부를 간편하게 처리하세요.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </head>
            <body className="font-pretendard antialiased">{children}</body>
        </html>
    );
}
