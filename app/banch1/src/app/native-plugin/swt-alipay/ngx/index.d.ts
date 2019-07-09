import { IonicNativePlugin } from '@ionic-native/core';
/**
 * @name swt Alipay
 * @description
 * This plugin does something
 *
 * @usage
 * ```typescript
 * import { swtAlipay } from '@ionic-native/swt-alipay';
 *
 *
 * constructor(private swtAlipay: swtAlipay) { }
 *
 * ...
 *
 *
 * this.swtAlipay.functionName('Hello', 123)
 *   .then((res: any) => console.log(res))
 *   .catch((error: any) => console.error(error));
 *
 * ```
 */
export declare class SwtAlipay extends IonicNativePlugin {
    /**
     * This function does something
     * @param arg1 {string} Some param to configure something
     * @param arg2 {number} Another param to configure something
     * @return {Promise<any>} Returns a promise that resolves when something happens
     */
    payment(info: any, success: any, error: any): Promise<any>;
}
