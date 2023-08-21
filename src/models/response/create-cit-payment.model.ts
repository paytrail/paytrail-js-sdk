import { Response } from './response-model'

export class CreateCitPaymentResponse extends Response {
  data: CreateCitPaymentData
}

export class CreateCitPaymentData {
  transactionId: string
}
