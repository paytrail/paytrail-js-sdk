/**
 * Class AddCardFormRequest
 *
 * @see https://docs.paytrail.com/#/?id=add-card-form
 *
 */
export declare class AddCardFormRequest {
    /**
     * Paytrail account ID.
     */
    checkoutAccount: number;
    /**
     * Used signature algorithm. The same as used by merchant when creating the payment.
     */
    checkoutAlgorithm: string;
    /**
     * HTTP verb of the request. Always POST for addcard-form.
     */
    checkoutMethod: string;
    /**
     * Unique identifier for this request.
     */
    checkoutNonce: string;
    /**
     * ISO 8601 date time.
     */
    checkoutTimestamp: string;
    /**
     * Merchant's url for user redirect on successful card addition.
     */
    checkoutRedirectSuccessUrl: string;
    /**
     * Merchant's url for user redirect on failed card addition.
     */
    checkoutRedirectCancelUrl: string;
    /**
     * Signature calculated from 'checkout-' prefixed POST parameters the same way as calculating signature from headers.
     */
    signature: string;
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
