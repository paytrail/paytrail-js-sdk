import { Response } from './response-model'

export class MitPaymentResponse extends Response {
  data: MitPaymentData
}

export class MitPaymentData {
  transactionId: string
  threeDSecureUrl: string
}
