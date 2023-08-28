import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import * as crypto from 'crypto'

describe('create-shop-in-shop-payment', () => {
  let client: PaytrailClient

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.createShopInShopPayment({
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
        email: 'erja.esimerkki@example.org',
        firstName: 'Erja',
        lastName: 'Esimerkki',
        phone: '+358501234567',
        vatId: 'FI12345671'
      },
      deliveryAddress: {
        streetAddress: 'Hämeenkatu 6 B',
        postalCode: '33100',
        city: 'Tampere',
        county: 'Pirkanmaa',
        country: 'FI'
      },
      invoicingAddress: {
        streetAddress: 'Testikatu 1',
        postalCode: '00510',
        city: 'Helsinki',
        county: 'Uusimaa',
        country: 'FI'
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

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createShopInShopPayment({
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
        email: 'erja.esimerkki@example.org',
        firstName: 'Erja',
        lastName: 'Esimerkki',
        phone: '+358501234567',
        vatId: 'FI12345671'
      },
      deliveryAddress: {
        streetAddress: 'Hämeenkatu 6 B',
        postalCode: '33100',
        city: 'Tampere',
        county: 'Pirkanmaa',
        country: 'FI'
      },
      invoicingAddress: {
        streetAddress: 'Testikatu 1',
        postalCode: '00510',
        city: 'Helsinki',
        county: 'Uusimaa',
        country: 'FI'
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

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createShopInShopPayment({
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
        email: 'erja.esimerkki@example.org',
        firstName: 'Erja',
        lastName: 'Esimerkki',
        phone: '+358501234567',
        vatId: 'FI12345671'
      },
      deliveryAddress: {
        streetAddress: 'Hämeenkatu 6 B',
        postalCode: '33100',
        city: 'Tampere',
        county: 'Pirkanmaa',
        country: 'FI'
      },
      invoicingAddress: {
        streetAddress: 'Testikatu 1',
        postalCode: '00510',
        city: 'Helsinki',
        county: 'Uusimaa',
        country: 'FI'
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

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.payments, 'createSiSPayment').mockRejectedValue(mockError)

    try {
      await client.createShopInShopPayment({
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
          email: 'erja.esimerkki@example.org',
          firstName: 'Erja',
          lastName: 'Esimerkki',
          phone: '+358501234567',
          vatId: 'FI12345671'
        },
        deliveryAddress: {
          streetAddress: 'Hämeenkatu 6 B',
          postalCode: '33100',
          city: 'Tampere',
          county: 'Pirkanmaa',
          country: 'FI'
        },
        invoicingAddress: {
          streetAddress: 'Testikatu 1',
          postalCode: '00510',
          city: 'Helsinki',
          county: 'Uusimaa',
          country: 'FI'
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
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
