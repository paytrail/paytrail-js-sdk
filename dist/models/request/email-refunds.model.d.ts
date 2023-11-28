import { CreateRefundRequest } from './create-refund.model';
/**
 * Class EmailRefundRequest
 *
 * @see https://paytrail.github.io/api-documentation/#/examples?id=email-refund-request-body
 */
export declare class EmailRefundRequest extends CreateRefundRequest {
    /**
     * Email to which the refund message will be sent.
     */
    email: string;
}
/**
 * Class EmailRefundParams
 */
export declare class EmailRefundParams {
    /**
     * The transaction id.
     */
    transactionId: string;
}
