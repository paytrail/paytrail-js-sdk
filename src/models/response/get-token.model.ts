import { Card, CustomerDetail, Response } from './response-model'
import { NetworkToken } from './response-model/network-token.model'

/**
 * Class GetTokenResponse
 */
export class GetTokenResponse extends Response {
  /**
   * Data response.
   */
  data?: GetTokenData
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
   * Masked card details.
   */
  card: Card

  /**
   * Customer details.
   */
  customer: CustomerDetail

  /**
   * Additional network token details.Present if token is of type network token.
   */
  network_token?: NetworkToken
}
