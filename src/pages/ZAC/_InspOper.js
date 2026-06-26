import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from 'msw-store';
import { registerMock } from 'msw-entry';
import { handleCustomResponse, sendResponse } from 'msw-utils';
import { _tmpData,_form } from './_InspOper.data.js';

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
  title: '_IPQC_Form',
  controls: [
    { 
      label: 'ListData (MSW 攔截)', 
      key: 'arg', 
      type: 'select', 
      options: [
        { text: 'EDC查詢 (預設)', value: 'EDC查詢' },
        { text: 'EDC查詢 (變更數據)', value: 'EDC查詢1' },
      ] 
    }
  ],
  inject: {
    'set_model.Setting.CheckOutSet.OperInspInfo': {
      '檢驗項目資訊-1': _form.form1
    }
  },
  handlers: pageHandlers
});