import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from '../store.js';
import { registerMock } from '../mock-entry.js';
import { handleCustomResponse, sendResponse } from '../msw-utils.js';

// 此頁面專用的 Mock 攔截邏輯
const pageHandlers = [
 
  http.post('*/ADM/Operation/ListData', async () => {
    return sendResponse({
      config: mockConfig,
      data: {
        "ID": "e2170b88-7520-4815-ac05-a1c2625520de",
        "Success": true,
        "Data": {
          "gridData": [
            { "OPERATION_NO": "ReceiveRawMaterial", "OPERATION": "AAAA", "CREATE_USER": "Admin", "CREATE_DATE": "2025-07-01" },
            { "OPERATION_NO": "Composition", "OPERATION": "配合", "CREATE_USER": "Admin", "CREATE_DATE": "2025-07-01" },
            { "OPERATION_NO": "Coating", "OPERATION": "塗工", "CREATE_USER": "Admin", "CREATE_DATE": "2025-07-01" }
          ],
          "PageInfo": { "CurrentPage": 1, "PageCount": 1, "PageSize": 10, "RowCount": 3 }
        },
        "Code": "000"
      }
    });
  })
];

// 同時註冊 UI 與 Handler
registerMock({
  title: '作業管理測試',
  controls: [
    { 
      label: 'ListData 測試', 
      key: 'arg', 
      type: 'select', 
      options: [
        { text: '正常資料', value: 'default' },
        { text: '連線錯誤', value: 'error' }
      ] 
    }
  ],
  handlers: pageHandlers
});
