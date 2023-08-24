import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('create-add-card-form', () => {
  let client: PaytrailClient

  beforeEach(() => {
    const mockConfiguration = {
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    }
    client = new PaytrailClient(mockConfiguration)
  })

  it('should return status 200', async () => {
    const data = await client.createAddCardFormRequest({
      checkoutAccount: 375917,
      checkoutAlgorithm: 'sha256',
      checkoutMethod: 'POST',
      checkoutNonce: '6501220b16b7',
      checkoutTimestamp: '2023-08-22T04:05:20.253Z',
      checkoutRedirectSuccessUrl: 'https://somedomain.com/success',
      checkoutRedirectCancelUrl: 'https://somedomain.com/cancel',
      signature: '542e780c253761ed64333d5485391ddd4f55d5e00b7bdc7f60f0f0d15516f889',
      language: 'EN'
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 401', async () => {
    const data = await client.createAddCardFormRequest({
      checkoutAccount: 375917,
      checkoutAlgorithm: 'sha256',
      checkoutMethod: 'POST',
      checkoutNonce: '6501220b16b7',
      checkoutTimestamp: '2023-08-22T04:05:20.253Z',
      checkoutRedirectSuccessUrl: 'https://somedomain.com/success',
      checkoutRedirectCancelUrl: 'https://somedomain.com/cancel',
      signature: '542e780c253761ed64333d5485391ddd4f55d5e00b7bdc7f60f0f0d15516f888',
      language: 'EN'
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createAddCardFormRequest').mockRejectedValue(mockError)

    try {
      await client.createAddCardFormRequest({
        checkoutAccount: 375917,
        checkoutAlgorithm: 'sha256',
        checkoutMethod: 'POST',
        checkoutNonce: '6501220b16b7',
        checkoutTimestamp: '2023-08-22T04:05:20.253Z',
        checkoutRedirectSuccessUrl: 'https://somedomain.com/success',
        checkoutRedirectCancelUrl: 'https://somedomain.com/cancel',
        signature: '542e780c253761ed64333d5485391ddd4f55d5e00b7bdc7f60f0f0d15516f889',
        language: 'EN'
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
