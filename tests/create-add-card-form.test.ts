import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { AddCardFormRequest } from '../src/models/request/add-card-form.model'

describe('create-add-card-form', () => {
  let client: PaytrailClient

  const standardData = new AddCardFormRequest()
  standardData.checkoutRedirectSuccessUrl = 'https://somedomain.com/success'
  standardData.checkoutRedirectCancelUrl = 'https://somedomain.com/cancel'
  standardData.language = 'EN'

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

  it('should return status 401 with invalid credentials', async () => {
    const badClient = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'WRONG_KEY',
      platformName: 'test'
    })

    try {
      await badClient.createAddCardFormRequest(standardData)
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
