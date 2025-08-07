import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // 이미지 최적화 설정
    images: {
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 768, 1024, 1280, 1600],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30일
    },

    // 성능 최적화
    compress: true,
    poweredByHeader: false,

    // TypeScript 설정
    typescript: {
        tsconfigPath: "./tsconfig.json",
    },

    // ESLint 설정
    eslint: {
        dirs: ["src"],
    },
};

export default nextConfig;
