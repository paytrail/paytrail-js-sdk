import { Response } from './response-model';
/**
 * Class CreateCitPaymentResponse
 */
export declare class CreateCitPaymentResponse extends Response {
    /**
     * Data response.
     */
    data?: CreateCitPaymentData;
}
/**
 * Class CreateCitPaymentData
 *
 * Represents a response object of CIT payment creation.
 */
export declare class CreateCitPaymentData {
    /**
     * The transaction id.
     */
    transactionId: string;
    /**
     * threeDSecureUrl.
     */
    threeDSecureUrl: string;
}
