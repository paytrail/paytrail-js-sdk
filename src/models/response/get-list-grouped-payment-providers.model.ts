import { PaymentMethodGroupDataWithProviders } from './response-model/payment-method-group-data-with-providers.model'
import { Provider } from './response-model/provider.model'

export class ListGroupedProvidersResponse {
  public terms: string = ''
  public groups: PaymentMethodGroupDataWithProviders[] = []
  public providers: Provider[] = []
}
