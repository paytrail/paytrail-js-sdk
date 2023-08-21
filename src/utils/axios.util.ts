import axios from 'axios'
import { API_ENDPOINT } from '../constants/variable.constant'
import {
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
  MitPaymentRequest,
  SettlementsRequest
} from '../models'
import { handleRequest } from './handle-request.util'
import { PaymentReportRequest } from '../models/request/payment-report-request.model'

const apiEndpoint = API_ENDPOINT

// Config Axios
axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8'
  return config
})

export const requests = {
  get: async (url: string, headers: { [key: string]: string }) => {
    return axios({
      method: 'get',
      url,
      headers
    }).then((res) => res.data)
  },
  post: async (url: string, body: object, headers: { [key: string]: string }) => {
    return axios({
      method: 'post',
      url,
      headers,
      data: body
    }).then((res) => res.data)
  }
  // delete: async (url: string, headers: { [key: string]: string }) => {
  //   return axios({
  //     method: 'delete',
  //     url,
  //     headers
  //   }).then((res) => res.data)
  // },
  // put: async (url: string, body: object, headers: { [key: string]: string }) => {
  //   return axios({
  //     method: 'put',
  //     url,
  //     headers,
  //     data: body
  //   }).then((res) => res.data)
  // },
  // patch: async (url: string, body: object, headers: { [key: string]: string }) => {
  //   return axios({
  //     method: 'patch',
  //     url,
  //     headers,
  //     data: body
  //   }).then((res) => res.data)
  // }
}

const convertQuery = (param: any): string => {
  return Object.keys(param)
    .map((key: string) => `${key}=${param[key]}`)
    .join('&')
}

// Execute Paytrail API
const merchants = {
  listGroupedProviders: (query: ListGroupedProvidersRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.get(`${apiEndpoint}/merchants/grouped-payment-providers?${convertQuery(query)}`, headers))
}

// Execute Paytrail API
const payments = {
  create: (payload: CreatePaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments`, payload, headers)),
  createSiSPayment: (payload: CreateSiSPaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments`, payload, headers)),
  getPaymentStatus: (param: GetPaymentStatusRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.get(`${apiEndpoint}/payments/${param.transactionId}`, headers)),
  createRefund: (params: CreateRefundParams, payload: CreateRefundRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund`, payload, headers)),
  emailRefunds: (params: EmailRefundParams, payload: EmailRefundRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund/email`, payload, headers))
}

// Execute Paytrail API
const paymentReports = {
  paymentReportRequest: (payload: PaymentReportRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/report`, payload, headers))
}

// Execute Paytrail API
const settlements = {
  get: (query: SettlementsRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.get(`${apiEndpoint}/settlements?${convertQuery(query)}`, headers))
}

// Execute Paytrail API
const tokenPayments = {
  createGetToken: (param: GetTokenRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/tokenization/${param.checkoutTokenizationId}`, {}, headers)),
  createMitPayment: (payload: MitPaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/mit/charge`, payload, headers)),
  createMitPaymentAuthorizationHold: (payload: MitPaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/mit/authorization-hold`, payload, headers)),
  createCitPaymentCharge: (payload: CreateCitPaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/token/cit/charge`, payload, headers))
}

export const api = {
  merchants,
  payments,
  paymentReports,
  settlements,
  tokenPayments
}
