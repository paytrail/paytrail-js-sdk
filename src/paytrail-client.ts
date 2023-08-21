import { Configuration } from './configuration'
import { responseMessage, responseStatus } from './constants/message-response.constant'
import { API_ENDPOINT, METHOD } from './constants/variable.constant'
import { IPaytrail } from './interfaces/IPayTrail.interface'
import {
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
  MitPaymentRequest,
  MitPaymentResponse,
  PaymentReportRequest,
  PaymentReportResponse,
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

  constructor(configuration: Configuration) {
    super(configuration)
  }

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

      // Validate payload
      const validate = convertObjectToClass(listGroupedProvidersRequest, ListGroupedProvidersRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<ListGroupedProvidersResponse>(
          responseMessage.VALIDATE_FAIL,
          ListGroupedProvidersResponse,
          null,
          {
            message: errorValidate,
            status: responseStatus.VALIDATE_FAIL
          }
        )
      }

      // Execute to Paytrail API
      const [error, data] = await api.merchants.listGroupedProviders(listGroupedProvidersRequest, headers)

      if (error) {
        return this.handleResponse<ListGroupedProvidersResponse>(
          responseMessage.EXCEPTION,
          ListGroupedProvidersResponse,
          null,
          {
            message: error?.response?.data?.message || error?.response?.data?.message,
            status: error?.response?.status
          }
        )
      }

      return this.handleResponse<ListGroupedProvidersResponse>(
        responseMessage.SUCCESS,
        ListGroupedProvidersResponse,
        data
      )
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createPayment(createPaymentRequest: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', createPaymentRequest)

      // Validate payload
      const validate = convertObjectToClass(createPaymentRequest, CreatePaymentRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<CreatePaymentResponse>(responseMessage.VALIDATE_FAIL, CreatePaymentResponse, null, {
          message: errorValidate,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.payments.create(createPaymentRequest, headers)

      if (error) {
        return this.handleResponse<CreatePaymentResponse>(responseMessage.EXCEPTION, CreatePaymentResponse, null, {
          message: error?.response?.data?.message || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<CreatePaymentResponse>(responseMessage.SUCCESS, CreatePaymentResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createShopInShopPayment(
    createSiSPaymentResquest: CreateSiSPaymentRequest
  ): Promise<CreateSiSPaymentResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', createSiSPaymentResquest)

      // Validate payload
      const validate = convertObjectToClass(createSiSPaymentResquest, CreateSiSPaymentRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<CreateSiSPaymentResponse>(
          responseMessage.VALIDATE_FAIL,
          CreateSiSPaymentResponse,
          null,
          {
            message: errorValidate,
            status: responseStatus.VALIDATE_FAIL
          }
        )
      }

      // Execute to Paytrail API
      const [error, data] = await api.payments.createSiSPayment(createSiSPaymentResquest, headers)

      if (error) {
        return this.handleResponse<CreateSiSPaymentResponse>(
          responseMessage.EXCEPTION,
          CreateSiSPaymentResponse,
          null,
          {
            message: error?.response?.data?.message || error?.response?.data?.message,
            status: error?.response?.status
          }
        )
      }

      return this.handleResponse<CreateSiSPaymentResponse>(responseMessage.SUCCESS, CreateSiSPaymentResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async getPaymentStatus(getPaymentStatusRequest: GetPaymentStatusRequest): Promise<GetPaymentStatusResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.GET, getPaymentStatusRequest.transactionId)

      // Validate payload
      const validate = convertObjectToClass(getPaymentStatusRequest, GetPaymentStatusRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<GetPaymentStatusResponse>(
          responseMessage.VALIDATE_FAIL,
          GetPaymentStatusResponse,
          null,
          {
            message: errorValidate,
            status: responseStatus.VALIDATE_FAIL
          }
        )
      }

      // Execute to Paytrail API
      const [error, data] = await api.payments.getPaymentStatus(getPaymentStatusRequest, headers)

      if (error) {
        return this.handleResponse<GetPaymentStatusResponse>(
          responseMessage.EXCEPTION,
          GetPaymentStatusResponse,
          null,
          {
            message: error?.response?.data?.message || error?.response?.data?.message,
            status: error?.response?.status
          }
        )
      }

      return this.handleResponse<GetPaymentStatusResponse>(responseMessage.SUCCESS, GetPaymentStatusResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createRefund(
    createRefundParams: CreateRefundParams,
    createRefundRequest: CreateRefundRequest
  ): Promise<CreateRefundResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, createRefundParams.transactionId, '', createRefundRequest)

      // Validate payload
      const validateParam = convertObjectToClass(createRefundParams, CreateRefundParams)
      const [errorValidateParam, isSuccessParam] = await validateError(validateParam)

      const validatePayload = convertObjectToClass(createRefundParams, CreateRefundParams)
      const [errorValidatePayload, isSuccessPayload] = await validateError(validatePayload)

      if (errorValidateParam || errorValidatePayload) {
        let message = ''

        if (errorValidateParam) message += errorValidateParam
        if (errorValidatePayload) message += errorValidatePayload

        return this.handleResponse<CreateRefundResponse>(responseMessage.VALIDATE_FAIL, CreateRefundResponse, null, {
          message: message,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.payments.createRefund(createRefundParams, createRefundRequest, headers)

      if (error) {
        return this.handleResponse<CreateRefundResponse>(responseMessage.EXCEPTION, CreateRefundResponse, null, {
          message: error?.response?.data?.message || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<CreateRefundResponse>(responseMessage.SUCCESS, CreateRefundResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async emailRefund(
    emailRefundParams: EmailRefundParams,
    emailRefundRequest: EmailRefundRequest
  ): Promise<EmailRefundResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, emailRefundParams.transactionId, '', emailRefundRequest)

      // Validate payload
      const validateParam = convertObjectToClass(emailRefundParams, EmailRefundParams)
      const [errorValidateParam, isSuccessParam] = await validateError(validateParam)

      const validatePayload = convertObjectToClass(emailRefundRequest, EmailRefundRequest)
      const [errorValidatePayload, isSuccessPayload] = await validateError(validatePayload)

      if (errorValidateParam || errorValidatePayload) {
        let message = ''

        if (errorValidateParam) message += errorValidateParam
        if (errorValidatePayload) message += errorValidatePayload

        return this.handleResponse<EmailRefundResponse>(responseMessage.VALIDATE_FAIL, EmailRefundResponse, null, {
          message: message,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.payments.emailRefunds(emailRefundParams, emailRefundRequest, headers)

      if (error) {
        return this.handleResponse<EmailRefundResponse>(responseMessage.EXCEPTION, EmailRefundResponse, null, {
          message: error?.response?.data?.message || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<EmailRefundResponse>(responseMessage.SUCCESS, EmailRefundResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async paymentReportRequest(paymentReportRequest: PaymentReportRequest): Promise<PaymentReportResponse[]> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', paymentReportRequest)

      // Validate payload
      const validate = convertObjectToClass(paymentReportRequest, PaymentReportRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<PaymentReportResponse[]>(
          responseMessage.VALIDATE_FAIL,
          PaymentReportResponse,
          null,
          {
            message: errorValidate,
            status: responseStatus.VALIDATE_FAIL
          }
        )
      }

      // Execute to Paytrail API
      const [error, data] = await api.paymentReports.paymentReportRequest(paymentReportRequest, headers)

      if (error) {
        return this.handleResponse<PaymentReportResponse[]>(responseMessage.EXCEPTION, PaymentReportResponse, null, {
          message: error?.response?.data?.meta || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<PaymentReportResponse[]>(responseMessage.SUCCESS, PaymentReportResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async requestSettlements(settlementsRequest: SettlementsRequest): Promise<SettlementsResponse[]> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.GET)

      // Validate payload
      const validate = convertObjectToClass(settlementsRequest, SettlementsRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<SettlementsResponse[]>(responseMessage.VALIDATE_FAIL, SettlementsResponse, null, {
          message: errorValidate,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.settlements.get(settlementsRequest, headers)

      if (error) {
        return this.handleResponse<SettlementsResponse[]>(responseMessage.EXCEPTION, SettlementsResponse, null, {
          message: error?.response?.data?.meta || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<SettlementsResponse[]>(responseMessage.SUCCESS, SettlementsResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createGetTokenRequest(getTokenRequest: GetTokenRequest): Promise<GetTokenResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', getTokenRequest.checkoutTokenizationId, {})

      // Validate payload
      const validate = convertObjectToClass(getTokenRequest, GetTokenRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<GetTokenResponse>(responseMessage.VALIDATE_FAIL, GetTokenResponse, null, {
          message: errorValidate,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.tokenPayments.createGetToken(getTokenRequest, headers)

      if (error) {
        return this.handleResponse<GetTokenResponse>(responseMessage.EXCEPTION, GetTokenResponse, null, {
          message: error?.response?.data?.meta || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<GetTokenResponse>(responseMessage.SUCCESS, GetTokenResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createMitPaymentCharge(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', mitPaymentRequest)

      // Validate payload
      const validate = convertObjectToClass(mitPaymentRequest, MitPaymentRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<MitPaymentResponse>(responseMessage.VALIDATE_FAIL, MitPaymentResponse, null, {
          message: errorValidate,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.tokenPayments.createMitPayment(mitPaymentRequest, headers)

      if (error) {
        return this.handleResponse<MitPaymentResponse>(responseMessage.EXCEPTION, MitPaymentResponse, null, {
          message: error?.response?.data?.meta || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<MitPaymentResponse>(responseMessage.SUCCESS, MitPaymentResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createMitPaymentAuthorizationHold(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', mitPaymentRequest)

      // Validate payload
      const validate = convertObjectToClass(mitPaymentRequest, MitPaymentRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<MitPaymentResponse>(responseMessage.VALIDATE_FAIL, MitPaymentResponse, null, {
          message: errorValidate,
          status: responseStatus.VALIDATE_FAIL
        })
      }

      // Execute to Paytrail API
      const [error, data] = await api.tokenPayments.createMitPaymentAuthorizationHold(mitPaymentRequest, headers)

      if (error) {
        return this.handleResponse<MitPaymentResponse>(responseMessage.EXCEPTION, MitPaymentResponse, null, {
          message: error?.response?.data?.meta || error?.response?.data?.message,
          status: error?.response?.status
        })
      }

      return this.handleResponse<MitPaymentResponse>(responseMessage.SUCCESS, MitPaymentResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createCitPaymentCharge(
    createCitPaymentRequest: CreateCitPaymentRequest
  ): Promise<CreateCitPaymentResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', createCitPaymentRequest)

      // Validate payload
      const validate = convertObjectToClass(createCitPaymentRequest, CreateCitPaymentRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<CreateCitPaymentResponse>(
          responseMessage.VALIDATE_FAIL,
          CreateCitPaymentResponse,
          null,
          {
            message: errorValidate,
            status: responseStatus.VALIDATE_FAIL
          }
        )
      }

      // Execute to Paytrail API
      const [error, data] = await api.tokenPayments.createCitPaymentCharge(createCitPaymentRequest, headers)

      if (error) {
        return this.handleResponse<CreateCitPaymentResponse>(
          responseMessage.EXCEPTION,
          CreateCitPaymentResponse,
          null,
          {
            message: error?.response?.data?.meta || error?.response?.data?.message,
            status: error?.response?.status
          }
        )
      }

      return this.handleResponse<CreateCitPaymentResponse>(responseMessage.SUCCESS, CreateCitPaymentResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }

  public async createCitPaymentAuthorizationHold(
    createCitPaymentRequest: CreateCitPaymentRequest
  ): Promise<CreateCitPaymentResponse> {
    try {
      // Create headers
      const headers = this.getHeaders(METHOD.POST, '', '', createCitPaymentRequest)

      // Validate payload
      const validate = convertObjectToClass(createCitPaymentRequest, CreateCitPaymentRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        return this.handleResponse<CreateCitPaymentResponse>(
          responseMessage.VALIDATE_FAIL,
          CreateCitPaymentResponse,
          null,
          {
            message: errorValidate,
            status: responseStatus.VALIDATE_FAIL
          }
        )
      }

      // Execute to Paytrail API
      const [error, data] = await api.tokenPayments.createCitPaymentAuthorizationHold(createCitPaymentRequest, headers)

      if (error) {
        return this.handleResponse<CreateCitPaymentResponse>(
          responseMessage.EXCEPTION,
          CreateCitPaymentResponse,
          null,
          {
            message: error?.response?.data?.meta || error?.response?.data?.message,
            status: error?.response?.status
          }
        )
      }

      return this.handleResponse<CreateCitPaymentResponse>(responseMessage.SUCCESS, CreateCitPaymentResponse, data)
    } catch (error) {
      throw new Error(error?.message)
    }
  }
}
