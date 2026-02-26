/**
 * Class AddCardFormRequest
 *
 * @see https://docs.paytrail.com/#/?id=add-card-form
 *
 */
export declare class AddCardFormRequest {
    /**
     * Merchant's url for user redirect on successful card addition.
     */
    checkoutRedirectSuccessUrl: string;
    /**
     * Merchant's url for user redirect on failed card addition.
     */
    checkoutRedirectCancelUrl: string;
    /**
     * Merchant's url called on successful card addition.
     */
    checkoutCallbackSuccessUrl?: string;
    /**
     * Merchant's url called on failed card addition.
     */
    checkoutCallbackCancelUrl?: string;
    /**
     * Card addition form language, currently supported are FI, SV, and EN.
     */
    language?: string;
}
