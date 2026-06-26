globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {}
};
globalThis.sessionStorage = {
    getItem: () => null,
    setItem: () => {}
};
globalThis.window = {
    location: { pathname: '/ZAC/InspOper' },
    navigator: { userAgent: 'node.js' }
};
globalThis.navigator = globalThis.window.navigator;
globalThis.document = {
    currentScript: {
        src: 'http://localhost/MSW/msw-loader.js'
    },
    querySelectorAll: () => [],
    querySelector: () => null
};
globalThis._ = {
    get: (obj, path, defaultVal) => {
        if (!obj || !path) return defaultVal;
        const parts = path.split('.');
        let current = obj;
        for (const part of parts) {
            if (current[part] === undefined || current[part] === null) {
                return defaultVal;
            }
            current = current[part];
        }
        return current;
    },
    cloneDeep: (obj) => JSON.parse(JSON.stringify(obj))
};
