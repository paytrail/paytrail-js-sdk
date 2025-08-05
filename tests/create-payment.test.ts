import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { CreatePaymentRequest } from '../src/models/request/create-payment.model'
import { Item } from '../src/models/request/request-model/item.model'
import { Customer } from '../src/models/request/request-model/customer.model'
import { CallbackUrl } from '../src/models/request/request-model/callback-url.model'
import * as crypto from 'crypto'

describe('create-payment', () => {
  let client: PaytrailClient

  const standardData = new CreatePaymentRequest()
  standardData.stamp = crypto.randomUUID()
  standardData.reference = '9187445'
  standardData.amount = 1590
  standardData.currency = 'EUR'
  standardData.language = 'FI'
  
  const item = new Item()
  item.unitPrice = 1590
  item.units = 1
  item.vatPercentage = 24
  item.productCode = '#927502759'
  item.stamp = crypto.randomUUID()
  standardData.items = [item]

  const customer = new Customer()
  customer.email = 'erja.esimerkki@example.org'
  standardData.customer = customer

  const redirectUrls = new CallbackUrl()
  redirectUrls.success = 'https://ecom.example.org/success'
  redirectUrls.cancel = 'https://ecom.example.org/cancel'
  standardData.redirectUrls = redirectUrls

  const callbackUrls = new CallbackUrl()
  callbackUrls.success = 'https://ecom.example.org/success'
  callbackUrls.cancel = 'https://ecom.example.org/cancel'
  standardData.callbackUrls = callbackUrls

  const nonStandardData = new CreatePaymentRequest()
  nonStandardData.stamp = crypto.randomUUID()
  nonStandardData.reference = '9187445'
  nonStandardData.amount = -1590
  nonStandardData.currency = 'EUR'
  nonStandardData.language = 'FI'
  
  const nonStandardItem = new Item()
  nonStandardItem.unitPrice = 1590
  nonStandardItem.units = 1
  nonStandardItem.vatPercentage = 24
  nonStandardItem.productCode = '#927502759'
  nonStandardItem.stamp = crypto.randomUUID()
  nonStandardData.items = [nonStandardItem]

  const nonStandardCustomer = new Customer()
  nonStandardCustomer.email = 'erja.esimerkki@example.org'
  nonStandardData.customer = nonStandardCustomer

  const nonStandardRedirectUrls = new CallbackUrl()
  nonStandardRedirectUrls.success = 'https://ecom.example.org/success'
  nonStandardRedirectUrls.cancel = 'https://ecom.example.org/cancel'
  nonStandardData.redirectUrls = nonStandardRedirectUrls

  const nonStandardCallbackUrls = new CallbackUrl()
  nonStandardCallbackUrls.success = 'https://ecom.example.org/success'
  nonStandardCallbackUrls.cancel = 'https://ecom.example.org/cancel'
  nonStandardData.callbackUrls = nonStandardCallbackUrls

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
