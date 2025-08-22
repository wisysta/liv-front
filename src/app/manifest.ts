import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "리브뮤직 - 공연권료 납부 서비스",
        short_name: "리브뮤직",
        description:
            "따뜻한 소통과 친절한 태도로 공연권료 납부를 도와드리겠습니다",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#7c3aed",
        icons: [
            {
                src: "/app.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/app.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/livmusic-logo-black.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
        categories: ["business", "music", "finance"],
        lang: "ko",
        orientation: "portrait-primary",
    };
}
