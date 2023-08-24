import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('request-settlements', () => {
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
    const data = await client.requestSettlements({
      bankReference: '45667372',
      startDate: '2023-07-16',
      endDate: '2023-08-16',
      limit: 10
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.requestSettlements({
      bankReference: '45667372',
      startDate: '2023-07-16',
      endDate: '2023-08-16',
      limit: -10
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.requestSettlements({
      bankReference: '45667372',
      startDate: '2023-07-16',
      endDate: '2023-08-16',
      limit: 10
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.settlements, 'get').mockRejectedValue(mockError)

    try {
      await client.requestSettlements({
        bankReference: '45667372',
        startDate: '2023-07-16',
        endDate: '2023-08-16',
        limit: 10
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
