import { Response } from './response-model'

export class GetPaymentStatusResponse extends Response {
  data: GetPaymentStatusData
}

export class GetPaymentStatusData {
  transactionId: string
  status: string
  amount: number
  currency: string
  stamp: string
  reference: string
  createdAt: string
  href: string
  provider: string
  filingCode: string
  paidAt: string
  settlementReference: string
}
