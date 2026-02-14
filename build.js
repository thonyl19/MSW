const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

/**
 * 設定目錄
 */
const sourceDir = path.join(__dirname, 'src');
const targetDir = 'Q:/ZAC_Dev/Genesis_MVC/wwwroot/';

/**
 * 遞迴複製目錄函數
 */
function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isDirectory()) {
            copyFolderSync(fromPath, toPath);
        } else {
            // 僅複製 .js 檔案、.json 檔案
            if (element.endsWith('.js') || element.endsWith('.json')) {
                fs.copyFileSync(fromPath, toPath);
            }
        }
    });
}

async function run() {
    try {
        console.log("📦 正在預編譯 MSW 全功能套件 (Core + Browser)...");
        
        // 建立一個臨時的入口點來合併匯出 msw 和 msw/browser
        const tempEntry = path.join(__dirname, 'msw-bundle-entry.js');
        fs.writeFileSync(tempEntry, `
            export * from './node_modules/msw/lib/core/index.mjs';
            export * from './node_modules/msw/lib/browser/index.mjs';
        `);

        await esbuild.build({
            entryPoints: [tempEntry],
            bundle: true,
            format: 'esm',
            outfile: path.join(targetDir, 'msw-core.js'),
            define: { 'process.env.NODE_ENV': '"development"' },
            minify: false,
        });

        // 刪除臨時檔案
        if (fs.existsSync(tempEntry)) fs.unlinkSync(tempEntry);

        console.log("📂 正在同步業務原始碼...");
        copyFolderSync(sourceDir, targetDir);
        
        console.log("🚀 處理完畢！");
        console.log(`📍 MSW 完整套件已被編譯至: ${path.join(targetDir, 'msw-core.js')}`);
    } catch (err) {
        console.error("❌ 執行失敗:", err);
        process.exit(1);
    }
}

run();