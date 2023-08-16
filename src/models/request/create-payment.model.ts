import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator'
import { Item } from './request-model/item.model'
import { Customer } from './request-model/customer.model'
import { Address } from './request-model/address.model'
import { CallbackUrl } from './request-model/callback-url.model'
import { PaymentMethodGroup } from './request-model/payment-method-group.model'

export class CreatePaymentRequest {
  @IsNotEmpty()
  @IsString()
  public stamp?: string

  @IsNotEmpty()
  @IsString()
  public reference?: string

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(99999999)
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  public items?: Item[]

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

  @ValidateNested()
  @IsNotEmpty()
  public redirectUrls?: CallbackUrl

  @IsOptional()
  @ValidateNested()
  public callbackUrls?: CallbackUrl

  @IsOptional()
  @IsNumber()
  public callbackDelay?: number

  @IsOptional()
  @IsArray()
  @ValidateNested()
  public groups?: PaymentMethodGroup[]

  @IsOptional()
  @IsBoolean()
  public usePricesWithoutVat?: boolean
}
