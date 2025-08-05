import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { CreateCitPaymentRequest } from '../src/models/request/create-cit-payment.model'
import { Item } from '../src/models/request/request-model/item.model'
import { Customer } from '../src/models/request/request-model/customer.model'
import { CallbackUrl } from '../src/models/request/request-model/callback-url.model'
import * as crypto from 'crypto'

describe('create-cit-payment-charge', () => {
  let client: PaytrailClient
  let token: string

  const standardData = new CreateCitPaymentRequest()
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
  item.description = 'Cat ladder'
  item.category = 'Pet supplies'
  item.merchant = '695874'
  item.stamp = crypto.randomUUID()
  item.reference = '9187445'
  standardData.items = [item]

  const customer = new Customer()
  customer.email = 'erja.esimerkki@example.org'
  standardData.customer = customer

  const redirectUrls = new CallbackUrl()
  redirectUrls.success = 'https://ecom.example.org/success'
  redirectUrls.cancel = 'https://ecom.example.org/cancel'
  standardData.redirectUrls = redirectUrls

  const nonStandardData = new CreateCitPaymentRequest()
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
  nonStandardItem.description = 'Cat ladder'
  nonStandardItem.category = 'Pet supplies'
  nonStandardItem.merchant = '695874'
  nonStandardItem.stamp = crypto.randomUUID()
  nonStandardItem.reference = '9187445'
  nonStandardData.items = [nonStandardItem]

  const nonStandardCustomer = new Customer()
  nonStandardCustomer.email = 'erja.esimerkki@example.org'
  nonStandardData.customer = nonStandardCustomer

  const nonStandardRedirectUrls = new CallbackUrl()
  nonStandardRedirectUrls.success = 'https://ecom.example.org/success'
  nonStandardRedirectUrls.cancel = 'https://ecom.example.org/cancel'
  nonStandardData.redirectUrls = nonStandardRedirectUrls

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
    standardData.token = token
    const data = await client.createCitPaymentCharge(standardData)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    nonStandardData.token = token
    const data = await client.createCitPaymentCharge(nonStandardData)

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    standardData.token = token
    const data = await client.createCitPaymentCharge(standardData)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.tokenPayments, 'createCitPaymentCharge').mockRejectedValue(mockError)

    try {
      standardData.token = token
      await client.createCitPaymentCharge(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
