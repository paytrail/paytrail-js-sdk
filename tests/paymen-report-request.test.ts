import { RequestType } from '../src/models'
import { PaymentStatus } from '../src/models/request/request-model/payment-status.model'
import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('paymen-report-request', () => {
  let client: PaytrailClient

  beforeEach(async () => {
    const mockConfiguration = {
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    }
    client = new PaytrailClient(mockConfiguration)
  })

  it('should return status 200', async () => {
    const data = await client.paymentReportRequest({
      requestType: RequestType.JSON,
      callbackUrl: 'https://ecom.example.org/refund/success',
      paymentStatus: PaymentStatus.DEFAULT,
      startDate: '2023-07-16T02:32:23.894Z',
      endDate: '2023-08-16T02:32:23.894Z',
      limit: 5000
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.paymentReportRequest({
      requestType: RequestType.JSON,
      callbackUrl: 'https://ecom.example.org/refund/success',
      paymentStatus: PaymentStatus.DEFAULT,
      startDate: '2023-07-16T02:32:23.894Z',
      endDate: '2023-08-16T02:32:23.894Z',
      limit: -5000
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.paymentReportRequest({
      requestType: RequestType.JSON,
      callbackUrl: 'https://ecom.example.org/refund/success',
      paymentStatus: PaymentStatus.DEFAULT,
      startDate: '2023-07-16T02:32:23.894Z',
      endDate: '2023-08-16T02:32:23.894Z',
      limit: 5000
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.paymentReports, 'paymentReportRequest').mockRejectedValue(mockError)

    try {
      await client.paymentReportRequest({
        requestType: RequestType.JSON,
        callbackUrl: 'https://ecom.example.org/refund/success',
        paymentStatus: PaymentStatus.DEFAULT,
        startDate: '2023-07-16T02:32:23.894Z',
        endDate: '2023-08-16T02:32:23.894Z',
        limit: 5000
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
