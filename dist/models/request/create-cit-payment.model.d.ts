import { CreatePaymentRequest } from './create-payment.model';
/**
 * Class CreateCitPaymentRequest
 *
 * This class is used to create a CIT payment request object for
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=request4
 */
export declare class CreateCitPaymentRequest extends CreatePaymentRequest {
    /**
     * Payment card token.
     */
    token: string;
}
export declare class CreateCitPaymentParams {
    /**
     * The transaction id.
     */
    transactionId: string;
}
