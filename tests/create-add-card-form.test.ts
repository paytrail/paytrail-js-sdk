import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { AddCardFormRequest } from '../src/models/request/add-card-form.model'

describe('create-add-card-form', () => {
  let client: PaytrailClient

  const standardData = new AddCardFormRequest()
  standardData.checkoutRedirectSuccessUrl = 'https://somedomain.com/success'
  standardData.checkoutRedirectCancelUrl = 'https://somedomain.com/cancel'
  standardData.language = 'EN'

  const nonStandardData = new AddCardFormRequest()
  nonStandardData.checkoutRedirectSuccessUrl = 'https://somedomain.com/success'
  nonStandardData.checkoutRedirectCancelUrl = 'https://somedomain.com/cancel'
  nonStandardData.language = 'EN'

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 1072377,
      secretKey: '226382458d7a1a75486c9732881472dd61fff6debfb193afab1f7e8b85131081418380be827a69fc',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.createAddCardFormRequest(standardData)
    expect(data).toHaveProperty('status', 200)
    expect(data).toBeDefined()
    expect(typeof data.data?.redirectUrl).toBe('string')
  })

  it('should return status 401', async () => {
    try {
      await client.createAddCardFormRequest(nonStandardData)
    } catch (error: any) {
      expect(error.status).toEqual(401)
    }
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createAddCardFormRequest').mockRejectedValue(mockError)

    try {
      await client.createAddCardFormRequest(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })

  it('should include signature in headers', async () => {
    const spy = jest.spyOn(api.tokenPayments, 'createAddCardFormRequest').mockResolvedValue({
      data: { redirectUrl: 'https://paytrail.com/redirect' },
      message: 'Success',
      status: 200
    } as any)

    await client.createAddCardFormRequest(standardData)

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        language: 'EN'
      }),
      expect.objectContaining({
        'checkout-account': 1072377,
        'checkout-method': 'POST',
        signature: expect.any(String)
      })
    )
  })
})
