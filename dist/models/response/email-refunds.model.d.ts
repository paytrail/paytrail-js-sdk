import { CreateRefundResponse } from './create-refund.model';
import { Response } from './response-model';
/**
 * Class EmailRefundResponse
 */
export declare class EmailRefundResponse extends Response {
    /**
     * Data response.
     */
    data?: EmailRefundData;
}
/**
 * Class EmailRefundData
 */
export declare class EmailRefundData extends CreateRefundResponse {
}
