import { API_ENDPOINT, METHOD } from './constants/variable.constant'
import { IPaytrail } from './interfaces/IPayTrail.interface'
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
} from './models'
import { Paytrail } from './paytrail'
import { api } from './utils/axios.util'
import { convertObjectToClass } from './utils/convert-object-to-class.utils'
import { Signature } from './utils/signature.util'
import { validateError } from './utils/validate-error.utils'

export class PaytrailClient extends Paytrail implements IPaytrail {
  public API_ENDPOINT: string = API_ENDPOINT

  public validateHmac(
    hparams: { [key: string]: string },
    body: { [key: string]: string | number | object } | '',
    signature: string,
    secretKey: string,
    encType?: string
  ): boolean {
    return Signature.validateHmac(hparams, body, signature, secretKey, encType)
  }

  public async listGroupedProviders(
    listGroupedProvidersRequest: ListGroupedProvidersRequest
  ): Promise<ListGroupedProvidersResponse> {
    try {
      const headers = this.getHeaders(METHOD.GET)

      return await this.callApi<ListGroupedProvidersResponse>(
        () => api.merchants.listGroupedProviders(listGroupedProvidersRequest, headers),
        ListGroupedProvidersResponse,
        null,
        null,
        () => validateError(convertObjectToClass(listGroupedProvidersRequest, ListGroupedProvidersRequest))
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createPayment(createPaymentRequest: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, createPaymentRequest)

      return await this.callApi<CreatePaymentResponse>(
        () => api.payments.create(createPaymentRequest, headers),
        CreatePaymentResponse,
        () => validateError(convertObjectToClass(createPaymentRequest, CreatePaymentRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createShopInShopPayment(
    createSiSPaymentResquest: CreateSiSPaymentRequest
  ): Promise<CreateSiSPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, createSiSPaymentResquest)

      return await this.callApi<CreateSiSPaymentResponse>(
        () => api.payments.createSiSPayment(createSiSPaymentResquest, headers),
        CreateSiSPaymentResponse,
        () => validateError(convertObjectToClass(createSiSPaymentResquest, CreateSiSPaymentRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async getPaymentStatus(getPaymentStatusRequest: GetPaymentStatusRequest): Promise<GetPaymentStatusResponse> {
    try {
      const headers = this.getHeaders(METHOD.GET, getPaymentStatusRequest.transactionId)

      return await this.callApi<GetPaymentStatusResponse>(
        () => api.payments.getPaymentStatus(getPaymentStatusRequest, headers),
        GetPaymentStatusResponse,
        null,
        () => validateError(convertObjectToClass(getPaymentStatusRequest, GetPaymentStatusRequest)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createRefund(
    createRefundParams: CreateRefundParams,
    createRefundRequest: CreateRefundRequest
  ): Promise<CreateRefundResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, createRefundParams.transactionId, null, createRefundRequest)

      return await this.callApi<CreateRefundResponse>(
        () => api.payments.createRefund(createRefundParams, createRefundRequest, headers),
        CreateRefundResponse,
        () => validateError(convertObjectToClass(createRefundRequest, CreateRefundRequest)),
        () => validateError(convertObjectToClass(createRefundParams, CreateRefundParams)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async emailRefund(
    emailRefundParams: EmailRefundParams,
    emailRefundRequest: EmailRefundRequest
  ): Promise<EmailRefundResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, emailRefundParams.transactionId, null, emailRefundRequest)

      return await this.callApi<EmailRefundResponse>(
        () => api.payments.emailRefunds(emailRefundParams, emailRefundRequest, headers),
        EmailRefundResponse,
        () => validateError(convertObjectToClass(emailRefundRequest, EmailRefundRequest)),
        () => validateError(convertObjectToClass(emailRefundParams, EmailRefundParams)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async paymentReportRequest(paymentReportRequest: PaymentReportRequest): Promise<PaymentReportResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, paymentReportRequest)

      return await this.callApi<PaymentReportResponse>(
        () => api.paymentReports.paymentReportRequest(paymentReportRequest, headers),
        PaymentReportResponse,
        null,
        () => validateError(convertObjectToClass(paymentReportRequest, PaymentReportRequest)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async requestSettlements(settlementsRequest: SettlementsRequest): Promise<SettlementsResponse> {
    try {
      const headers = this.getHeaders(METHOD.GET)

      return await this.callApi<SettlementsResponse>(
        () => api.settlements.get(settlementsRequest, headers),
        SettlementsResponse,
        null,
        () => validateError(convertObjectToClass(settlementsRequest, SettlementsRequest)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createGetTokenRequest(getTokenRequest: GetTokenRequest): Promise<GetTokenResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, getTokenRequest.checkoutTokenizationId, {})

      return await this.callApi<GetTokenResponse>(
        () => api.tokenPayments.createGetToken(getTokenRequest, headers),
        GetTokenResponse,
        () => validateError(convertObjectToClass(getTokenRequest, GetTokenRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createMitPaymentCharge(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, mitPaymentRequest)

      return await this.callApi<MitPaymentResponse>(
        () => api.tokenPayments.createMitPayment(mitPaymentRequest, headers),
        MitPaymentResponse,
        () => validateError(convertObjectToClass(mitPaymentRequest, MitPaymentRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createMitPaymentAuthorizationHold(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, mitPaymentRequest)

      return await this.callApi<MitPaymentResponse>(
        () => api.tokenPayments.createMitPaymentAuthorizationHold(mitPaymentRequest, headers),
        MitPaymentResponse,
        () => validateError(convertObjectToClass(mitPaymentRequest, MitPaymentRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createCitPaymentCharge(
    createCitPaymentRequest: CreateCitPaymentRequest
  ): Promise<CreateCitPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, createCitPaymentRequest)

      return await this.callApi<CreateCitPaymentResponse>(
        () => api.tokenPayments.createCitPaymentCharge(createCitPaymentRequest, headers),
        CreateCitPaymentResponse,
        () => validateError(convertObjectToClass(createCitPaymentRequest, CreateCitPaymentRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createCitPaymentAuthorizationHold(
    createCitPaymentRequest: CreateCitPaymentRequest
  ): Promise<CreateCitPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, null, null, createCitPaymentRequest)

      return await this.callApi<CreateCitPaymentResponse>(
        () => api.tokenPayments.createCitPaymentAuthorizationHold(createCitPaymentRequest, headers),
        CreateCitPaymentResponse,
        () => validateError(convertObjectToClass(createCitPaymentRequest, CreateCitPaymentRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createMitPaymentCommit(
    mitPaymentParams: MitPaymentParams,
    mitPaymentRequest: MitPaymentRequest
  ): Promise<MitPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, mitPaymentParams.transactionId, null, mitPaymentRequest)

      return await this.callApi<MitPaymentResponse>(
        () => api.tokenPayments.createMitOrCitPaymentCommit(mitPaymentParams, mitPaymentRequest, headers),
        MitPaymentResponse,
        () => validateError(convertObjectToClass(mitPaymentRequest, MitPaymentRequest)),
        () => validateError(convertObjectToClass(mitPaymentParams, MitPaymentParams)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createCitPaymentCommit(
    citPaymentParams: CreateCitPaymentParams,
    citPaymentRequest: CreateCitPaymentRequest
  ): Promise<CreateCitPaymentResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, citPaymentParams.transactionId, null, citPaymentRequest)

      return await this.callApi<CreateCitPaymentResponse>(
        () => api.tokenPayments.createMitOrCitPaymentCommit(citPaymentParams, citPaymentRequest, headers),
        CreateCitPaymentResponse,
        () => validateError(convertObjectToClass(citPaymentRequest, CreateCitPaymentRequest)),
        () => validateError(convertObjectToClass(citPaymentParams, CreateCitPaymentParams)),
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async revertPaymentAuthorizationHold(
    revertPaymentAuthHoldRequest: RevertPaymentAuthHoldRequest
  ): Promise<RevertPaymentAuthHoldResponse> {
    try {
      const headers = this.getHeaders(METHOD.POST, revertPaymentAuthHoldRequest.transactionId, null, {})

      return await this.callApi<RevertPaymentAuthHoldResponse>(
        () => api.tokenPayments.revertPaymentAuthorizationHold(revertPaymentAuthHoldRequest, headers),
        RevertPaymentAuthHoldResponse,
        () => validateError(convertObjectToClass(revertPaymentAuthHoldRequest, RevertPaymentAuthHoldRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createAddCardFormRequest(addCardFormRequest: AddCardFormRequest): Promise<AddCardFormResponse> {
    try {
      return await this.callApi<AddCardFormResponse>(
        () => api.tokenPayments.createAddCardFormRequest(addCardFormRequest),
        AddCardFormResponse,
        () => validateError(convertObjectToClass(addCardFormRequest, AddCardFormRequest)),
        null,
        null
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }
}
