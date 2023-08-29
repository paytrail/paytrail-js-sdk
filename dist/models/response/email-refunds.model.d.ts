import { CreateRefundResponse } from './create-refund.model';
import { Response } from './response-model';
export declare class EmailRefundResponse extends Response {
    data: EmailRefundData;
}
export declare class EmailRefundData extends CreateRefundResponse {
}
