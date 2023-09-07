import { Response } from './response-model';
/**
 * Class RevertPaymentAuthHoldResponse
 */
export declare class RevertPaymentAuthHoldResponse extends Response {
    /**
     * Data response.
     */
    data: RevertPaymentAuthHoldData;
}
/**
 * Class RevertPaymentAuthHoldData
 */
export declare class RevertPaymentAuthHoldData {
    /**
     * The transaction id.
     */
    transactionId: string;
}
