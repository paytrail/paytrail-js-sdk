import { RequestType } from './request-model/request-type.model';
import { PaymentStatus } from './request-model/payment-status.model';
import { ReportFields } from './request-model/report-field.model';
export declare class PaymentReportRequest {
    requestType: RequestType;
    callbackUrl: string;
    paymentStatus?: PaymentStatus;
    startDate: string;
    endDate: string;
    limit?: number;
    reportFields?: ReportFields[];
    submerchant?: number;
    includeItems?: boolean;
}
