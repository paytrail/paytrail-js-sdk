import { Configuration } from './configuration'
import { responseMessage, responseStatus } from './constants/message-response.constant'
import { Signature } from './utils/signature.util'

export abstract class Paytrail {
  protected merchantId?: number
  protected secretKey?: string
  protected platformName?: string

  constructor(param: Configuration) {
    this.merchantId = param.merchantId
    this.secretKey = param.secretKey
    this.platformName = param.platformName
  }

  /**
   * Format request headers.
   *
   * @param {string} method - The request method. GET or POST.
   * @param {string | null} transactionId - Paytrail transaction ID when accessing a single transaction.
   *                                       Not required for a new payment request.
   * @param {string | null} checkoutTokenizationId - Paytrail tokenization ID for getToken request.
   * @param {Record<string, string | number | object> | ''} body - The request body.
   *
   * @returns {Record<string, string | number>} An object representing the request headers.
   */
  protected getHeaders(
    method: string,
    transactionId?: string | null,
    checkoutTokenizationId?: string | null,
    body: { [key: string]: string | number | object } | '' | object = ''
  ): { [key: string]: string | number } {
    const currentDate = new Date().toISOString()

    const headers: { [key: string]: string | number } = {
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

    const hmac = Signature.calculateHmac(this.secretKey, headers, body, 'sha256')

    if (hmac) headers['signature'] = hmac

    headers['platform-name'] = this.platformName

    return headers
  }

  /**
   * Handle API response and return an instance of the specified class.
   *
   * @param {string} type - The response type.
   * @param {T} targetClass - The target class to instantiate.
   * @param {any} data - The response data.
   * @param {{ message: string | boolean; status: number }} dataError - Error data.
   *
   * @returns {T} An instance of the specified class.
   */
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
      case responseMessage.SIGNATURE_NULL:
      case responseMessage.EXCEPTION:
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

  /**
   * Call an API, validate the response, and return an instance of the specified class.
   *
   * @param {() => Promise<any>} getData - A function that fetches data from the API.
   * @param {new () => T} targetClass - The target class to instantiate.
   * @param {() => Promise<any>} validateMessagePayload - A function to validate the message payload.
   * @param {() => Promise<any>} validateMessageParam - A function to validate message parameters.
   * @param {() => Promise<any>} validateMessageQuery - A function to validate message queries.
   *
   * @returns {Promise<T>} A promise that resolves to an instance of the specified class.
   */
  protected async callApi<T>(
    getData: () => Promise<any>,
    targetClass: new () => T,
    validateMessagePayload?: () => Promise<any>,
    validateMessageParam?: () => Promise<any>,
    validateMessageQuery?: () => Promise<any>
  ): Promise<T> {
    let message = ''

    if (validateMessagePayload) {
      const errorValidatePayload = await validateMessagePayload()

      if (errorValidatePayload) {
        message += errorValidatePayload
      }
    }

    if (validateMessageParam) {
      const errorValidateParam = await validateMessageParam()

      if (errorValidateParam) {
        message += errorValidateParam
      }
    }

    if (validateMessageQuery) {
      const errorValidateQuery = await validateMessageQuery()

      if (errorValidateQuery) {
        message += errorValidateQuery
      }
    }

    if (message) {
      return this.handleResponse<T>(responseMessage.VALIDATE_FAIL, targetClass, null, {
        message,
        status: responseStatus.VALIDATE_FAIL
      })
    }

    const [error, data] = await getData()

    if (error) {
      return this.handleResponse<T>(responseMessage.EXCEPTION, targetClass, null, {
        message: error?.response?.data?.meta || error?.response?.data?.message,
        status: error?.response?.status
      })
    }

    return this.handleResponse<T>(responseMessage.SUCCESS, targetClass, data)
  }
}
