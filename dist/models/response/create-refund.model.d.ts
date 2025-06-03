import { Response } from './response-model';
/**
 * Class CreateRefundResponse
 */
export declare class CreateRefundResponse extends Response {
    /**
     * Data response.
     */
    data?: CreateRefundData;
}
/**
 * Class CreateRefundData
 */
export declare class CreateRefundData {
    /**
     * The payment transaction id.
     */
    transactionId: string;
    /**
     * The provider id.
     */
    provider: string;
    /**
     * The refund status, "ok" for successful refunds.
     */
    status: string;
}
