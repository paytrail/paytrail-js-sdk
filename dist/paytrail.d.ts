import { Configuration } from './configuration';
export declare abstract class Paytrail {
    protected merchantId?: number;
    protected secretKey?: string;
    protected platformName?: string;
    constructor(param: Configuration);
    protected getHeaders(method: string, transactionId?: string | null, checkoutTokenizationId?: string | null, body?: {
        [key: string]: string | number | object;
    } | '' | object): {
        [key: string]: string | number;
    };
    handleResponse<T>(type: string, targetClass: any, data?: any, dataError?: {
        message: string | boolean;
        status: number;
    }): T;
    protected callApi<T>(getData: () => Promise<any>, targetClass: new () => T, validateMessagePayload?: () => Promise<any>, validateMessageParam?: () => Promise<any>, validateMessageQuery?: () => Promise<any>): Promise<T>;
}
