import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

/**
 * Class AddCardFormRequest
 *
 * @see https://docs.paytrail.com/#/?id=add-card-form
 *
 */
export class AddCardFormRequest {
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
