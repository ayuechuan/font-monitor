(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.tracker = {}));
})(this, (function (exports) { 'use strict';

  class BrowserHandle {
      static createHistoryEvent(EventType) {
          const origin = history[EventType];
          return function () {
              const resolve = origin.apply(this, arguments);
              const event = new Event(EventType);
              window.dispatchEvent(event);
              return resolve;
          };
      }
  }

  /**
   * @requestUrl 接口地址
   * @historyTracker history上报
   * @hashTracker hash上报
   * @domTracker 携带Tracker-key 点击事件上报
   * @sdkVersionsdk版本
   * @extra透传字段
   * @jsError js 和 promise 报错异常上报
   */
  class ConfigProps {
      uuid;
      requestUrl;
      historyTracker;
      hashTracker;
      domTracker;
      sdkVersion;
      extra;
      jsError;
      constructor(config) {
          Object.assign(this, config);
      }
      update(key, value) {
          this[key] = value;
      }
  }

  /**
   * 前端监控sdk
   */
  class TrackerSDK {
      params = {
          version: '1.0.0'
      };
      config = new ConfigProps({
          sdkVersion: this.params.version,
          historyTracker: true,
          hashTracker: true,
          domTracker: true,
          jsError: true
      });
      constructor(config) {
          Object.assign(this.config, config);
          this.initAllHandle();
      }
      initAllHandle() {
          this.initBrowserEvent();
      }
      initBrowserEvent() {
          window.history['pushState'] = BrowserHandle.createHistoryEvent('pushState');
          window.history['replaceState'] = BrowserHandle.createHistoryEvent('replaceState');
      }
      /**
       * 根据配置绑定事件监听
       */
      bindEventSelect() {
          this.config;
          const mapStack = new Map([
              ["historyTracker", () => { this.listenEvent(['pushState', 'replaceState'], 'history', null); }]
          ]);
          for (const key in this.config) {
              if (Object.prototype.hasOwnProperty.call(this.config, key)) {
                  const configProps = this.config[key];
                  if (configProps) {
                      const event = mapStack.get(key);
                      event?.();
                  }
              }
          }
      }
      listenEvent(evenetList, targetTag, data) {
          for (const [_, event] of evenetList.entries()) {
              window.addEventListener(event, (props) => {
                  console.log('监听上传');
              });
          }
      }
  }

  exports.TrackerSDK = TrackerSDK;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
