import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import * as crypto from 'crypto'

describe('revert-payment-authorization-hold', () => {
  let client: PaytrailClient
  let transactionId: string

  beforeEach(async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })

    const token = await client
      .createGetTokenRequest({
        checkoutTokenizationId: '818c478e-5682-46bf-97fd-b9c2b93a3fcd'
      })
      .then((res) => res.data.token)
      .catch(() => '')

    transactionId = await client
      .createMitPaymentAuthorizationHold({
        token,
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
            description: 'Cat ladder',
            category: 'Pet supplies',
            merchant: '695874',
            stamp: crypto.randomUUID(),
            reference: '9187445'
          }
        ],
        customer: {
          email: 'erja.esimerkki@example.org'
        },
        redirectUrls: {
          success: 'https://ecom.example.org/success',
          cancel: 'https://ecom.example.org/cancel'
        }
      })
      .then((res) => res.data.transactionId)
      .catch(() => '')
  })

  it('should return status 200', async () => {
    const data = await client.revertPaymentAuthorizationHold({
      transactionId
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.revertPaymentAuthorizationHold({
      transactionId: '009a0d546-416d-11ee-a5c4-8b35d0c46e58'
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 404', async () => {
    const data = await client.revertPaymentAuthorizationHold({
      transactionId: '9dd69e18-3fc3-11ee-b592-d35f161da10a'
    })

    expect(data.status).toEqual(404)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.revertPaymentAuthorizationHold({
      transactionId
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'revertPaymentAuthorizationHold').mockRejectedValue(mockError)

    try {
      await client.revertPaymentAuthorizationHold({
        transactionId
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
