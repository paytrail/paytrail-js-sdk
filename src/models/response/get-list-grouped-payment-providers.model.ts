import { Response } from './response-model'
import { PaymentMethodGroupDataWithProviders } from './response-model/payment-method-group-data-with-providers.model'
import { Provider } from './response-model/provider.model'

export class ListGroupedProvidersResponse extends Response {
  data: ListGroupedProvidersData
}
export class ListGroupedProvidersData {
  public terms: string
  public groups: PaymentMethodGroupDataWithProviders[]
  public providers: Provider[]
}
