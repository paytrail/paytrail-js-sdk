import { Response } from './response-model';
export declare class CreateRefundResponse extends Response {
    data: CreateRefundData;
}
export declare class CreateRefundData {
    transactionId: string;
    provider: string;
    status: string;
}
