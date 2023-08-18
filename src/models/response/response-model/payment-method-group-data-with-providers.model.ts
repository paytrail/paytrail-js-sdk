import { PaymentMethodGroup } from '../../request/request-model/payment-method-group.model'
import { Provider } from './provider.model'

export class PaymentMethodGroupDataWithProviders {
  public id?: PaymentMethodGroup
  public name?: string
  public icon?: string
  public svg?: string
  public providers?: Provider[]
}
