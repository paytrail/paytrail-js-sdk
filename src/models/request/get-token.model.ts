import { IsNotEmpty, IsString } from 'class-validator'

/**
 * Class GetTokenRequest
 *
 * @see https://docs.paytrail.com/#/?id=get-token
 */
export class GetTokenRequest {
  /**
   * Tokenization id.
   */
  @IsNotEmpty()
  @IsString()
  checkoutTokenizationId: string
}
