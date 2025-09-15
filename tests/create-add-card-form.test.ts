import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { AddCardFormRequest } from '../src/models/request/add-card-form.model'

describe('create-add-card-form', () => {
  let client: PaytrailClient

  const standardData = new AddCardFormRequest()
  standardData.checkoutAccount = 375917
  standardData.checkoutAlgorithm = 'sha256'
  standardData.checkoutMethod = 'POST'
  standardData.checkoutNonce = '6501220b16b7'
  standardData.checkoutTimestamp = '2023-08-22T04:05:20.253Z'
  standardData.checkoutRedirectSuccessUrl = 'https://somedomain.com/success'
  standardData.checkoutRedirectCancelUrl = 'https://somedomain.com/cancel'
  standardData.signature = '542e780c253761ed64333d5485391ddd4f55d5e00b7bdc7f60f0f0d15516f889'
  standardData.language = 'EN'

  const nonStandardData = new AddCardFormRequest()
  nonStandardData.checkoutAccount = 375917
  nonStandardData.checkoutAlgorithm = 'sha256'
  nonStandardData.checkoutMethod = 'POST'
  nonStandardData.checkoutNonce = '6501220b16b7'
  nonStandardData.checkoutTimestamp = '2023-08-22T04:05:20.253Z'
  nonStandardData.checkoutRedirectSuccessUrl = 'https://somedomain.com/success'
  nonStandardData.checkoutRedirectCancelUrl = 'https://somedomain.com/cancel'
  nonStandardData.signature = '542e780c253761ed64333d5485391ddd4f55d5e00b7bdc7f60f0f0d15516f888'
  nonStandardData.language = 'EN'

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.createAddCardFormRequest(standardData)
    expect(data).toHaveProperty('status', 200)
    expect(data).toBeDefined()
    expect(typeof data.data?.redirectUrl).toBe('string')
  })

  it('should return status 401', async () => {
    try {
      await client.createAddCardFormRequest(nonStandardData)
    } catch (error: any) {
      expect(error.status).toEqual(401)
    }
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createAddCardFormRequest').mockRejectedValue(mockError)

    try {
      await client.createAddCardFormRequest(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
