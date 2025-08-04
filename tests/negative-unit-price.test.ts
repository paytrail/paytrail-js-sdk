import { validate } from 'class-validator'
import { CreatePaymentRequest } from '../src/models/request/create-payment.model'
import { Item } from '../src/models/request/request-model/item.model'
import { ShopInShopItem } from '../src/models/request/request-model/shop-in-shop-item.model'
import * as crypto from 'crypto'

describe('Negative unitPrice Support', () => {
  describe('Normal Item - negative unitPrice', () => {
    it('should allow negative unitPrice for normal items', async () => {
      const item = new Item()
      item.unitPrice = -500 // -5.00 EUR
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#discount-item'
      item.description = 'Discount item'

      const errors = await validate(item)
      expect(errors.length).toBe(0)
    })

    it('should allow minimum negative unitPrice value', async () => {
      const item = new Item()
      item.unitPrice = -2147483648 // Minimum allowed value
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#min-value-item'

      const errors = await validate(item)
      expect(errors.length).toBe(0)
    })

    it('should allow maximum positive unitPrice value', async () => {
      const item = new Item()
      item.unitPrice = 2147483647 // Maximum allowed value
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#max-value-item'

      const errors = await validate(item)
      expect(errors.length).toBe(0)
    })

    it('should reject unitPrice below minimum value', async () => {
      const item = new Item()
      item.unitPrice = -2147483649 // Below minimum
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#below-min-item'

      const errors = await validate(item)
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].constraints?.isValidUnitPrice).toContain('unitPrice must be between -2147483648 and 2147483647')
    })

    it('should reject unitPrice above maximum value', async () => {
      const item = new Item()
      item.unitPrice = Number.MAX_SAFE_INTEGER // A very large number above maximum
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#above-max-item'

      const errors = await validate(item)
      expect(errors.length).toBeGreaterThan(0)
      const unitPriceError = errors.find(error => error.constraints?.isValidUnitPrice)
      expect(unitPriceError?.constraints?.isValidUnitPrice).toContain('unitPrice must be between -2147483648 and 2147483647')
    })
  })

  describe('Normal Item with usePricesWithoutVat=true', () => {
    it('should reject negative unitPrice when usePricesWithoutVat is true', async () => {
      const paymentRequest = new CreatePaymentRequest()
      paymentRequest.stamp = crypto.randomUUID()
      paymentRequest.reference = '9187445'
      paymentRequest.amount = 1000
      paymentRequest.currency = 'EUR'
      paymentRequest.language = 'FI'
      paymentRequest.usePricesWithoutVat = true
      paymentRequest.customer = {
        email: 'test@example.org'
      }
      paymentRequest.redirectUrls = {
        success: 'https://example.org/success',
        cancel: 'https://example.org/cancel'
      }

      const item = new Item()
      item.unitPrice = -500 // Negative price
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#discount-item'
      
      // Simulate the context by adding payment request reference
      ;(item as any)._paymentRequest = paymentRequest

      paymentRequest.items = [item]

      const errors = await validate(item)
      expect(errors.length).toBeGreaterThan(0)
      expect(errors[0].constraints?.isValidUnitPrice).toContain('Items cannot have negative unitPrice when usePricesWithoutVat is true')
    })

    it('should allow positive unitPrice when usePricesWithoutVat is true', async () => {
      const paymentRequest = new CreatePaymentRequest()
      paymentRequest.usePricesWithoutVat = true

      const item = new Item()
      item.unitPrice = 500 // Positive price
      item.units = 1
      item.vatPercentage = 24
      item.productCode = '#normal-item'
      
      // Simulate the context by adding payment request reference
      ;(item as any)._paymentRequest = paymentRequest

      const errors = await validate(item)
      expect(errors.length).toBe(0)
    })
  })

  describe('Shop-in-Shop Item - negative unitPrice restrictions', () => {
    it('should reject negative unitPrice for shop-in-shop items', async () => {
      const shopItem = new ShopInShopItem()
      shopItem.unitPrice = -500 // Negative price
      shopItem.units = 1
      shopItem.vatPercentage = 24
      shopItem.productCode = '#shop-discount-item'
      shopItem.merchant = '695874'
      shopItem.stamp = crypto.randomUUID()
      shopItem.reference = '9187445'

      const errors = await validate(shopItem)
      expect(errors.length).toBeGreaterThan(0)
      
      // Check for the specific minimum value error for shop-in-shop items
      const unitPriceError = errors.find(error => error.property === 'unitPrice')
      expect(unitPriceError).toBeDefined()
      expect(unitPriceError?.constraints?.min).toContain('unitPrice must not be less than 0')
    })

    it('should allow positive unitPrice for shop-in-shop items', async () => {
      const shopItem = new ShopInShopItem()
      shopItem.unitPrice = 1590 // Positive price
      shopItem.units = 1
      shopItem.vatPercentage = 24
      shopItem.productCode = '#shop-item'
      shopItem.merchant = '695874'
      shopItem.stamp = crypto.randomUUID()
      shopItem.reference = '9187445'

      const errors = await validate(shopItem)
      expect(errors.length).toBe(0)
    })

    it('should allow maximum positive unitPrice for shop-in-shop items', async () => {
      const shopItem = new ShopInShopItem()
      shopItem.unitPrice = 2147483647 // Maximum allowed value
      shopItem.units = 1
      shopItem.vatPercentage = 24
      shopItem.productCode = '#shop-max-item'
      shopItem.merchant = '695874'
      shopItem.stamp = crypto.randomUUID()
      shopItem.reference = '9187445'

      const errors = await validate(shopItem)
      expect(errors.length).toBe(0)
    })

    it('should reject unitPrice above maximum for shop-in-shop items', async () => {
      const shopItem = new ShopInShopItem()
      shopItem.unitPrice = 2147483648 // Above maximum
      shopItem.units = 1
      shopItem.vatPercentage = 24
      shopItem.productCode = '#shop-above-max'
      shopItem.merchant = '695874'
      shopItem.stamp = crypto.randomUUID()
      shopItem.reference = '9187445'

      const errors = await validate(shopItem)
      expect(errors.length).toBeGreaterThan(0)
      
      const unitPriceError = errors.find(error => error.property === 'unitPrice')
      expect(unitPriceError).toBeDefined()
      expect(unitPriceError?.constraints?.max).toContain('unitPrice must not be greater than 2147483647')
    })

    it('should require stamp, reference, and merchant for shop-in-shop items', async () => {
      const shopItem = new ShopInShopItem()
      shopItem.unitPrice = 1590
      shopItem.units = 1
      shopItem.vatPercentage = 24
      shopItem.productCode = '#incomplete-shop-item'
      // Explicitly set required fields to empty strings to trigger validation
      shopItem.stamp = ''
      shopItem.reference = ''
      shopItem.merchant = ''

      const errors = await validate(shopItem)
      expect(errors.length).toBeGreaterThan(0)
      
      const requiredFields = ['stamp', 'reference', 'merchant']
      requiredFields.forEach(field => {
        const fieldError = errors.find(error => error.property === field)
        expect(fieldError).toBeDefined()
        expect(fieldError?.constraints?.isNotEmpty).toBeDefined()
      })
    })
  })

  describe('Shop-in-Shop Item inheritance', () => {
    it('should inherit all properties from base Item class', () => {
      const shopItem = new ShopInShopItem()
      
      // Test that we can set Item properties (inherited)
      shopItem.unitPrice = 1000
      shopItem.units = 1
      shopItem.vatPercentage = 24
      shopItem.productCode = 'test'
      shopItem.description = 'test desc'
      shopItem.category = 'test category'
      shopItem.orderId = 'order123'
      
      // Test that we can set ShopInShopItem specific properties
      shopItem.stamp = 'stamp123'
      shopItem.reference = 'ref123'
      shopItem.merchant = 'merchant123'
      
      // Verify the values were set correctly
      expect(shopItem.unitPrice).toBe(1000)
      expect(shopItem.units).toBe(1)
      expect(shopItem.vatPercentage).toBe(24)
      expect(shopItem.productCode).toBe('test')
      expect(shopItem.stamp).toBe('stamp123')
      expect(shopItem.reference).toBe('ref123')
      expect(shopItem.merchant).toBe('merchant123')
    })

    it('should be an instance of both ShopInShopItem and Item', () => {
      const shopItem = new ShopInShopItem()
      
      expect(shopItem).toBeInstanceOf(ShopInShopItem)
      expect(shopItem).toBeInstanceOf(Item)
    })
  })

  describe('Integration scenarios', () => {
    it('should allow discount line items with negative unitPrice in regular payments', async () => {
      const paymentRequest = new CreatePaymentRequest()
      paymentRequest.stamp = crypto.randomUUID()
      paymentRequest.reference = '9187445'
      paymentRequest.amount = 1090 // 15.90 - 5.00 = 10.90
      paymentRequest.currency = 'EUR'
      paymentRequest.language = 'FI'
      paymentRequest.customer = {
        email: 'test@example.org'
      }
      paymentRequest.redirectUrls = {
        success: 'https://example.org/success',
        cancel: 'https://example.org/cancel'
      }

      const regularItem = new Item()
      regularItem.unitPrice = 1590 // 15.90 EUR
      regularItem.units = 1
      regularItem.vatPercentage = 24
      regularItem.productCode = '#regular-item'

      const discountItem = new Item()
      discountItem.unitPrice = -500 // -5.00 EUR discount
      discountItem.units = 1
      discountItem.vatPercentage = 24
      discountItem.productCode = '#discount'
      discountItem.description = 'Discount'

      paymentRequest.items = [regularItem, discountItem]

      const regularItemErrors = await validate(regularItem)
      const discountItemErrors = await validate(discountItem)
      const paymentErrors = await validate(paymentRequest)

      expect(regularItemErrors.length).toBe(0)
      expect(discountItemErrors.length).toBe(0)
      expect(paymentErrors.length).toBe(0)
    })
  })
})