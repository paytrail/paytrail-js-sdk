import { CreatePaymentRequest } from './create-payment.model';
/**
 * Class MitPaymentRequest
 *
 * This class is used to create a MIT payment request object
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=request4
 */
export declare class MitPaymentRequest extends CreatePaymentRequest {
    /**
     * Token
     */
    token: string;
}
/**
 * Class MitPaymentParams
 *
 * @see https://docs.paytrail.com/#/?id=get-token
 */
export declare class MitPaymentParams {
    /**
     * The transaction id.
     */
    transactionId: string;
}
