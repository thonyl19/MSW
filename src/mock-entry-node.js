import { mockConfig, _registerPage as registerPage } from './store.js';

export const registerMock = (options) => {
    const { title, controls, inject: manualInject = {}, handlers: pageHandlers } = options;
    
    // 註冊至 store，與瀏覽器端行為一致
    registerPage(title, controls, manualInject);
    
    // 儲存 handlers，以便測試環境在 setupServer 中使用
    mockConfig.activeHandlers = pageHandlers;
};

export const updateConfig = (patch) => {
    Object.assign(mockConfig, patch);
};

export const useFormInjection = () => {};
export const registerComponentToMock = () => {};
