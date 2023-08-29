import { Response } from './response-model';
export declare class RevertPaymentAuthHoldResponse extends Response {
    data: RevertPaymentAuthHoldData;
}
export declare class RevertPaymentAuthHoldData {
    transactionId: string;
}
