import { Response } from './response-model'

/**
 * Class CreateCitPaymentResponse
 */
export class CreateCitPaymentResponse extends Response {
  /**
   * Data response.
   */
  data: CreateCitPaymentData
}

/**
 * Class CreateCitPaymentData
 *
 * Represents a response object of CIT payment creation.
 */
export class CreateCitPaymentData {
  /**
   * The transaction id.
   */
  transactionId: string

  /**
   * threeDSecureUrl.
   */
  threeDSecureUrl: string
}
