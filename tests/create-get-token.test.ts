import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { GetTokenRequest } from '../src/models/request/get-token.model'

describe('create-get-token', () => {
  let client: PaytrailClient

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const request = new GetTokenRequest()
    request.checkoutTokenizationId = '818c478e-5682-46bf-97fd-b9c2b93a3fcd'

    const data = await client.createGetTokenRequest(request)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const request = new GetTokenRequest()
    request.checkoutTokenizationId = '8818c478e-5682-46bf-97fd-b9c2b93a3fcd'

    const data = await client.createGetTokenRequest(request)

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const request = new GetTokenRequest()
    request.checkoutTokenizationId = '818c478e-5682-46bf-97fd-b9c2b93a3fcd'

    const data = await client.createGetTokenRequest(request)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createGetToken').mockRejectedValue(mockError)

    try {
      const request = new GetTokenRequest()
      request.checkoutTokenizationId = '818c478e-5682-46bf-97fd-b9c2b93a3fcd'

      await client.createGetTokenRequest(request)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
