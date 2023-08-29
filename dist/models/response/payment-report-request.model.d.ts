import { Response } from './response-model';
export declare class PaymentReportResponse extends Response {
    data: PaymentReportData;
}
export declare class PaymentReportData {
    requestId: string;
}
