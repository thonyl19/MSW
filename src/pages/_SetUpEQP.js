import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from '../store.js';
import { registerMock } from '../mock-entry.js';

// 此頁面專用的 Mock 攔截邏輯
const pageHandlers = [
    http.get('*/api/ddl/EqpSetupInfo', async ({ request }) => {
    // 1. 取得 Query Parameters (GET 請求)
    const url = new URL(request.url);
    const eqpNo = url.searchParams.get('EqpNo') || 'Unknown';
    
    // 您可以根據參數做邏輯判斷或 Log 出來調試
    console.log(`%c[MSW] 攔截到機台查詢參數 No: ${eqpNo}`, 'color: #3b82f6');

    // 模擬網路延遲
    await delay(mockConfig.apiDelay);

    // 根據面板目前的選項決定回傳結果
    if (mockConfig.arg === 'error') {
      return new HttpResponse(null, { status: 500 });
    }

    if (mockConfig.customJson){
        try {
            const data = JSON.parse(mockConfig.customJson);
            return HttpResponse.json(data);
        } catch (e) {
        // 如果解析失敗，可以回傳預設值或錯誤提示
        return HttpResponse.json({ error: "無效的 JSON 格式" });
        }
    }

    // 2. 動態產生回傳資料 (例如將傳入的 No 反映在 Result 中)
    const mockData = {
        "RefKey": null,
        "SID": "GTI25081914131934225",
        "No": eqpNo, // 反映傳入的參數
        "Value": "GTI25081914131934225",
        "Display": `機台: ${eqpNo}`,
        "Status": "Run",
        "subItem": []
    };
    return HttpResponse.json(mockData);
  }),
];


// 同時註冊 UI 與 Handler
registerMock({
  title: '_SetUpEQP',
  controls: [
    { 
      label: '機台載入', 
      key: 'arg', 
      type: 'select', 
      options: [
        { text: '正常資料', value: 'default' },
        { text: '機台不存在', value: 'error' }
      ] 
    },
    { 
      label: '自訂回應 JSON', 
      key: 'customJson', // 對應 mockConfig 中的 key
      type: 'textarea',
      placeholder: '請輸入 JSON 格式內容...'
    }
  ],
  handlers: pageHandlers
});
