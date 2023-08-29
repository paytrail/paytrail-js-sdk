import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Commission } from './commission.model'

export class ShopInShopItem {
  @IsOptional()
  @IsString()
  public orderId?: string

  @IsNotEmpty()
  public stamp: string

  @IsNotEmpty()
  public reference: string

  @IsNotEmpty()
  public merchant: string

  @ValidateNested()
  public commission?: Commission
}
