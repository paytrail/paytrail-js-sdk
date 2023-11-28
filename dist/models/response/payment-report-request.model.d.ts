import { Response } from './response-model';
/**
 * Class PaymentReportResponse
 */
export declare class PaymentReportResponse extends Response {
    /**
     * Data response.
     */
    data: PaymentReportData;
}
/**
 * Class PaymentReportData
 */
export declare class PaymentReportData {
    /**
     * The request id.
     */
    requestId: string;
}
