import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { CancelOrderRequest } from '../src/models/request/cancel-payment.model'

describe('cancel-payment', () => {
  let client: PaytrailClient
  const validTransactionId = '7dbadc14-4161-11ee-be56-0777e4926dec' // Example UUID

  beforeEach(() => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 404 for non-existent transaction', async () => {
    const request = new CancelOrderRequest()
    request.transactionId = validTransactionId

    const data = await client.cancelPayment(request)
    expect(data.status).toEqual(404)
  })

  it('should return status 400 for invalid transaction id format', async () => {
    const request = new CancelOrderRequest()
    request.transactionId = 'invalid-uuid'

    const data = await client.cancelPayment(request)
    expect(data.status).toEqual(400)
    expect(data.message).toContain('transactionId must be a UUID')
  })

  it('should return status 400 for empty transaction id', async () => {
    const request = new CancelOrderRequest()
    request.transactionId = ''

    const data = await client.cancelPayment(request)
    expect(data.status).toEqual(400)
    expect(data.message).toContain('transactionId should not be empty')
  })

  it('should return status SUCCESS (200) when mocked', async () => {
    // Mocking the underlying API call to simulate a successful 200 response
    const mockResponse = [undefined, { status: 'ok', transactionId: validTransactionId }]
    jest.spyOn(api.payments, 'cancelOrder').mockResolvedValue(mockResponse as any)

    const request = new CancelOrderRequest()
    request.transactionId = validTransactionId

    const data = await client.cancelPayment(request)
    expect(data.status).toEqual(200)
    expect(data.data?.transactionId).toEqual(validTransactionId)

    jest.restoreAllMocks()
  })

  it('should return status 401 for invalid credentials', async () => {
    const invalidClient = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'INVALID_SECRET',
      platformName: 'test'
    })

    const request = new CancelOrderRequest()
    request.transactionId = validTransactionId

    const data = await invalidClient.cancelPayment(request)
    expect(data.status).toEqual(401)
  })

  it('should handle API error (rejections)', async () => {
    const mockError = new Error('Network Error')
    jest.spyOn(api.payments, 'cancelOrder').mockRejectedValue(mockError)

    try {
      const request = new CancelOrderRequest()
      request.transactionId = validTransactionId

      await client.cancelPayment(request)
    } catch (error: any) {
      expect(error.message).toBe('Network Error')
    } finally {
      jest.restoreAllMocks()
    }
  })
})
