import { Response } from './response-model'

/**
 * Class CancelOrderResponse
 */
export class CancelOrderResponse extends Response {
  /**
   * Data response.
   */
  data?: CancelOrderData
}

/**
 * Class CancelOrderData
 */
export class CancelOrderData {
  /**
   * The transaction id.
   */
  transactionId: string
}
