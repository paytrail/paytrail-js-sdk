export class GetPaymentStatusResponse {
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
