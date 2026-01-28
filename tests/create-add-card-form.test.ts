import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { AddCardFormRequest } from '../src/models/request/add-card-form.model'

describe('create-add-card-form', () => {
  let client: PaytrailClient

  const standardData = new AddCardFormRequest()
  standardData.checkoutRedirectSuccessUrl = 'https://somedomain.com/success'
  standardData.checkoutRedirectCancelUrl = 'https://somedomain.com/cancel'
  standardData.language = 'EN'

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 1072377,
      secretKey: '226382458d7a1a75486c9732881472dd61fff6debfb193afab1f7e8b85131081418380be827a69fc',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    jest.spyOn(api.tokenPayments, 'createAddCardFormRequest').mockResolvedValue({
      status: 200,
      data: { redirectUrl: 'https://paytrail.com/redirect' }
    } as any)

    const response = await client.createAddCardFormRequest(standardData)

    expect(response.status).toBe(200)
    expect(response.data.redirectUrl).toBeDefined()
  })

  it('should return status 401', async () => {
    jest.spyOn(api.tokenPayments, 'createAddCardFormRequest').mockRejectedValue({
      status: 401
    })

    try {
      await client.createAddCardFormRequest(standardData)
    } catch (error: any) {
      expect(error.status).toBe(401)
    }
  })

  it('should handle API error', async () => {
    jest
      .spyOn(api.tokenPayments, 'createAddCardFormRequest')
      .mockRejectedValue(new Error('API error'))

    try {
      await client.createAddCardFormRequest(standardData)
    } catch (error: any) {
      expect(error.message).toBe('API error')
    }
  })

  it('should include signature in headers', async () => {
    const spy = jest
      .spyOn(api.tokenPayments, 'createAddCardFormRequest')
      .mockResolvedValue({ status: 200 } as any)

    await client.createAddCardFormRequest(standardData)

    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        'checkout-account': '1072377',
        'checkout-method': 'POST',
        signature: expect.any(String),
        'checkout-nonce': expect.any(String),
        'checkout-timestamp': expect.any(String)
      })
    )
  })
})
