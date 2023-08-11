import * as crypto from 'crypto'
import { HmacException } from '../exceptions/exception'

export class Signature {
  private static supportedEnc: string[] = ['sha256', 'sha512']

  public static calculateHmac = (
    secret: string,
    hparams: { [key: string]: string },
    body: { [key: string]: string | number | object } | '' | object,
    encType = 'sha256'
  ) => {
    if (!this.supportedEnc.includes(encType)) {
      throw new HmacException('Not supported encryption', 400)
    }

    const hmacPayload = Object.keys(hparams)
      .sort()
      .map((key) => [key, hparams[key]].join(':'))
      .concat(body ? JSON.stringify(body) : '')
      .join('\n')

    return crypto.createHmac(encType, secret).update(hmacPayload).digest('hex')
  }

  public static validateHmac(
    hparams: { [key: string]: string },
    body: { [key: string]: string | number | object } | '',
    signature: string = '',
    secretKey: string = '',
    encType = 'sha256'
  ): boolean {
    try {
      const hmac = Signature.calculateHmac(secretKey, hparams, body, encType)
      return hmac === signature
    } catch (error) {
      throw new HmacException('HMAC signature is invalid.', 401)
    }
  }

  public static encodeMD5(data: string): string {
    return crypto.createHash('md5').update(data).digest('hex')
  }
}
