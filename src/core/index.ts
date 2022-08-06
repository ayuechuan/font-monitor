import { BrowserHandle } from "../utils/utils";
import { ConfigProps } from "./config";

/**
 * 前端监控sdk
 */
export  class TrackerSDK {
  private params = {
    version: '1.0.0'
  }

  private config = new ConfigProps({
    sdkVersion: this.params.version,
    historyTracker: true,
    hashTracker: true,
    domTracker: true,
    jsError: true
  });

  constructor(config: ConfigProps) {
    Object.assign(this.config, config);

    this.initAllHandle();

  }


  private initAllHandle() {
    this.initBrowserEvent();
  }


  private initBrowserEvent() {
    window.history['pushState'] = BrowserHandle.createHistoryEvent('pushState');
    window.history['replaceState'] = BrowserHandle.createHistoryEvent('replaceState');
  }




  /**
   * 根据配置绑定事件监听
   */
  private bindEventSelect() {
    const {
      historyTracker,
      domTracker
    } = this.config;

    const mapStack = new Map([
      ["historyTracker", () => { this.listenEvent(['pushState', 'replaceState'], 'history', null) }]
    ]);

    for (const key in this.config) {
      if (Object.prototype.hasOwnProperty.call(this.config, key)) {
        const configProps = this.config[key as keyof ConfigProps];
        if (configProps) {
          const event = mapStack.get(key);
          event?.();
        }

      }
    }



  }



  private listenEvent<T>(evenetList: string[], targetTag: string, data?: T): void {
    for (const [_, event] of evenetList.entries()) {
      window.addEventListener(event, (props) => {
        console.log('监听上传');

      })
    }
  }









}