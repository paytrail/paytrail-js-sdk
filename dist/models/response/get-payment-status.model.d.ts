import { Response } from './response-model';
/**
 * Class GetPaymentStatusResponse
 */
export declare class GetPaymentStatusResponse extends Response {
    /**
     * Data response.
     */
    data: GetPaymentStatusData;
}
/**
 * Class GetPaymentStatusData
 */
export declare class GetPaymentStatusData {
    /**
     * The transaction id.
     */
    transactionId: string;
    /**
     * Payment status. Possible values: new, ok, fail, pending, or delayed
     */
    status: string;
    /**
     * Total amount of the payment in currency's minor units,
     * e.g. for Euros means cents.
     */
    amount: number;
    /**
     * Currency
     */
    currency: string;
    /**
     * Merchant unique identifier for the order.
     */
    stamp: string;
    /**
     * Order reference
     */
    reference: string;
    /**
     * Transaction creation timestamp
     */
    createdAt: string;
    /**
     * Payment API url.
     */
    href: string;
    /**
     * If processed, the name of the payment method provider
     */
    provider: string;
    /**
     * If paid, the filing code issued by the payment method
     * provider if any. Some providers do not return the filing code.
     */
    filingCode: string;
    /**
     * Timestamp when the transaction was paid
     */
    paidAt: string;
    /**
     * If payment is settled, corresponding settlement reference is included
     */
    settlementReference: string;
}
