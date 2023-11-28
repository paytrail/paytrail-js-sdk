import { PaymentMethodGroup } from '../../request/request-model/payment-method-group.model'
import { Provider } from './provider.model'

/**
 * Class PaymentMethodGroupDataWithProviders
 */
export class PaymentMethodGroupDataWithProviders {
  /**
   * ID of the group.
   */
  public id: PaymentMethodGroup

  /**
   * Localized name of the group.
   */
  public name: string

  /**
   * URL to PNG version of the group icon.
   */
  public icon: string

  /**
   * URL to SVG version of the group icon. Using the SVG icon is preferred.
   */
  public svg: string

  /**
   * Providers for the payment group.
   */
  public providers: Provider[]
}
