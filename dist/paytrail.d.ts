import { Configuration } from './configuration';
export declare abstract class Paytrail {
    protected merchantId?: number;
    protected secretKey?: string;
    protected platformName?: string;
    constructor(param: Configuration);
    /**
     * Format request headers.
     *
     * @param {string} method - The request method. GET or POST.
     * @param {string | null} transactionId - Paytrail transaction ID when accessing a single transaction.
     *                                       Not required for a new payment request.
     * @param {string | null} checkoutTokenizationId - Paytrail tokenization ID for getToken request.
     * @param {Record<string, string | number | object> | ''} body - The request body.
     *
     * @returns {Record<string, string | number>} An object representing the request headers.
     */
    protected getHeaders(method: string, transactionId?: string | null, checkoutTokenizationId?: string | null, body?: {
        [key: string]: string | number | object;
    } | '' | object): {
        [key: string]: string | number;
    };
    /**
     * Handle API response and return an instance of the specified class.
     *
     * @param {string} type - The response type.
     * @param {T} targetClass - The target class to instantiate.
     * @param {any} data - The response data.
     * @param {{ message: string | boolean; status: number }} dataError - Error data.
     *
     * @returns {T} An instance of the specified class.
     */
    handleResponse<T>(type: string, targetClass: any, data?: any, dataError?: {
        message: string | boolean;
        status: number;
    }): T;
    /**
     * Call an API, validate the response, and return an instance of the specified class.
     *
     * @param {() => Promise<any>} getData - A function that fetches data from the API.
     * @param {new () => T} targetClass - The target class to instantiate.
     * @param {() => Promise<any>} validateMessagePayload - A function to validate the message payload.
     * @param {() => Promise<any>} validateMessageParam - A function to validate message parameters.
     * @param {() => Promise<any>} validateMessageQuery - A function to validate message queries.
     *
     * @returns {Promise<T>} A promise that resolves to an instance of the specified class.
     */
    protected callApi<T>(getData: () => Promise<any>, targetClass: new () => T, validateMessagePayload?: () => Promise<any>, validateMessageParam?: () => Promise<any>, validateMessageQuery?: () => Promise<any>): Promise<T>;
}
