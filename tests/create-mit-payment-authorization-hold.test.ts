import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('create-mit-payment-authorization-hold', () => {
  let client: PaytrailClient
  let token: string

  beforeEach(async () => {
    const mockConfiguration = {
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    }
    client = new PaytrailClient(mockConfiguration)

    token = await client
      .createGetTokenRequest({
        checkoutTokenizationId: '818c478e-5682-46bf-97fd-b9c2b93a3fcd'
      })
      .then((res) => res.data.token)
      .catch((err) => '')
  })

  it('should return status 200', async () => {
    const data = await client.createMitPaymentAuthorizationHold({
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

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createMitPaymentAuthorizationHold({
      token,
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
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: '695861',
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createMitPaymentAuthorizationHold({
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

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createMitPaymentAuthorizationHold').mockRejectedValue(mockError)

    try {
      await client.createMitPaymentAuthorizationHold({
        token,
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
      })
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
