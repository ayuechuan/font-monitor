
/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdkVersionsdk版本
 * @extra透传字段
 * @jsError js 和 promise 报错异常上报
 */
export class ConfigProps {
  uuid!: string | undefined;
  requestUrl!: string | undefined;
  historyTracker!: boolean;
  hashTracker!: boolean;
  domTracker!: boolean;
  sdkVersion!: string | number;
  extra!: Record<string, any> | undefined;
  jsError!: boolean;

  constructor(config: Partial<ConfigProps>) {
    Object.assign(this, config)
  }


  update(key: keyof Omit<ConfigProps, 'update'>, value: any): void {
    (this[key] as keyof ConfigProps) = value
  }

}