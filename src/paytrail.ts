import { Configuration } from './configuration'
import { ValidateException } from './exceptions/exception'
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

  protected validateRequestItem<T extends { validate(): [boolean, string] }>(item: T): boolean {
    const [isPassValidate, message] = item.validate()

    if (!isPassValidate) {
      throw new ValidateException(message, 400)
    }

    return true
  }
}
