import { CallbackUrl, RefundItem } from './request-model';
export declare class CreateRefundRequest {
    amount?: number;
    email?: string;
    refundStamp?: string;
    refundReference?: string;
    items?: RefundItem[];
    callbackUrls: CallbackUrl;
}
export declare class CreateRefundParams {
    transactionId: string;
}
