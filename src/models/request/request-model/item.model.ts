import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, ValidateNested } from 'class-validator'
import { Commission } from './commission.model'

/**
 * Class Item
 *
 * This class defines payment item details.
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=item
 */
export class Item {
  /**
   * Price per unit, VAT included, in each country's
   * minor unit, e.g. for Euros use cents.
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public unitPrice: number

  /**
   * Quantity, how many items ordered.
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public units: number

  /**
   * The VAT percentage.
   */
  @IsNotEmpty()
  @IsNumber()
  public vatPercentage: number

  /**
   * Merchant product code.
   * May appear on invoices of certain payment methods.
   */
  @IsNotEmpty()
  @Length(1, 100)
  public productCode: string

  /**
   * The delivery date.
   *
   * @deprecated
   */
  @IsOptional()
  @IsString()
  public deliveryDate?: string

  /**
   * ItemInterface description.
   * May appear on invoices of certain payment methods.
   */
  @Length(0, 1000)
  @IsOptional()
  public description?: string

  /**
   * Merchant specific item category.
   */
  @IsOptional()
  @Length(0, 100)
  public category?: string

  /**
   * Item level order ID (suborder ID).
   * Mainly useful for Shop-in-Shop purchases.
   */
  @IsOptional()
  @IsString()
  public orderId?: string

  /**
   * Unique identifier for this item.
   * Required for Shop-in-Shop payments.
   */
  @IsOptional()
  @Length(0, 50)
  public stamp?: string

  /**
   * Reference for this item.
   * Required for Shop-in-Shop payments.
   */
  @IsOptional()
  @Length(0, 50)
  public reference?: string

  /**
   * Merchant ID for the item.
   * Required for Shop-in-Shop payments, do not use for normal payments.
   */
  @IsOptional()
  @Length(0, 50)
  public merchant?: string

  /**
   * Shop-in-Shop commission.
   * Do not use for normal payments.
   */
  @IsOptional()
  @ValidateNested()
  public commission?: Commission
}
