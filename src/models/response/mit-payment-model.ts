import { Response } from './response-model'

/**
 * Class MitPaymentResponse
 */
export class MitPaymentResponse extends Response {
  /**
   * Data response.
   */
  data: MitPaymentData
}

/**
 * Class MitPaymentData
 */
export class MitPaymentData {
  /**
   * Assigned transaction ID for the payment
   */
  transactionId: string

  /**
   * 3DS redirect URL
   */
  threeDSecureUrl: string
}
