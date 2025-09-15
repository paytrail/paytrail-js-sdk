import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator'
import 'reflect-metadata'

 

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
   * Min value -2147483648, max value 2147483647.
   * Negative values are not allowed when usePricesWithoutVat is true
   * or for Shop-in-Shop items.
   */
  @IsNotEmpty()
  @IsNumber()
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
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'VAT percentage values between 0 and 100 are allowed with one number in decimal part' }
  )
  @Min(0, { message: 'VAT percentage values between 0 and 100 are allowed with one number in decimal part' })
  @Max(100, { message: 'VAT percentage values between 0 and 100 are allowed with one number in decimal part' })
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

}
