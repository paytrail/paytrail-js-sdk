import * as crypto from 'crypto'
import { responseStatus } from './constants/message-response.constant'
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
import { api, createSignature } from './utils/axios.util'
import { convertObjectKeys } from './utils/convert-object-keys.util'
import { convertObjectToClass } from './utils/convert-object-to-class.utils'
import { Signature } from './utils/signature.util'
import { validateError } from './utils/validate-error.utils'


export class PaytrailClient {
  private merchantId: number
  private secretKey: string
  private platformName: string

  constructor(config: any) {
    this.merchantId = config.merchantId
    this.secretKey = config.secretKey
    this.platformName = config.platformName
  }

  async createAddCardFormRequest(data: any) {
    const nonce = crypto.randomBytes(16).toString('hex')
    const timestamp = new Date().toISOString()

    const body = JSON.stringify({
      'checkout-redirect-success-url': data.checkoutRedirectSuccessUrl,
      'checkout-redirect-cancel-url': data.checkoutRedirectCancelUrl,
      language: data.language
    })

    const headers: any = {
      'checkout-account': this.merchantId.toString(),
      'checkout-algorithm': 'sha256',
      'checkout-method': 'POST',
      'checkout-nonce': nonce,
      'checkout-timestamp': timestamp,
      'platform-name': this.platformName,
      'content-type': 'application/json'
    }

    // 🔥 SIGNATURE GENERATED PER REQUEST
    headers.signature = createSignature(
      'POST',
      '/tokenization/addcard-form',
      body,
      headers,
      this.secretKey
    )

    return api.tokenPayments.createAddCardFormRequest(body, headers)
  }
}

