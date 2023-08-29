export declare class AddCardFormRequest {
    checkoutAccount: number;
    checkoutAlgorithm: string;
    checkoutMethod: string;
    checkoutNonce: string;
    checkoutTimestamp: string;
    checkoutRedirectSuccessUrl: string;
    checkoutRedirectCancelUrl: string;
    signature: string;
    checkoutCallbackSuccessUrl?: string;
    checkoutCallbackCancelUrl?: string;
    language?: string;
}
