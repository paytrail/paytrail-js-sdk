import { Commission } from './commission.model';
/**
 * Class RefundItem
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=refunditem
 *
 */
export declare class RefundItem {
    /**
     * Total amount to refund this item, in currency's minor units.
     */
    amount: number;
    /**
     * Unique stamp of the refund item.
     */
    stamp: string;
    /**
     * Merchant unique identifier for the refund.
     * Only for Shop-in-Shop payments, do not use for normal payments.
     */
    refundStamp?: string;
    /**
     * Refund reference.
     * Only for Shop-in-Shop payments, do not use for normal payments.
     */
    refundReference?: string;
    /**
     * Shop-in-Shop commission return.
     * In refunds, the given amount is returned from the given commission account to the item merchant account.
     * Only for Shop-in-Shop payments, do not use for normal payments.
     */
    commission?: Commission;
}
