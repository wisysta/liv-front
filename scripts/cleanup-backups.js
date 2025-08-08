const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");

function cleanupBackups() {
    console.log("🗑️  백업 파일 정리 시작...\n");

    try {
        const files = fs.readdirSync(publicDir);
        const backupFiles = files.filter((file) => file.startsWith("backup_"));

        if (backupFiles.length === 0) {
            console.log("📁 정리할 백업 파일이 없습니다.");
            return;
        }

        let deletedCount = 0;
        let totalSize = 0;

        backupFiles.forEach((file) => {
            const filePath = path.join(publicDir, file);
            const stats = fs.statSync(filePath);
            totalSize += stats.size;

            fs.unlinkSync(filePath);
            console.log(
                `🗑️  삭제됨: ${file} (${Math.round(stats.size / 1024)}KB)`
            );
            deletedCount++;
        });

        console.log(`\n✅ 정리 완료!`);
        console.log(`📊 삭제된 파일: ${deletedCount}개`);
        console.log(`💾 절약된 공간: ${Math.round(totalSize / 1024)}KB`);
    } catch (error) {
        console.error("❌ 백업 파일 정리 중 오류 발생:", error.message);
    }
}

// 스크립트 실행
cleanupBackups();
