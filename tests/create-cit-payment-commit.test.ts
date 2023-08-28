import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import * as crypto from 'crypto'

describe('create-cit-payment-commit', () => {
  let client: PaytrailClient

  beforeEach(async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.createCitPaymentCommit(
      {
        transactionId: '0e056dd8-408f-11ee-9cb4-e3059a523029'
      },
      {
        token: 'c7441208-c2a1-4a10-8eb6-458bd8eaa64f',
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
    )

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createCitPaymentCommit(
      {
        transactionId: '0e056dd8-408f-11ee-9cb4-e3059a523029'
      },
      {
        token: 'c7441208-c2a1-4a10-8eb6-458bd8eaa64f',
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
    )

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createCitPaymentCommit(
      {
        transactionId: '0e056dd8-408f-11ee-9cb4-e3059a523029'
      },
      {
        token: 'c7441208-c2a1-4a10-8eb6-458bd8eaa64f',
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
    )

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createMitOrCitPaymentCommit').mockRejectedValue(mockError)

    try {
      await client.createCitPaymentCommit(
        {
          transactionId: '0e056dd8-408f-11ee-9cb4-e3059a523029'
        },
        {
          token: 'c7441208-c2a1-4a10-8eb6-458bd8eaa64f',
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
      )
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
