import { Card, CustomerDetail, Response } from './response-model'

/**
 * Class GetTokenResponse
 */
export class GetTokenResponse extends Response {
  /**
   * Data response.
   */
  data: GetTokenData
}

/**
 * Class GetTokenData
 */
export class GetTokenData {
  /**
   * Payment card token.
   */
  token: string

  /**
   * Masked card details. Present if verification was successful.
   */
  card: Card

  /**
   * Customer details.
   */
  customer: CustomerDetail
}
