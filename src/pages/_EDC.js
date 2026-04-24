import { http, HttpResponse, delay } from 'msw';
import { mockConfig } from '../store.js';
import { registerMock } from '../mock-entry.js';
import { handleCustomResponse, sendResponse } from '../msw-utils.js';
import { _tmpData ,_form } from './_EDC.data.js';

// 此頁面專用的 Mock 攔截邏輯
const pageHandlers = [
    http.post('*/api/mpi/opertask_edc', async ({ request }) => {
        var data =  _tmpData.MPI_EDC;
        if (mockConfig.arg !=null){
            data = _tmpData[mockConfig.arg];
        }
        return sendResponse({ mockConfig, data });
    }),
];


// 同時註冊 UI 與 Handler
registerMock({
  title: 'EDC',
  controls: [
    {
        label: 'API', 
        key: 'API', 
        type: 'select',
        options: [
            { text: 'MPI_EDC', value: 'MPI_EDC' },
        ] 
    }
  ],
  // [Task 003] 定義在 inject 屬性的內容會自動出現在 Inject 分頁
  inject: {
    EdcCfg: {
        '注入情境 1': _form.EdcCfg
    }
  },
  handlers: pageHandlers
});

