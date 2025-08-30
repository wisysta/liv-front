import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: "페이지를 찾을 수 없습니다 | 리브뮤직",
    description:
        "요청하신 페이지를 찾을 수 없습니다. 홈페이지로 돌아가거나 다른 페이지를 이용해주세요.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <PageLayout headerOverlay={false} fullHeight={false}>
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center">
                        <h1 className="text-9xl font-bold text-primary-purple">
                            404
                        </h1>
                        <h2 className="mt-6 text-3xl font-bold text-background-dark">
                            페이지를 찾을 수 없습니다
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            요청하신 페이지가 존재하지 않거나 이동되었을 수
                            있습니다.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <Link
                            href="/"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-purple hover:bg-primary-purple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple transition-colors"
                        >
                            홈페이지로 돌아가기
                        </Link>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <Link
                                href="/performance-fee/calculator"
                                className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-background-dark bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple transition-colors"
                            >
                                공연권료 계산기
                            </Link>
                            <Link
                                href="/customer/faq"
                                className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-background-dark bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-purple transition-colors"
                            >
                                자주 묻는 질문
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            문제가 지속되면{" "}
                            <Link
                                href="/customer/inquiry"
                                className="font-medium text-primary-purple hover:text-primary-purple/80"
                            >
                                문의하기
                            </Link>
                            를 이용해주세요.
                        </p>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
