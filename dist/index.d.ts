/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdkVersionsdk版本
 * @extra透传字段
 * @jsError js 和 promise 报错异常上报
 */
declare class ConfigProps {
    uuid: string | undefined;
    requestUrl: string | undefined;
    historyTracker: boolean;
    hashTracker: boolean;
    domTracker: boolean;
    sdkVersion: string | number;
    extra: Record<string, any> | undefined;
    jsError: boolean;
    constructor(config: Partial<ConfigProps>);
    update(key: keyof Omit<ConfigProps, 'update'>, value: any): void;
}

/**
 * 前端监控sdk
 */
declare class TrackerSDK {
    private params;
    private config;
    constructor(config: ConfigProps);
    private initAllHandle;
    private initBrowserEvent;
    /**
     * 根据配置绑定事件监听
     */
    private bindEventSelect;
    private listenEvent;
}

export { TrackerSDK };
