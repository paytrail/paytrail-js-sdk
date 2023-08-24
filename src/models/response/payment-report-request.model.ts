import { Response } from './response-model'

export class PaymentReportResponse extends Response {
  data: PaymentReportData
}

export class PaymentReportData {
  requestId: string
}
