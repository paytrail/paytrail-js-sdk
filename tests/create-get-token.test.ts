import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('create-get-token', () => {
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
    const data = await client.createGetTokenRequest({
      checkoutTokenizationId: '818c478e-5682-46bf-97fd-b9c2b93a3fcd'
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createGetTokenRequest({
      checkoutTokenizationId: '8818c478e-5682-46bf-97fd-b9c2b93a3fcd'
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createGetTokenRequest({
      checkoutTokenizationId: '818c478e-5682-46bf-97fd-b9c2b93a3fcd'
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createGetToken').mockRejectedValue(mockError)

    try {
      await client.createGetTokenRequest({
        checkoutTokenizationId: '818c478e-5682-46bf-97fd-b9c2b93a3fcd'
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
