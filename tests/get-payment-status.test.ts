import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('get-payment-status', () => {
  let client: PaytrailClient
  let transactionId: string

  beforeEach(async () => {
    const mockConfiguration = {
      merchantId: '375917',
      secretKey: 'SAIPPUAKAUPPIAS',
      platformName: 'test'
    }
    client = new PaytrailClient(mockConfiguration)

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
      .catch((err) => '')
  })

  it('should return status 200', async () => {
    const data = await client.getPaymentStatus({
      transactionId
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.getPaymentStatus({
      transactionId: 'ff47f86d2-3bde-11ee-b003-67223adb8e7d'
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 404', async () => {
    const data = await client.getPaymentStatus({
      transactionId: 'f47f86d2-3bde-11ee-b003-67223adb8e7d'
    })

    expect(data.status).toEqual(404)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: '375917',
      secretKey: 'SAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.getPaymentStatus({
      transactionId
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.payments, 'getPaymentStatus').mockRejectedValue(mockError)

    try {
      await client.getPaymentStatus({
        transactionId
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
