import { Configuration } from './configuration';
export declare abstract class Paytrail {
    protected merchantId?: string;
    protected secretKey?: string;
    protected platformName?: string;
    constructor(param: Configuration);
    abstract validateHmac(hparams: {
        [key: string]: string;
    }, body: {
        [key: string]: string | number | object;
    } | '', signature: string, secretKey: string, encType: string): boolean;
    protected getHeaders(method: string, transactionId?: string, checkoutTokenizationId?: string, body?: {
        [key: string]: string | number | object;
    } | '' | object): {
        [key: string]: string;
    };
    protected validateRequestItem<T extends {
        validate(): [boolean, string];
    }>(item: T): boolean;
}
