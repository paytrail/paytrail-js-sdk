import { Configuration } from './configuration'
import { responseMessage, responseStatus } from './constants/message-response.constant'
import { Signature } from './utils/signature.util'

export abstract class Paytrail {
  protected merchantId?: string
  protected secretKey?: string
  protected platformName?: string

  constructor(param: Configuration) {
    this.merchantId = param.merchantId
    this.secretKey = param.secretKey
    this.platformName = param.platformName
  }

  public abstract validateHmac(
    hparams: { [key: string]: string },
    body: { [key: string]: string | number | object } | '',
    signature: string,
    secretKey: string,
    encType: string
  ): boolean

  protected getHeaders(
    method: string,
    transactionId = '',
    checkoutTokenizationId = '',
    body: { [key: string]: string | number | object } | '' | object = ''
  ): { [key: string]: string } {
    const currentDate = new Date().toISOString()

    // Header for calculation HMAC
    const headers: { [key: string]: string } = {
      'checkout-account': this.merchantId,
      'checkout-algorithm': 'sha256',
      'checkout-method': method.toUpperCase(),
      'checkout-nonce': Signature.encodeMD5(currentDate),
      'checkout-timestamp': currentDate
    }

    if (transactionId) {
      headers['checkout-transaction-id'] = transactionId
    }

    if (checkoutTokenizationId) {
      headers['checkout-tokenization-id'] = checkoutTokenizationId
    }

    // Caculation HMAC
    const hmac = Signature.calculateHmac(this.secretKey, headers, body, 'sha256')

    if (hmac) headers['signature'] = hmac

    headers['platform-name'] = this.platformName

    return headers
  }

  public handleResponse<T>(
    type: string,
    targetClass: any,
    data?: any,
    dataError?: { message: string | boolean; status: number }
  ): T {
    const instance = new targetClass()
    switch (type) {
      case responseMessage.SUCCESS:
        instance.message = responseMessage.SUCCESS
        instance.status = responseStatus.SUCCESS
        instance.data = data
        break
      case responseMessage.VALIDATE_FAIL:
        instance.message = dataError?.message
        instance.status = dataError?.status
        break
      case responseMessage.SIGNATURE_NULL:
        instance.message = dataError?.message
        instance.status = dataError?.status
        break
      case responseMessage.EXCEPTION:
        instance.message = dataError?.message
        instance.status = dataError?.status
        break
      case responseMessage.UNAUTHORIZED:
        instance.message = dataError?.message
        instance.status = dataError?.status
        break
      default:
        instance.message = responseMessage.SERVER_ERROR
        instance.status = responseStatus.SERVER_ERROR
    }

    return instance as T
  }
}
