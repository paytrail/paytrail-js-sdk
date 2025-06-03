import { Response } from './response-model'

/**
 * Class PaymentReportResponse
 */
export class PaymentReportResponse extends Response {
  /**
   * Data response.
   */
  data?: PaymentReportData
}

/**
 * Class PaymentReportData
 */
export class PaymentReportData {
  /**
   * The request id.
   */
  requestId: string
}
