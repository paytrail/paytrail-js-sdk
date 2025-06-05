import axios, { AxiosResponse } from 'axios'
import { API_ENDPOINT } from '../constants/variable.constant'
import {
  AddCardFormRequest,
  AddCardFormResponse,
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

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  return config
})

export const requests = {
  get: async (url: string, headers: { [key: string]: string | number }) => {
    return axios({
      method: 'get',
      url,
      headers
    }).then((res) => res.data)
  },
  post: async (url: string, body: object, headers?: { [key: string]: string | number }) => {
    if (headers) {
      return axios({
        method: 'post',
        url,
        headers,
        data: body
      }).then((res) => res.data)
    }

    return axios({
      method: 'post',
      url,
      data: body
    }).then((res) => res.data)
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
  createAddCardFormRequest: async (payload: AddCardFormRequest): Promise<AddCardFormResponse> => {
    const [err, res] = await handleRequest(
      axios({
        method: 'post',
        url: `${apiEndpoint}/tokenization/addcard-form`,
        data: convertObjectKeys(payload),
        maxRedirects: 0,
        validateStatus: (status: number) => status >= 200 && status < 400
      })
    )

    if (err) {
      // If the error has a response and status, throw an object with status for test compatibility
      if (err && err.response && err.response.status) {
        throw { status: err.response.status, message: err.response.data?.message || err.message }
      }
      throw err
    }

    // Get the redirect URL from the response headers or data
    // Check if res is an AxiosResponse or a plain object
    let redirectUrl: string | undefined = undefined
    if (
      res &&
      typeof res === 'object' &&
      'headers' in res &&
      res.headers &&
      res.headers.redirects &&
      res.headers.redirects.redirectUrl
    ) {
      redirectUrl = res.headers.redirects.redirectUrl
    } else if (
      res &&
      typeof res === 'object' &&
      'headers' in res &&
      res.headers &&
      (res as AxiosResponse).headers.location
    ) {
      redirectUrl = (res as AxiosResponse).headers.location
    } else if (typeof res === 'string') {
      // Extract URL from HTML anchor tag
      const match = (res as string).match(/href=["']([^"']+)["']/)
      if (match) {
        redirectUrl = match[1]
      }
    } else if (res && typeof res === 'object' && res.data && typeof res.data.redirectUrl === 'string') {
      // Fallback: check for data.redirectUrl property
      redirectUrl = res.data.redirectUrl
    }

    // If redirectUrl is missing, undefined, or not a valid string, treat as error
    if (!redirectUrl || typeof redirectUrl !== 'string' || redirectUrl.trim() === '') {
      throw { status: 500, message: 'Missing or invalid redirectUrl in response' }
    }
    // Return only the redirectUrl object, let handleResponse wrap it
    return { data: { redirectUrl }, message: 'Success', status: 200 }
  }
}

export const api = {
  merchants,
  payments,
  paymentReports,
  settlements,
  tokenPayments
}
