// 테마 관련 상수 (재사용 가능)
export const THEME_COLORS = {
    dark: {
        logo: "/livmusic-logo-white.svg",
        hamburger: "bg-white",
    },
    light: {
        logo: "/livmusic-logo-black.svg",
        hamburger: "bg-background-dark",
    },
} as const;

export type ThemeVariant = keyof typeof THEME_COLORS;
