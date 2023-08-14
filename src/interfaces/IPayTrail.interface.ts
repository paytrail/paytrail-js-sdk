import { CreateSiSPaymentRequest, CreateSiSPaymentResponse } from '../models'
import { CreatePaymentRequest } from '../models/request/create-payment.model'
import { ListGroupedProvidersRequest } from '../models/request/get-list-grouped-payment-providers.model'
import { CreatePaymentResponse } from '../models/response/create-payment.model'
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

  /**
   *
   * @summary HTTP POST /payments creates a new open payment and returns a JSON object that includes the available payment methods.
   *          The merchant web shop renders HTML forms from the response objects (see example).
   *          The client browser will submit the form to the payment method provider.
   *
   *          Once the payment has been completed the client browser will return to the merchant provided redirect URL.
   * @param {CreatePaymentRequest} createPaymentResquest
   * @throws {ValidateException}
   * @throws {RequestException}
   * @throws {HmacException}
   * @see https://docs.paytrail.com/#/?id=create
   */
  createPayment(createPaymentResquest: CreatePaymentRequest): Promise<CreatePaymentResponse>

  /**
   *
   * @summary Create a shop-in-shop payment request.
   * @param {CreateSiSPaymentRequest} createSiSPaymentResquest
   * @throws {ValidateException}
   * @throws {RequestException}
   * @throws {HmacException}
   * @see https://docs.paytrail.com/#/?id=create
   */
  createShopInShopPayment(createSiSPaymentResquest: CreateSiSPaymentRequest): Promise<CreateSiSPaymentResponse>
}
