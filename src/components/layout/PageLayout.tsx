import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PageLayoutProps {
    children: ReactNode;
    headerOverlay?: boolean; // 헤더가 컨텐츠 위에 오버레이될지 여부 (히어로 섹션 등)
    hideHeader?: boolean; // 헤더를 숨길지 여부
    hideFooter?: boolean; // 푸터를 숨길지 여부
    fullHeight?: boolean; // 전체 화면 높이 사용 여부 (100vh)
    className?: string; // 추가 CSS 클래스
}

/**
 * PageLayout - 유연한 페이지 레이아웃 컴포넌트
 *
 * 사용 예시:
 *
 * 1. 일반 페이지 (헤더가 상단에 고정):
 * <PageLayout>
 *   <div>페이지 내용</div>
 * </PageLayout>
 *
 * 2. 히어로 섹션이 있는 페이지 (헤더가 오버레이):
 * <PageLayout headerOverlay={true} fullHeight={true}>
 *   <div className="h-full bg-cover">히어로 컨텐츠</div>
 * </PageLayout>
 *
 * 3. 헤더 없는 페이지:
 * <PageLayout hideHeader={true}>
 *   <div>컨텐츠</div>
 * </PageLayout>
 *
 * 4. 푸터 없는 페이지:
 * <PageLayout hideFooter={true}>
 *   <div>컨텐츠</div>
 * </PageLayout>
 */

export function PageLayout({
    children,
    headerOverlay = false,
    hideHeader = false,
    hideFooter = false,
    fullHeight = false,
    className = "",
}: PageLayoutProps) {
    return (
        <div
            className={`min-h-screen ${
                fullHeight ? "h-screen" : ""
            } flex flex-col ${className}`}
        >
            {/* 헤더 - 오버레이 모드일 때는 absolute 위치 */}
            {!hideHeader && (
                <div
                    className={
                        headerOverlay
                            ? "absolute top-0 left-0 right-0 z-20"
                            : ""
                    }
                >
                    <Header />
                </div>
            )}

            {/* 메인 컨텐츠 */}
            <main
                className={`${fullHeight ? "flex-1" : "flex-grow"} ${
                    headerOverlay ? "" : "pt-0"
                }`}
            >
                {children}
            </main>

            {/* 푸터 */}
            {!hideFooter && <Footer />}
        </div>
    );
}
