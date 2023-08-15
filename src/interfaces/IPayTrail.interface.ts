import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  CreateSiSPaymentRequest,
  CreateSiSPaymentResponse,
  GetPaymentStatusRequest,
  GetPaymentStatusResponse,
  ListGroupedProvidersRequest,
  ListGroupedProvidersResponse
} from '../models'
import { CreateRefundParams, CreateRefundRequest } from '../models/request/create-refund.model'
import { CreateRefundResponse } from '../models/response/create-refund.model'

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

  /**
   *
   * @summary HTTP GET /payments/{transactionId} returns payment information.
   *          Get transaction info. Payments are reported primarily via callbacks, and implementations should mainly rely on receiving the info via them. All received payments will be eventually reported.
   *           Note! The transaction id needs to be sent on checkout-transaction-id header as well.
   * @param {GetPaymentStatusRequest} getPaymentStatusRequest
   * @throws {ValidateException}
   * @throws {RequestException}
   * @throws {HmacException}
   * @see https://docs.paytrail.com/#/?id=get
   */
  getPaymentStatus(getPaymentStatusRequest: GetPaymentStatusRequest): Promise<GetPaymentStatusResponse>

  /**
   *
   * @summary HTTP POST /payments/{transactionId}/refund refunds a payment by transaction ID.
   * @param {CreateRefundParams} createRefundParams
   * @param {CreateRefundRequest} createRefundRequest
   * @throws {ValidateException}
   * @throws {RequestException}
   * @throws {HmacException}
   * @see https://docs.paytrail.com/#/?id=refund
   */
  createRefund(
    createRefundParams: CreateRefundParams,
    createRefundRequest: CreateRefundRequest
  ): Promise<CreateRefundResponse>
}
