import axios from 'axios'
import { API_ENDPOINT } from '../constants/variable.constant'
import {
  CreatePaymentRequest,
  CreateRefundParams,
  CreateRefundRequest,
  CreateSiSPaymentRequest,
  EmailRefundParams,
  EmailRefundRequest,
  GetPaymentStatusRequest,
  ListGroupedProvidersRequest
} from '../models'
import { handleRequest } from './handle-request.util'

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
  listGroupedProviders: (payload: ListGroupedProvidersRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.get(`${apiEndpoint}/merchants/grouped-payment-providers?${convertQuery(payload)}`, headers))
}

// Execute Paytrail API
const payments = {
  create: (payload: CreatePaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments`, payload, headers)),
  createSiSPayment: (payload: CreateSiSPaymentRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments`, payload, headers)),
  getPaymentStatus: (payload: GetPaymentStatusRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.get(`${apiEndpoint}/payments/${payload.transactionId}`, headers)),
  createRefund: (params: CreateRefundParams, payload: CreateRefundRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund`, payload, headers)),
  emailRefunds: (params: EmailRefundParams, payload: EmailRefundRequest, headers: { [key: string]: string }) =>
    handleRequest(requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund/email`, payload, headers))
}

export const api = {
  merchants,
  payments
}
