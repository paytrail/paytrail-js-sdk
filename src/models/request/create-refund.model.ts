import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { CallbackUrl, RefundItem } from './request-model'
import { Type } from 'class-transformer';
import 'reflect-metadata'

/**
 * Class CreateRefundRequest
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=http-request-body
 */
export class CreateRefundRequest {
  /**
   * Total amount to refund, in currency's minor units.
   */
  @IsNumber()
  @IsOptional()
  amount?: number

  /**
   * Refund recipient email address.
   */
  @IsEmail()
  @IsOptional()
  email?: string

  /**
   * Merchant unique identifier for the refund.
   */
  @IsString()
  @IsOptional()
  refundStamp?: string

  /**
   * Refund reference.
   */
  @IsString()
  @IsOptional()
  refundReference?: string

  /**
   * Array of items to refund. Use only for Shop-in-Shop payments.
   */
  @IsArray()
  @ValidateNested()
  @IsOptional()
  @Type(() => RefundItem)
  items?: RefundItem[]

  /**
   * Which urls to ping after the refund has been processed.
   *
   * A single callbackurl object holding the success and cancellation urls.
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CallbackUrl)
  callbackUrls: CallbackUrl
}

/**
 * Class CreateRefundParams
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=http-request-body
 */
export class CreateRefundParams {
  /**
   * The transaction id.
   */
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  transactionId: string
}
