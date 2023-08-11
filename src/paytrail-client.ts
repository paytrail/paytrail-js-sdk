import { Configuration } from './configuration'
import { API_ENDPOINT } from './constants/variable.constant'
import { IPaytrail } from './interfaces/IPayTrail.interface'

import { Paytrail } from './paytrail'
import { Signature } from './utils/signature.util'

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
}
