import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import * as crypto from 'crypto'

describe('create-payment', () => {
  let client: PaytrailClient

  const standardData = {
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
  }
  const nonStandardData = {
    stamp: crypto.randomUUID(),
    reference: '9187445',
    amount: -1590,
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
  }

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 375917,
      secretKey: 'SAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.createPayment(standardData)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createPayment(nonStandardData)

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 375917,
      secretKey: 'SAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createPayment(standardData)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.payments, 'create').mockRejectedValue(mockError)

    try {
      await client.createPayment(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
