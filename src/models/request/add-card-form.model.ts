import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Class AddCardFormRequest
 *
 * @see https://docs.paytrail.com/#/?id=add-card-form
 *
 */
export class AddCardFormRequest {
  /**
   * Paytrail account ID.
   */
  @IsNotEmpty()
  @IsNumber()
  checkoutAccount: number

  /**
   * Used signature algorithm. The same as used by merchant when creating the payment.
   */
  @IsNotEmpty()
  @IsString()
  checkoutAlgorithm: string

  /**
   * HTTP verb of the request. Always POST for addcard-form.
   */
  @IsNotEmpty()
  @IsString()
  checkoutMethod: string

  /**
   * Unique identifier for this request.
   */
  @IsNotEmpty()
  @IsString()
  checkoutNonce: string

  /**
   * ISO 8601 date time.
   */
  @IsNotEmpty()
  @IsString()
  checkoutTimestamp: string

  /**
   * Merchant's url for user redirect on successful card addition.
   */
  @IsNotEmpty()
  @IsString()
  checkoutRedirectSuccessUrl: string

  /**
   * Merchant's url for user redirect on failed card addition.
   */
  @IsNotEmpty()
  @IsString()
  checkoutRedirectCancelUrl: string

  /**
   * Signature calculated from 'checkout-' prefixed POST parameters the same way as calculating signature from headers.
   */
  @IsNotEmpty()
  @IsString()
  signature: string

  /**
   * Merchant's url called on successful card addition.
   */
  @IsString()
  @IsOptional()
  checkoutCallbackSuccessUrl?: string

  /**
   * Merchant's url called on failed card addition.
   */
  @IsString()
  @IsOptional()
  checkoutCallbackCancelUrl?: string

  /**
   * Card addition form language, currently supported are FI, SV, and EN.
   */
  @IsString()
  @IsOptional()
  language?: string
}
