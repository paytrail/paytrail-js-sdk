import { ListGroupedProvidersRequest } from '../models/request/get-list-grouped-payment-providers.model'
import { ListGroupedProvidersResponse } from '../models/response/get-list-grouped-payment-providers.model'

export interface IPaytrail {
  /**
   *
   * @summary HTTP GET /merchants/grouped-payment-providers is similar to the List providers-endpoint,
   *          but in addition of returning a flat list of providers,
   *          it returns payment group data containing localized group names, icons for the groups and grouped providers.
   *          Returns also a localized text with a link to the terms of payment.
   * @param {ListGroupedProvidersRequest} listGroupedProvidersRequest
   * @throws {ValidateException}
   * @throws {RequestException}
   * @throws {HmacException}
   * @see https://docs.paytrail.com/#/?id=list-grouped-providers
   */
  listGroupedProviders(listGroupedProvidersRequest: ListGroupedProvidersRequest): Promise<ListGroupedProvidersResponse>
}
