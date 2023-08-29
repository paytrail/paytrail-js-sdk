import { CreateRefundRequest } from './create-refund.model';
export declare class EmailRefundRequest extends CreateRefundRequest {
    email: string;
}
export declare class EmailRefundParams {
    transactionId: string;
}
