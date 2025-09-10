import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
    // SEO를 위해 존재하지 않는 페이지는 홈페이지로 리다이렉트
    redirect("/");
}
