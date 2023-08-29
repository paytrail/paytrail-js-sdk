import { RequestType } from '../src/models'
import { PaymentStatus } from '../src/models/request/request-model/payment-status.model'
import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('paymen-report-request', () => {
  let client: PaytrailClient

  const standardData = {
    requestType: RequestType.JSON,
    callbackUrl: 'https://ecom.example.org/refund/success',
    paymentStatus: PaymentStatus.DEFAULT,
    startDate: '2023-07-16T02:32:23.894Z',
    endDate: '2023-08-16T02:32:23.894Z',
    limit: 5000
  }
  const nonStandardData = {
    requestType: RequestType.JSON,
    callbackUrl: 'https://ecom.example.org/refund/success',
    paymentStatus: PaymentStatus.DEFAULT,
    startDate: '2023-07-16T02:32:23.894Z',
    endDate: '2023-08-16T02:32:23.894Z',
    limit: -5000
  }

  beforeEach(async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.paymentReportRequest(standardData)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.paymentReportRequest(nonStandardData)

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.paymentReportRequest(standardData)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.paymentReports, 'paymentReportRequest').mockRejectedValue(mockError)

    try {
      await client.paymentReportRequest(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
