import { Configuration } from '../src/configuration'
import { PaytrailClient } from '../src/paytrail-client'
import { Signature } from '../src/utils/signature.util'

describe('hmac', () => {
  const secretKey = 'SAIPPUAKAUPPIAS'

  const headers = {
    'checkout-account': '375917',
    'checkout-method': 'GET',
    'checkout-algorithm': 'sha256',
    'checkout-timestamp': '2018-07-05T11:19:25.950Z',
    'checkout-nonce': '123456'
  }

  it('validate hmac with body empty', async () => {
    const configuration = new Configuration({})
    const client = new PaytrailClient(configuration)

    const body = ''

    const hmac = Signature.calculateHmac(secretKey, headers, body)
    const isMatch = client.validateHmac(headers, body, hmac, secretKey)

    expect(hmac).toEqual('e2070810cb0d8795534cf0c2b983a3dee0858990cd073869ce23437c59f98776')
    expect(true).toEqual(isMatch)
  })

  it('validate hmac with body not empty', async () => {
    const configuration = new Configuration({})
    const client = new PaytrailClient(configuration)

    const body = {
      data: 'test'
    }

    const hmac = Signature.calculateHmac(secretKey, headers, body)
    const isMatch = client.validateHmac(headers, body, hmac, secretKey, 'sha256')

    expect(hmac).toEqual('73b1e55ebcf42dab90507f7dd53cddb7d2076ebcc61f67f27c9b9f4c94471a67')
    expect(true).toEqual(isMatch)
  })
})
