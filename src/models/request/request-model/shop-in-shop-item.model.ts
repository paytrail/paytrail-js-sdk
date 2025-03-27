import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Commission } from './commission.model'
import { Type } from 'class-transformer'
import 'reflect-metadata'
/**
 * Class ShopInShopItem
 */
export class ShopInShopItem {
  /**
   * Item level order ID (suborder ID). Mainly useful for Shop-in-Shop purchases.
   */
  @IsOptional()
  @IsString()
  public orderId?: string

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
   * Shop-in-Shop commission. Do not use for normal payments.
   */
  @ValidateNested()
  @Type(() => Commission)
  public commission?: Commission
}
