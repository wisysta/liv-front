import { PageLayout } from "@/components/layout/PageLayout";
import { getIndustries, type Industry } from "@/actions/industry-actions";
import CalculatorClient from "./calculator-client";

interface CalculatorPageProps {
    industries: Industry[];
}

// 서버 컴포넌트에서 데이터 미리 로드
async function CalculatorPageServer() {
    let industries: Industry[] = [];

    try {
        industries = await getIndustries();
    } catch (error) {
        console.error("업종 데이터 로드 실패:", error);
        // 빈 배열로 폴백, 에러 처리는 클라이언트에서
    }

    return <CalculatorClient initialIndustries={industries} />;
}

export default function PerformanceFeeCalculatorPage() {
    return <CalculatorPageServer />;
}
