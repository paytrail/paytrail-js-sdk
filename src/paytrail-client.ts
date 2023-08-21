import { Configuration } from './configuration'
import { API_ENDPOINT, METHOD } from './constants/variable.constant'
import { RequestException, ValidateException } from './exceptions/exception'
import { IPaytrail } from './interfaces/IPayTrail.interface'
import { ListGroupedProvidersRequest, ListGroupedProvidersResponse } from './models'
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
      // Create headers
      const headers = this.getHeaders(METHOD.GET)

      // Validate payload
      const validate = convertObjectToClass(listGroupedProvidersRequest, ListGroupedProvidersRequest)
      const [errorValidate, isSuccess] = await validateError(validate)

      if (errorValidate) {
        throw new ValidateException(JSON.stringify(errorValidate), 400)
      }

      // Execute to Paytrail API
      const [error, res] = await api.merchants.listGroupedProviders(listGroupedProvidersRequest, headers)

      if (error) {
        throw new RequestException(error?.response?.data?.message, error?.response?.status)
      }

      const data = res?.data

      return data as ListGroupedProvidersResponse
    } catch (error) {
      throw new Error(error?.message)
    }
  }
}
