import { api, requests } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { CreateRefundRequest, CreateRefundParams } from '../src/models/request/create-refund.model'
import { CallbackUrl } from '../src/models/request/request-model/callback-url.model'
import * as crypto from 'crypto'

describe('create-refund', () => {
  let client: PaytrailClient
  let transactionId: string

  const standardData = new CreateRefundRequest()
  standardData.amount = 1590
  standardData.refundStamp = crypto.randomUUID()
  standardData.refundReference = '9187445'
  
  const callbackUrls = new CallbackUrl()
  callbackUrls.success = 'https://ecom.example.org/refund/success'
  callbackUrls.cancel = 'https://ecom.example.org/refund/cancel'
  standardData.callbackUrls = callbackUrls

  const nonStandardData = new CreateRefundRequest()
  nonStandardData.amount = -1590
  nonStandardData.refundStamp = crypto.randomUUID()
  nonStandardData.refundReference = '9187445'
  
  const nonStandardCallbackUrls = new CallbackUrl()
  nonStandardCallbackUrls.success = 'https://ecom.example.org/refund/success'
  nonStandardCallbackUrls.cancel = 'https://ecom.example.org/refund/cancel'
  nonStandardData.callbackUrls = nonStandardCallbackUrls

  beforeEach(async () => {
    client = new PaytrailClient({
      merchantId: 375917,
      secretKey: 'SAIPPUAKAUPPIAS',
      platformName: 'test'
    })

    transactionId = await client
      .createPayment({
        stamp: crypto.randomUUID(),
        reference: '9187445',
        amount: 1590,
        currency: 'EUR',
        language: 'FI',
        items: [
          {
            unitPrice: 1590,
            units: 1,
            vatPercentage: 24,
            productCode: '#927502759',
            stamp: crypto.randomUUID()
          }
        ],
        customer: {
          email: 'erja.esimerkki@example.org'
        },
        redirectUrls: {
          success: 'https://ecom.example.org/success',
          cancel: 'https://ecom.example.org/cancel'
        },
        callbackUrls: {
          success: 'https://ecom.example.org/success',
          cancel: 'https://ecom.example.org/cancel'
        }
      })
      .then((res) => res.data.transactionId)
      .catch(() => '')
  })

  it('should return status 200', async () => {
    const postMock = jest.spyOn(requests, 'post').mockResolvedValue({
      provider: 'handelsbanken',
      status: 'ok',
      transactionId: '258ad3a5-9711-44c3-be65-64a0ef462ba3'
    })

    const params = new CreateRefundParams()
    params.transactionId = transactionId

    const data = await client.createRefund(params, standardData)

    expect(data.status).toEqual(200)
    postMock.mockRestore()
  })

  it('should return status 400', async () => {
    const params = new CreateRefundParams()
    params.transactionId = transactionId

    const data = await client.createRefund(params, nonStandardData)

    expect(data.status).toEqual(400)
  })

  it('should return status 404', async () => {
    const params = new CreateRefundParams()
    params.transactionId = '9dd69e18-3fc3-11ee-b592-d35f161da10a'

    const data = await client.createRefund(params, standardData)

    expect(data.status).toEqual(404)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 375917,
      secretKey: 'SAIPPUAKAUPPIASSS',
      platformName: 'test'
    })

    const params = new CreateRefundParams()
    params.transactionId = transactionId

    const data = await client.createRefund(params, standardData)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.payments, 'createRefund').mockRejectedValue(mockError)

    try {
      const params = new CreateRefundParams()
      params.transactionId = transactionId

      await client.createRefund(params, standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
