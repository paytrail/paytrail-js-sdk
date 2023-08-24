import { ApplePay } from './response-model/apple-pay.model'
import { PaymentMethodGroupData } from './response-model/payment-method-group-data.model'
import { Provider } from './response-model/provider.model'

export class CreatePaymentResponse {
  public transactionId: string
  public href: string
  public terms: string
  public groups: PaymentMethodGroupData[]
  public reference: string
  public providers: Provider[]
  public customProviders: ApplePay
}
