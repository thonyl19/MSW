import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from '../store.js';
import { registerMock } from '../mock-entry.js';
import { handleCustomResponse, sendResponse } from '../msw-utils.js';
import { _tmpData,_form } from './_Self_Main.data.js';

// 2.6 數據定義模式 (Data Definition Mode)

// 此頁面專用的 Mock 攔截邏輯
const pageHandlers = [
    http.post('*/Example/Self/ListData', async ({ request }) => {
        var data =  _.get(_tmpData,mockConfig.arg,null);
        return sendResponse({ mockConfig, data });
    }),
    http.post('*/WIP/LotEDC/ListLotEDC', async ({ request }) => {
        var data =  _.get(_tmpData,mockConfig.arg,null);
        return sendResponse({ mockConfig, data });
    }),
];

// 同時註冊 UI 與 Handler
registerMock({
  title: '_Self_Main',
  controls: [
    { 
      label: 'ListData (MSW 攔截)', 
      key: 'arg', 
      type: 'select', 
      options: [
        { text: 'EDC查詢 (預設)', value: 'EDC查詢' },
        { text: 'EDC查詢 (變更數據)', value: 'EDC查詢1' },
      ] 
    },
    {
      label: '2.6 表單一鍵注入 (Demo)',
      key: 'injectionDemo',
      type: 'actions',
      list: [
        { text: '注入情境 1', type: 'FILL_FORM', payload: _form.form1 },
        { text: '注入情境 1-變更', type: 'FILL_FORM', payload: _tmpData.EDC查詢1 },
        { text: '重設注入', type: 'RESET_FORM', payload: null }
      ]
    }
  ],
  handlers: pageHandlers
});