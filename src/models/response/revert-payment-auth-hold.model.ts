import { Response } from './response-model'

/**
 * Class RevertPaymentAuthHoldResponse
 */
export class RevertPaymentAuthHoldResponse extends Response {
  /**
   * Data response.
   */
  data: RevertPaymentAuthHoldData
}

/**
 * Class RevertPaymentAuthHoldData
 */
export class RevertPaymentAuthHoldData {
  /**
   * The transaction id.
   */
  transactionId: string
}
