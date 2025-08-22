import { IsNotEmpty, IsNumber, Min, Max, IsOptional, ValidateNested } from 'class-validator'
import { Item } from './item.model'
import { Type } from 'class-transformer'
import { Commission } from './commission.model'
import 'reflect-metadata'

/**
 * Class ShopInShopItem
 *
 * Shop-in-Shop item extends the base Item class with specific validations:
 * - stamp is required
 * - reference is required
 * - merchant is required
 * - commission can be given but is optional
 * - unitPrice minimum is 0 (no negative values allowed)
 */
export class ShopInShopItem extends Item {
  /**
   * Price per unit, VAT included, in each country's
   * minor unit, e.g. for Euros use cents.
   * For Shop-in-Shop items, negative values are not allowed.
   */
  @IsNumber()
  @Min(0)
  @Max(2147483647)
  public unitPrice: number
  /**
   * Unique identifier for this item. Required for Shop-in-Shop payments. Required for item refunds.
   */
  @IsNotEmpty()
  public stamp: string

  /**
   * Reference for this item. Required for Shop-in-Shop payments.
   */
  @IsNotEmpty()
  public reference: string

  /**
   * Merchant ID for the item. Required for Shop-in-Shop payments, do not use for normal payments.
   */
  @IsNotEmpty()
  public merchant: string

  /**
   * Shop-in-Shop commission. Optional for Shop-in-Shop payments only.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => Commission)
  public commission?: Commission
}
