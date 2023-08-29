import { Response } from './response-model';
export declare class MitPaymentResponse extends Response {
    data: MitPaymentData;
}
export declare class MitPaymentData {
    transactionId: string;
    threeDSecureUrl: string;
}
