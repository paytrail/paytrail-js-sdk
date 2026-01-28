import { Response } from './response-model';
/**
 * Class AddCardFormResponse
 */
export declare class AddCardFormResponse extends Response {
    /**
     * Data response.
     */
    data?: AddCardFormData;
}
/**
 * Class AddCardFormData
 */
export declare class AddCardFormData {
    /**
     * URL to hosted payment gateway.
     */
    redirectUrl: string;
}
