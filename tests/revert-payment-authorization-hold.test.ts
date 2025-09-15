import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { RevertPaymentAuthHoldRequest } from '../src/models/request/revert-payment-auth-hold.model'
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
        checkoutTokenizationId: '1d0a51f6-a60c-477b-94e2-403a0ed37199'
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
    const request = new RevertPaymentAuthHoldRequest()
    request.transactionId = transactionId

    const data = await client.revertPaymentAuthorizationHold(request)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const request = new RevertPaymentAuthHoldRequest()
    request.transactionId = '009a0d546-416d-11ee-a5c4-8b35d0c46e58'

    const data = await client.revertPaymentAuthorizationHold(request)

    expect(data.status).toEqual(400)
  })

  it('should return status 404', async () => {
    const request = new RevertPaymentAuthHoldRequest()
    request.transactionId = '9dd69e18-3fc3-11ee-b592-d35f161da10a'

    const data = await client.revertPaymentAuthorizationHold(request)

    expect(data.status).toEqual(404)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const request = new RevertPaymentAuthHoldRequest()
    request.transactionId = transactionId

    const data = await client.revertPaymentAuthorizationHold(request)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'revertPaymentAuthorizationHold').mockRejectedValue(mockError)

    try {
      const request = new RevertPaymentAuthHoldRequest()
      request.transactionId = transactionId

      await client.revertPaymentAuthorizationHold(request)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
