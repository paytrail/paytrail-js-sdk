import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator'
import { Commission } from './commission.model'
import { Type } from 'class-transformer';
import 'reflect-metadata'
/**
 * Class RefundItem
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=refunditem
 *
 */
export class RefundItem {
  /**
   * Total amount to refund this item, in currency's minor units.
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public amount: number

  /**
   * Unique stamp of the refund item.
   */
  @IsNotEmpty()
  @IsString()
  public stamp: string

  /**
   * Merchant unique identifier for the refund.
   * Only for Shop-in-Shop payments, do not use for normal payments.
   */
  @IsOptional()
  @IsString()
  public refundStamp?: string

  /**
   * Refund reference.
   * Only for Shop-in-Shop payments, do not use for normal payments.
   */
  @IsOptional()
  @IsString()
  public refundReference?: string

  /**
   * Shop-in-Shop commission return.
   * In refunds, the given amount is returned from the given commission account to the item merchant account.
   * Only for Shop-in-Shop payments, do not use for normal payments.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => Commission)
  public commission?: Commission
}
