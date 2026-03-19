const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const CONFIG_FILE = path.join(__dirname, 'setup-config.json');
const SRC_PATH = path.resolve(__dirname, '../src');
const MSW_SW_SRC = path.resolve(__dirname, '../mockServiceWorker.js');

/**
 * 檢查管理員權限
 */
function checkAdmin() {
    try {
        execSync('net session', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * 詢問問題的 Promise 封裝
 */
function ask(question, defaultVal = '') {
    return new Promise((resolve) => {
        const query = defaultVal ? `${question} [${defaultVal}]: ` : `${question}: `;
        rl.question(query, (answer) => {
            resolve(answer.trim() || defaultVal);
        });
    });
}

/**
 * 儲存/讀取配置
 */
function loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
        return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
    return {};
}

function saveConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

async function run() {
    console.log("🚀 MSW 互動式建置環境設置工具");
    console.log("-----------------------------------");

    // 1. 環境檢查
    if (!checkAdmin()) {
        console.error("❌ 錯誤：建立連結 (mklink) 需要管理員權限。請以管理員身份執行此程式。");
        process.exit(1);
    }

    if (!fs.existsSync(SRC_PATH) || !fs.existsSync(MSW_SW_SRC)) {
        console.error("❌ 錯誤：找不到源檔案 (src 或 mockServiceWorker.js)。請確保在專案根目錄執行。");
        process.exit(1);
    }

    // 2. 讀取現有配置
    let config = loadConfig();

    // 3. 互動配置
    const projectBase = await ask("請輸入目標專案路徑 (例如 R:\\MPI)", config.projectBase || "R:\\MPI");
    const fullPath = `${projectBase}_Dev`;
    console.log(`📍 目標路徑將設定為: ${fullPath}`);

    const mode = await ask("請選擇模式 (1: Link Mode (推薦), 2: Sync Mode (完全複製))", config.mode || "1");
    
    config.projectBase = projectBase;
    config.mode = mode;
    saveConfig(config);

    const targetMSWDir = path.join(fullPath, 'Genesis_MVC', 'MSW');
    const targetSWFile = path.join(fullPath, 'Genesis_MVC', 'mockServiceWorker.js');

    console.log("\n🛠️ 開始執行設置...");

    try {
        // 清理與建立目錄
        if (fs.existsSync(targetMSWDir)) {
            const stats = fs.lstatSync(targetMSWDir);
            if (stats.isSymbolicLink() || stats.isDirectory()) {
                console.log(`🗑️ 正在移除舊的 MSW 目錄/連結...`);
                // Windows 下目錄連結需要用 rmdir
                execSync(`rmdir "${targetMSWDir}"`, { shell: 'powershell' });
            }
        }

        if (fs.existsSync(targetSWFile)) {
            console.log(`🗑️ 正在移除舊的 Service Worker 檔案...`);
            fs.unlinkSync(targetSWFile);
        }

        if (mode === "1") {
            // Link Mode
            console.log(`🔗 建立目錄連結 (Junction): ${SRC_PATH} -> ${targetMSWDir}`);
            execSync(`mklink /J "${targetMSWDir}" "${SRC_PATH}"`);

            console.log(`🔗 建立檔案連結: ${MSW_SW_SRC} -> ${targetSWFile}`);
            execSync(`mklink "${targetSWFile}" "${MSW_SW_SRC}"`);
        } else {
            // Sync Mode
            console.log(`📂 正在複製檔案...`);
            // 此處可擴充深層複製邏輯，現以 Link 為主
            console.log("⚠️ Sync Mode 尚未完整實作複製細節，建議使用 Link Mode。");
        }

        console.log("\n✅ 設置完成！");
        console.log(`📍 目標專案：${fullPath}`);
        console.log(`💡 您現在可以在專案中直接使用最新的 MSW 內容。`);

    } catch (err) {
        console.error("\n❌ 執行過程中出錯:", err.message);
    }

    rl.close();
}

run();
