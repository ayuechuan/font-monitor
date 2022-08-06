

import { ConfigProps } from '../core/config';

//必传参数 requestUrl
export interface Options extends Partial<ConfigProps> {
  requestUrl: string,
}

//版本
export enum TrackerConfig {
  version = '1.0.0'
}
//上报必传参数
export type reportTrackerData = {
  [key: string]: any,
  event: string,
  targetKey: string
}