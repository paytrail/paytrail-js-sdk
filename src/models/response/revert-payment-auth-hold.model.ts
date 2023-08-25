import { Response } from './response-model'

export class RevertPaymentAuthHoldResponse extends Response {
  data: RevertPaymentAuthHoldData
}

export class RevertPaymentAuthHoldData {
  transactionId: string
}
