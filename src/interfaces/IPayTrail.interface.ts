import {
  AddCardFormRequest,
  AddCardFormResponse,
  CreateCitPaymentParams,
  CreateCitPaymentRequest,
  CreateCitPaymentResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  CreateRefundParams,
  CreateRefundRequest,
  CreateRefundResponse,
  CreateSiSPaymentRequest,
  CreateSiSPaymentResponse,
  EmailRefundParams,
  EmailRefundRequest,
  EmailRefundResponse,
  GetPaymentStatusRequest,
  GetPaymentStatusResponse,
  GetTokenRequest,
  GetTokenResponse,
  ListGroupedProvidersRequest,
  ListGroupedProvidersResponse,
  MitPaymentParams,
  MitPaymentRequest,
  MitPaymentResponse,
  PaymentReportRequest,
  PaymentReportResponse,
  RevertPaymentAuthHoldRequest,
  RevertPaymentAuthHoldResponse,
  SettlementsRequest,
  SettlementsResponse
} from '../models'

export interface IPaytrail {
  /**
   *
   * @summary HTTP GET /merchants/grouped-payment-providers is similar to the List providers-endpoint,
   *          but in addition of returning a flat list of providers,
   *          it returns payment group data containing localized group names, icons for the groups and grouped providers.
   *          Returns also a localized text with a link to the terms of payment.
   * @param {ListGroupedProvidersRequest} listGroupedProvidersRequest
   * @see https://docs.paytrail.com/#/?id=list-grouped-providers
   * @throws Error
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
   * @see https://docs.paytrail.com/#/?id=create
   * @throws Error
   */
  createPayment(createPaymentResquest: CreatePaymentRequest): Promise<CreatePaymentResponse>

  /**
   *
   * @summary Create a shop-in-shop payment request.
   * @param {CreateSiSPaymentRequest} createSiSPaymentResquest
   * @see https://docs.paytrail.com/#/?id=create
   * @throws Error
   */
  createShopInShopPayment(createSiSPaymentResquest: CreateSiSPaymentRequest): Promise<CreateSiSPaymentResponse>

  /**
   *
   * @summary HTTP GET /payments/{transactionId} returns payment information.
   *          Get transaction info. Payments are reported primarily via callbacks, and implementations should mainly rely on receiving the info via them. All received payments will be eventually reported.
   *           Note! The transaction id needs to be sent on checkout-transaction-id header as well.
   * @param {GetPaymentStatusRequest} getPaymentStatusRequest
   * @see https://docs.paytrail.com/#/?id=get
   * @throws Error
   */
  getPaymentStatus(getPaymentStatusRequest: GetPaymentStatusRequest): Promise<GetPaymentStatusResponse>

  /**
   *
   * @summary HTTP POST /payments/{transactionId}/refund refunds a payment by transaction ID.
   * @param {CreateRefundParams} createRefundParams
   * @param {CreateRefundRequest} createRefundRequest
   * @see https://docs.paytrail.com/#/?id=refund
   * @throws Error
   */
  createRefund(
    createRefundParams: CreateRefundParams,
    createRefundRequest: CreateRefundRequest
  ): Promise<CreateRefundResponse>

  /**
   *
   * @summary HTTP POST /payments/{transactionId}/refund/email email refunds a payment by transaction ID.
   * @param {EmailRefundParams} emailRefundParams
   * @param {EmailRefundRequest} emailRefundRequest
   * @see https://docs.paytrail.com/#/?id=email-refunds
   * @throws Error
   */
  emailRefund(
    emailRefundParams: EmailRefundParams,
    emailRefundRequest: EmailRefundRequest
  ): Promise<EmailRefundResponse>

  /**
   *
   * @summary HTTP POST /payments/report results in a callback containing the payment report.
   * @param {PaymentReportRequest} paymentReportRequest
   * @see https://docs.paytrail.com/#/?id=email-refunds
   * @throws Error
   */
  paymentReportRequest(paymentReportRequest: PaymentReportRequest): Promise<PaymentReportResponse>

  /**
   *
   * @summary HTTP GET /settlements returns merchant's settlement IDs and corresponding bank references.
   *          Maximum of 100 settlement IDs are returned, starting from the most recent settelements
   * @param {SettlementsRequest} settlementsRequest
   * @see https://docs.paytrail.com/#/?id=settlements
   * @throws Error
   */
  requestSettlements(settlementsRequest: SettlementsRequest): Promise<SettlementsResponse>

  /**
   *
   * @summary HTTP POST /tokenization/{checkout-tokenization-id} is requested after the merchant has received a checkout-tokenization-id
   *          from the success redirect URL parameters, or the callback URL request if given.
   * @param {GetTokenRequest} getTokenRequest
   * @see https://docs.paytrail.com/#/?id=get-token
   * @throws Error
   */
  createGetTokenRequest(getTokenRequest: GetTokenRequest): Promise<GetTokenResponse>

  /**
   *
   * @summary HTTP POST /payments/token/{mit|cit}/{authorization-hold|charge} creates either an authorization hold or direct charge for MIT and CIT payments.
   * @param {MitPaymentRequest} mitPaymentRequest
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  createMitPaymentCharge(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse>

  /**
   *
   * @summary HTTP POST /payments/token/{mit|cit}/{authorization-hold|charge} creates either an authorization hold or direct charge for MIT and CIT payments.
   * @param {MitPaymentRequest} mitPaymentRequest
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  createMitPaymentAuthorizationHold(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse>

  /**
   *
   * @summary HTTP POST /payments/token/{mit|cit}/{authorization-hold|charge} creates either an authorization hold or direct charge for MIT and CIT payments.
   * @param {CreateCitPaymentRequest} createCitPaymentRequest
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  createCitPaymentCharge(createCitPaymentRequest: CreateCitPaymentRequest): Promise<CreateCitPaymentResponse>

  /**
   *
   * @summary HTTP POST /payments/token/{mit|cit}/{authorization-hold|charge} creates either an authorization hold or direct charge for MIT and CIT payments.
   * @param {CreateCitPaymentRequest} createCitPaymentRequest
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  createCitPaymentAuthorizationHold(createCitPaymentRequest: CreateCitPaymentRequest): Promise<CreateCitPaymentResponse>

  /**
   *
   * @summary HTTP POST /payments/{transactionId}/token/commit commits an existing authorization hold.
   *          A successful commit will charge the payer's card.
   * @param {MitPaymentRequest} mitPaymentRequest
   * @param {MitPaymentParams} mitPaymentParams
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  createMitPaymentCommit(
    mitPaymentParams: MitPaymentParams,
    mitPaymentRequest: MitPaymentRequest
  ): Promise<MitPaymentResponse>

  /**
   *
   * @summary HTTP POST /payments/{transactionId}/token/commit commits an existing authorization hold.
   *          A successful commit will charge the payer's card.
   * @param {CreateCitPaymentRequest} mitPaymentRequest
   * @param {CreateCitPaymentParams} citPaymentParams
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  createCitPaymentCommit(
    citPaymentParams: CreateCitPaymentParams,
    citPaymentRequest: CreateCitPaymentRequest
  ): Promise<CreateCitPaymentResponse>

  /**
   *
   * @summary HTTP POST /payments/{transactionId}/token/revert reverts an existing authorization hold.
   *          A successful revert will remove the authorization hold from the payer's card.
   * @param {RevertPaymentAuthHoldRequest} revertPaymentAuthHoldRequest
   * @see https://docs.paytrail.com/#/?id=charging-a-token
   * @throws Error
   */
  revertPaymentAuthorizationHold(
    revertPaymentAuthHoldRequest: RevertPaymentAuthHoldRequest
  ): Promise<RevertPaymentAuthHoldResponse>

  /**
   *
   * @summary HTTP POST /tokenization/addcard-form is a form post requested from the user's browser.
   *          On a successful request the user will be redirected to Paytrail's card addition service
   *          where user will input credit card information.
   * @param {AddCardFormRequest} addCardFormRequest
   * @see https://docs.paytrail.com/#/?id=add-card-form
   * @throws Error
   */
  createAddCardFormRequest(addCardFormRequest: AddCardFormRequest): Promise<AddCardFormResponse>
}
