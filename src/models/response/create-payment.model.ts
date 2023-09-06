import { Response } from './response-model'
import { ApplePay } from './response-model/apple-pay.model'
import { PaymentMethodGroupData } from './response-model/payment-method-group-data.model'
import { Provider } from './response-model/provider.model'

/**
 * Class CreatePaymentResponse
 */
export class CreatePaymentResponse extends Response {
  /**
   * Data response.
   */
  data: CreatePaymentData
}

export class CreatePaymentData {
  /**
   * Assigned transaction ID for the payment.
   */
  public transactionId: string

  /**
   * URL to hosted payment gateway.
   */
  public href: string

  /**
   * Localized text with a link to the terms of payment.
   */
  public terms: string

  /**
   * Array of payment method group data with localized names and URLs to icons.
   */
  public groups: PaymentMethodGroupData[]

  /**
   * The bank reference used for the payments.
   */
  public reference: string

  /**
   * Array of providers.
   */
  public providers: Provider[]

  /**
   * Providers which require custom implementation.
   */
  public customProviders: ApplePay
}
