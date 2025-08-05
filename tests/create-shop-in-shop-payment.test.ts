import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'
import { CreateSiSPaymentRequest } from '../src/models/request/create-shop-in-shop-payment.model'
import { ShopInShopItem } from '../src/models/request/request-model/shop-in-shop-item.model'
import { Customer } from '../src/models/request/request-model/customer.model'
import { Address } from '../src/models/request/request-model/address.model'
import { CallbackUrl } from '../src/models/request/request-model/callback-url.model'
import * as crypto from 'crypto'

describe('create-shop-in-shop-payment', () => {
  let client: PaytrailClient

  const standardData = new CreateSiSPaymentRequest()
  standardData.stamp = crypto.randomUUID()
  standardData.reference = '9187445'
  standardData.amount = 1590
  standardData.currency = 'EUR'
  standardData.language = 'FI'
  
  const item = new ShopInShopItem()
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
  customer.firstName = 'Erja'
  customer.lastName = 'Esimerkki'
  customer.phone = '+358501234567'
  customer.vatId = 'FI12345671'
  standardData.customer = customer

  const deliveryAddress = new Address()
  deliveryAddress.streetAddress = 'Hämeenkatu 6 B'
  deliveryAddress.postalCode = '33100'
  deliveryAddress.city = 'Tampere'
  deliveryAddress.county = 'Pirkanmaa'
  deliveryAddress.country = 'FI'
  standardData.deliveryAddress = deliveryAddress

  const invoicingAddress = new Address()
  invoicingAddress.streetAddress = 'Testikatu 1'
  invoicingAddress.postalCode = '00510'
  invoicingAddress.city = 'Helsinki'
  invoicingAddress.county = 'Uusimaa'
  invoicingAddress.country = 'FI'
  standardData.invoicingAddress = invoicingAddress

  const redirectUrls = new CallbackUrl()
  redirectUrls.success = 'https://ecom.example.org/success'
  redirectUrls.cancel = 'https://ecom.example.org/cancel'
  standardData.redirectUrls = redirectUrls

  const callbackUrls = new CallbackUrl()
  callbackUrls.success = 'https://ecom.example.org/success'
  callbackUrls.cancel = 'https://ecom.example.org/cancel'
  standardData.callbackUrls = callbackUrls

  const nonStandardData = new CreateSiSPaymentRequest()
  nonStandardData.stamp = crypto.randomUUID()
  nonStandardData.reference = '9187445'
  nonStandardData.amount = -1590
  nonStandardData.currency = 'EUR'
  nonStandardData.language = 'FI'
  
  const nonStandardItem = new ShopInShopItem()
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
  nonStandardCustomer.firstName = 'Erja'
  nonStandardCustomer.lastName = 'Esimerkki'
  nonStandardCustomer.phone = '+358501234567'
  nonStandardCustomer.vatId = 'FI12345671'
  nonStandardData.customer = nonStandardCustomer

  const nonStandardDeliveryAddress = new Address()
  nonStandardDeliveryAddress.streetAddress = 'Hämeenkatu 6 B'
  nonStandardDeliveryAddress.postalCode = '33100'
  nonStandardDeliveryAddress.city = 'Tampere'
  nonStandardDeliveryAddress.county = 'Pirkanmaa'
  nonStandardDeliveryAddress.country = 'FI'
  nonStandardData.deliveryAddress = nonStandardDeliveryAddress

  const nonStandardInvoicingAddress = new Address()
  nonStandardInvoicingAddress.streetAddress = 'Testikatu 1'
  nonStandardInvoicingAddress.postalCode = '00510'
  nonStandardInvoicingAddress.city = 'Helsinki'
  nonStandardInvoicingAddress.county = 'Uusimaa'
  nonStandardInvoicingAddress.country = 'FI'
  nonStandardData.invoicingAddress = nonStandardInvoicingAddress

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
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIAS',
      platformName: 'test'
    })
  })

  it('should return status 200', async () => {
    const data = await client.createShopInShopPayment(standardData)

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.createShopInShopPayment(nonStandardData)

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: 695861,
      secretKey: 'MONISAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.createShopInShopPayment(standardData)

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    const mockError = new Error('API error')
    jest.spyOn(api.payments, 'createSiSPayment').mockRejectedValue(mockError)

    try {
      await client.createShopInShopPayment(standardData)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
