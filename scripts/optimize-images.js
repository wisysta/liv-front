const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// 최적화할 이미지 파일 목록
const imagesToOptimize = [
    "기업비전_배너.jpg",
    "기업소개_가치1.jpg",
    "기업소개_가치2.jpg",
    "기업소개_가치3.jpg",
    "기업소개_메인.jpg",
    "기업소개_스크롤1.jpg",
    "기업소개_스크롤2.jpg",
    "기업소개_스크롤3.jpg",
    "기업소개_스크롤4.jpg",
    "인재상_배너.jpg",
    "최광호_대표이사_이미지(CEO 인사말).jpg",
];

const publicDir = path.join(__dirname, "..", "public");

async function optimizeImage(filename) {
    const inputPath = path.join(publicDir, filename);
    const outputPath = path.join(publicDir, filename); // 같은 파일로 덮어쓰기
    const backupPath = path.join(publicDir, `backup_${filename}`);

    try {
        // 파일이 존재하는지 확인
        if (!fs.existsSync(inputPath)) {
            console.log(`❌ 파일을 찾을 수 없습니다: ${filename}`);
            return;
        }

        // 원본 파일 정보 확인
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        // 백업 생성
        fs.copyFileSync(inputPath, backupPath);
        console.log(`📁 백업 생성: backup_${filename}`);

        // 이미지 최적화
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`🔍 처리 중: ${filename}`);
        console.log(`   원본 크기: ${Math.round(originalSize / 1024)}KB`);
        console.log(`   해상도: ${metadata.width}x${metadata.height}`);

        // JPEG 최적화 (해상도 유지, 품질 85로 압축)
        await image
            .jpeg({
                quality: 85,
                progressive: true,
                mozjpeg: true,
            })
            .toFile(outputPath + ".tmp");

        // 임시 파일을 원본으로 교체
        fs.renameSync(outputPath + ".tmp", outputPath);

        // 최적화된 파일 크기 확인
        const optimizedStats = fs.statSync(outputPath);
        const optimizedSize = optimizedStats.size;
        const reduction = (
            ((originalSize - optimizedSize) / originalSize) *
            100
        ).toFixed(1);

        console.log(`   최적화 크기: ${Math.round(optimizedSize / 1024)}KB`);
        console.log(`   압축률: ${reduction}% 감소`);
        console.log(`✅ 완료: ${filename}\n`);
    } catch (error) {
        console.error(`❌ 오류 발생 ${filename}:`, error.message);

        // 오류 발생 시 백업에서 복원
        if (fs.existsSync(backupPath)) {
            fs.copyFileSync(backupPath, inputPath);
            console.log(`🔄 백업에서 복원: ${filename}`);
        }
    }
}

async function optimizeAllImages() {
    console.log("🚀 이미지 최적화 시작...\n");

    for (const filename of imagesToOptimize) {
        await optimizeImage(filename);
    }

    console.log("🎉 모든 이미지 최적화 완료!");
    console.log("💡 백업 파일들은 public/backup_* 형태로 저장되어 있습니다.");
    console.log("💡 문제가 없다면 백업 파일들을 삭제해도 됩니다.");
}

// 스크립트 실행
optimizeAllImages().catch(console.error);
