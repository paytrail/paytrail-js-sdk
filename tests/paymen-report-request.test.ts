import { RequestType } from '../src/models'
import { PaymentStatus } from '../src/models/request/request-model/payment-status.model'
import { PaymentReportRequest } from '../src/models/request/payment-report-request.model'
import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('paymen-report-request', () => {
  let client: PaytrailClient

  const standardData = new PaymentReportRequest()
  standardData.requestType = RequestType.JSON
  standardData.callbackUrl = 'https://ecom.example.org/refund/success'
  standardData.paymentStatus = PaymentStatus.DEFAULT
  standardData.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
  standardData.endDate = new Date().toISOString()
  standardData.limit = 5000

  const nonStandardData = new PaymentReportRequest()
  nonStandardData.requestType = RequestType.JSON
  nonStandardData.callbackUrl = 'https://ecom.example.org/refund/success'
  nonStandardData.paymentStatus = PaymentStatus.DEFAULT
  nonStandardData.startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString()
  nonStandardData.endDate = new Date().toISOString()
  nonStandardData.limit = -5000

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
