import { API_ENDPOINT } from '../constants/variable.constant'
import {
  AddCardFormRequest,
  CreateCitPaymentParams,
  CreateCitPaymentRequest,
  CreatePaymentRequest,
  CreateRefundParams,
  CreateRefundRequest,
  CreateSiSPaymentRequest,
  EmailRefundParams,
  EmailRefundRequest,
  GetPaymentStatusRequest,
  GetTokenRequest,
  ListGroupedProvidersRequest,
  MitPaymentParams,
  MitPaymentRequest,
  RevertPaymentAuthHoldRequest,
  SettlementsRequest
} from '../models'
import { handleRequest } from './handle-request.util'
import { PaymentReportRequest } from '../models/request/payment-report-request.model'
import { convertObjectKeys } from './convert-object-keys.util'

const apiEndpoint = API_ENDPOINT

const buildHeaders = (extra?: { [key: string]: string | number }): Headers => {
  const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })

  if (extra) {
    for (const key of Object.keys(extra)) {
      headers.set(key, String(extra[key]))
    }
  }

  return headers
}

const readErrorBody = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    return response.json().catch(() => ({}))
  }

  await response.body?.cancel()
  return {}
}

export const requests = {
  get: async (url: string, headers: { [key: string]: string | number }) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: buildHeaders(headers)
    })
    if (!response.ok) {
      const errorData = await readErrorBody(response)
      const error: any = new Error(errorData?.message || response.statusText)
      error.response = { status: response.status, data: errorData }
      throw error
    }
    return response.json()
  },
  post: async (url: string, body: object, headers?: { [key: string]: string | number }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(headers),
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      const errorData = await readErrorBody(response)
      const error: any = new Error(errorData?.message || response.statusText)
      error.response = { status: response.status, data: errorData }
      throw error
    }
    return response.json()
  }
}

const convertQuery = (param: any): string => {
  return Object.keys(param)
    .map((key: string) => `${key}=${param[key]}`)
    .join('&')
}

const merchants = {
  listGroupedProviders: (query: ListGroupedProvidersRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.get(`${apiEndpoint}/merchants/grouped-payment-providers?${convertQuery(query)}`, headers))
}

const payments = {
  create: (payload: CreatePaymentRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments`, payload, headers)),
  createSiSPayment: (payload: CreateSiSPaymentRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments`, payload, headers)),
  getPaymentStatus: (param: GetPaymentStatusRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.get(`${apiEndpoint}/payments/${param.transactionId}`, headers)),
  createRefund: (
    params: CreateRefundParams,
    payload: CreateRefundRequest,
    headers: { [key: string]: string | number }
  ) => handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund`, payload, headers)),
  emailRefunds: (params: EmailRefundParams, payload: EmailRefundRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund/email`, payload, headers))
}

const paymentReports = {
  paymentReportRequest: (payload: PaymentReportRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/report`, payload, headers))
}

const settlements = {
  get: (query: SettlementsRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.get(`${apiEndpoint}/settlements?${convertQuery(query)}`, headers))
}

const createAddCardFormRequest = async (payload: AddCardFormRequest): Promise<any> => {
  const response = await fetch(`${apiEndpoint}/tokenization/addcard-form`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(convertObjectKeys(payload)),
    redirect: 'manual'
  })

  if (response.status >= 400) {
    const errorData = await response.json().catch(() => ({}))
    throw { status: response.status, message: errorData?.message || response.statusText }
  }

  const location = response.headers.get('location')
  if (location && location.trim() !== '') {
    return { data: { redirectUrl: location }, message: 'Success', status: 200 }
  }

  const data = await response.json().catch(() => null)
  if (data && typeof data.redirectUrl === 'string') {
    return { data: { redirectUrl: data.redirectUrl }, message: 'Success', status: 200 }
  }

  throw { status: 500, message: 'Missing or invalid redirectUrl in response' }
}

const tokenPayments = {
  createGetToken: (param: GetTokenRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/tokenization/${param.checkoutTokenizationId}`, {}, headers)),
  createMitPayment: (payload: MitPaymentRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/mit/charge`, payload, headers)),
  createMitPaymentAuthorizationHold: (payload: MitPaymentRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/mit/authorization-hold`, payload, headers)),
  createCitPaymentCharge: (payload: CreateCitPaymentRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/cit/charge`, payload, headers)),
  createCitPaymentAuthorizationHold: (payload: CreateCitPaymentRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/cit/authorization-hold`, payload, headers)),
  createMitOrCitPaymentCommit: (
    params: MitPaymentParams | CreateCitPaymentParams,
    payload: MitPaymentRequest | CreateCitPaymentRequest,
    headers: { [key: string]: string | number }
  ) => handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/token/commit`, payload, headers)),
  revertPaymentAuthorizationHold: (params: RevertPaymentAuthHoldRequest, headers: { [key: string]: string | number }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/token/revert`, {}, headers)),
  createAddCardFormRequest
}

export const api = {
  merchants,
  payments,
  paymentReports,
  settlements,
  tokenPayments
}
