import { Response } from './response-model'

export class CreateRefundResponse extends Response {
  data: CreateRefundData
}

export class CreateRefundData {
  transactionId: string
  provider: string
  status: string
}
