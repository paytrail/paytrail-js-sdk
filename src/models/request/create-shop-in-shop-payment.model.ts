import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator'
import { ShopInShopItem } from './request-model/shop-in-shop-item.model'
import { Customer } from './request-model/customer.model'
import { Address } from './request-model/address.model'
import { CallbackUrl } from './request-model/callback-url.model'
import { PaymentMethodGroup } from './request-model/payment-method-group.model'

export class CreateSiSPaymentRequest {
  @IsNotEmpty()
  @IsString()
  public stamp?: string

  @IsNotEmpty()
  @IsString()
  public reference?: string

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public amount?: number

  @IsNotEmpty()
  @IsString()
  public currency?: string

  @IsNotEmpty()
  @IsString()
  public language?: string

  @IsString()
  @IsOptional()
  public orderId?: string

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  public items?: ShopInShopItem[]

  @IsNotEmpty()
  @ValidateNested()
  public customer?: Customer

  @IsOptional()
  @ValidateNested()
  public deliveryAddress?: Address

  @IsOptional()
  @ValidateNested()
  public invoicingAddress?: Address

  @IsOptional()
  @IsBoolean()
  public manualInvoiceActivation?: boolean

  @IsNotEmpty()
  @ValidateNested()
  public redirectUrls?: CallbackUrl

  @IsOptional()
  @ValidateNested()
  public callbackUrls?: CallbackUrl

  @IsOptional()
  @IsNumber()
  public callbackDelay?: number

  @IsOptional()
  @IsArray()
  public groups?: PaymentMethodGroup[]

  @IsOptional()
  @IsBoolean()
  public usePricesWithoutVat?: boolean
}
