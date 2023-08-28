import { api, requests } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import * as crypto from 'crypto'

describe('create-refund', () => {
  let client: PaytrailClient
  let transactionId: string

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

    const data = await client.createRefund(
      {
        transactionId
      },
      {
        amount: 1590,
        refundStamp: crypto.randomUUID(),
        refundReference: '9187445',
        callbackUrls: {
          success: 'https://ecom.example.org/refund/success',
          cancel: 'https://ecom.example.org/refund/cancel'
        }
      }
    )

    expect(data.status).toEqual(200)
    postMock.mockRestore()
  })

  it('should return status 400', async () => {
    const data = await client.createRefund(
      {
        transactionId
      },
      {
        amount: -1590,
        refundStamp: crypto.randomUUID(),
        refundReference: '9187445',
        callbackUrls: {
          success: 'https://ecom.example.org/refund/success',
          cancel: 'https://ecom.example.org/refund/cancel'
        }
      }
    )

    expect(data.status).toEqual(400)
  })

  it('should return status 404', async () => {
    const data = await client.createRefund(
      {
        transactionId: '9dd69e18-3fc3-11ee-b592-d35f161da10a'
      },
      {
        amount: 1590,
        email: 'recipient@example.com',
        callbackUrls: {
          success: 'https://ecom.example.org/refund/success',
          cancel: 'https://ecom.example.org/refund/cancel'
        }
      }
    )

    expect(data.status).toEqual(404)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 375917,
      secretKey: 'SAIPPUAKAUPPIASSS',
      platformName: 'test'
    })

    const data = await client.createRefund(
      {
        transactionId
      },
      {
        amount: 1590,
        refundStamp: crypto.randomUUID(),
        refundReference: '9187445',
        callbackUrls: {
          success: 'https://ecom.example.org/refund/success',
          cancel: 'https://ecom.example.org/refund/cancel'
        }
      }
    )

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.payments, 'createRefund').mockRejectedValue(mockError)

    try {
      await client.createRefund(
        {
          transactionId
        },
        {
          amount: 1590,
          refundStamp: crypto.randomUUID(),
          refundReference: '9187445',
          callbackUrls: {
            success: 'https://ecom.example.org/refund/success',
            cancel: 'https://ecom.example.org/refund/cancel'
          }
        }
      )
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
