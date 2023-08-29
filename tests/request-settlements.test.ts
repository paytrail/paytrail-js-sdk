import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('request-settlements', () => {
  let client: PaytrailClient

  const standardData = {
    bankReference: '45667372',
    startDate: '2023-07-16',
    endDate: '2023-08-16',
    limit: 10
  }
  const nonStandardData = {
    bankReference: '45667372',
    startDate: '2023-07-16',
    endDate: '2023-08-16',
    limit: -10
  }

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.requestSettlements(standardData)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.requestSettlements(nonStandardData)

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.requestSettlements(standardData)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.settlements, 'get').mockRejectedValue(mockError)

    try {
      await client.requestSettlements(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
