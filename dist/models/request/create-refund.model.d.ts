import { CallbackUrl, RefundItem } from './request-model';
import 'reflect-metadata';
/**
 * Class CreateRefundRequest
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=http-request-body
 */
export declare class CreateRefundRequest {
    /**
     * Total amount to refund, in currency's minor units.
     */
    amount?: number;
    /**
     * Refund recipient email address.
     */
    email?: string;
    /**
     * Merchant unique identifier for the refund.
     */
    refundStamp?: string;
    /**
     * Refund reference.
     */
    refundReference?: string;
    /**
     * Array of items to refund. Use only for Shop-in-Shop payments.
     */
    items?: RefundItem[];
    /**
     * Which urls to ping after the refund has been processed.
     *
     * A single callbackurl object holding the success and cancellation urls.
     */
    callbackUrls: CallbackUrl;
}
/**
 * Class CreateRefundParams
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=http-request-body
 */
export declare class CreateRefundParams {
    /**
     * The transaction id.
     */
    transactionId: string;
}
