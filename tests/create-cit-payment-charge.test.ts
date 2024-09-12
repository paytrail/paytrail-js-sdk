import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import * as crypto from 'crypto'

describe('create-cit-payment-charge', () => {
  let client: PaytrailClient
  let token: string

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
  }

  beforeEach(async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })

    token = await client
      .createGetTokenRequest({
        checkoutTokenizationId: '1d0a51f6-a60c-477b-94e2-403a0ed37199'
      })
      .then((res) => res.data.token)
      .catch(() => '')
  })

  it('should return status 200', async () => {
    const data = await client.createCitPaymentCharge({
      ...standardData,
      token
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createCitPaymentCharge({
      ...nonStandardData,
      token
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createCitPaymentCharge({
      ...standardData,
      token
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createCitPaymentCharge').mockRejectedValue(mockError)

    try {
      await client.createCitPaymentCharge({
        ...standardData,
        token
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
