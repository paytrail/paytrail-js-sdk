import { Response } from './response-model';
export declare class CreateCitPaymentResponse extends Response {
    data: CreateCitPaymentData;
}
export declare class CreateCitPaymentData {
    transactionId: string;
    threeDSecureUrl: string;
}
