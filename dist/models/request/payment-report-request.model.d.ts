import { RequestType } from './request-model/request-type.model';
import { PaymentStatus } from './request-model/payment-status.model';
import { ReportFields } from './request-model/report-field.model';
/**
 * Class PaymentReportRequest
 *
 * @see https://docs.paytrail.com/#/?id=payment-report-request
 */
export declare class PaymentReportRequest {
    /**
     * In which format will the response be delivered in, currently supported are json and csv.
     */
    requestType: RequestType;
    /**
     * The url the system will send the report to as a POST request.
     */
    callbackUrl: string;
    /**
     * How are the payments statuses filtered. default includes both paid and settled payments,
     * paid includes paid payments that have not been settled yet, all includes everything,
     * for example unpaid or failed payments and settled only includes settled payments.
     */
    paymentStatus?: PaymentStatus;
    /**
     * Only trades created after this datetime will be included in the report. Expects date as ISO format.
     */
    startDate: string;
    /**
     * Only trades created before this datetime will be included in the report. Expects date as ISO format.
     */
    endDate: string;
    /**
     * Limit the amount of payments included in the report.
     */
    limit?: number;
    /**
     * Limit the fields that will be included in the report. Leaving this empty will include all fields.
     */
    reportFields?: ReportFields[];
    /**
     * Get submerchant's payment report (aggregate only).
     */
    submerchant?: number;
    /**
     * Include trade items in generated report. Only applicable when requestType is set to json.
     */
    includeItems?: boolean;
}
