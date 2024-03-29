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

/**
 * Class CreatePaymentRequest
 *
 * This class is used to create a payment request object
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=create-request-body
 */
export class CreatePaymentRequest {
  /**
   * Merchant unique identifier for the order.
   */
  @IsNotEmpty()
  @IsString()
  public stamp: string

  /**
   * Order reference.
   */
  @IsNotEmpty()
  @IsString()
  public reference: string

  /**
   * Total amount of the payment in currency's minor units,
   * eg. for Euros use cents. Must match the total sum of items.
   */
  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(99999999)
  public amount: number

  /**
   * Currency, only EUR supported at the moment.
   */
  @IsNotEmpty()
  @IsString()
  public currency: string

  /**
   * Payment's language, currently supported are FI, SV, and EN.
   */
  @IsNotEmpty()
  @IsString()
  public language: string

  /**
   * Order ID. Used for e.g. Walley/Collector payments order ID. If not given, merchant reference is used instead.
   */
  @IsString()
  @IsOptional()
  public orderId?: string

  /**
   * Array of items. Always required for Shop-in-Shop payments. Required if VAT calculations are wanted in settlement reports.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  public items?: Item[]

  /**
   * Customer information.
   */
  @IsNotEmpty()
  @ValidateNested()
  public customer: Customer

  /**
   * Delivery address.
   */
  @IsOptional()
  @ValidateNested()
  public deliveryAddress?: Address

  /**
   * Invoicing address.
   */
  @IsOptional()
  @ValidateNested()
  public invoicingAddress?: Address

  /**
   * If paid with invoice payment method, the invoice will not be activated automatically immediately.
   * Currently only supported with Walley/Collector.
   */
  @IsOptional()
  @IsBoolean()
  public manualInvoiceActivation?: boolean

  /**
   * Where to redirect browser after a payment is paid or cancelled.
   */
  @ValidateNested()
  @IsNotEmpty()
  public redirectUrls: CallbackUrl

  /**
   * Which url to ping after this payment is paid or cancelled.
   */
  @IsOptional()
  @ValidateNested()
  public callbackUrls?: CallbackUrl

  /**
   * Callback URL polling delay in seconds.
   */
  @IsOptional()
  @IsNumber()
  public callbackDelay?: number

  /**
   * Return only given groups.
   */
  @IsOptional()
  @IsArray()
  @ValidateNested()
  public groups?: PaymentMethodGroup[]

  /**
   * If true, amount and items.unitPrice should be sent to API not including VAT, and final amount is calculated by Paytrail's system using the items' unitPrice and vatPercentage (with amounts rounded to closest cent).
   */
  @IsOptional()
  @IsBoolean()
  public usePricesWithoutVat?: boolean
}
