import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions
} from 'class-validator'
import { CreatePaymentRequest, Item } from '../models'

/**
 * Validator constraint for validating items array
 */
@ValidatorConstraint({ name: 'validateItemPrices', async: false })
export class ValidateItemPricesConstraint implements ValidatorConstraintInterface {
  validate(items: Item[], args: ValidationArguments): boolean {
    const request = args.object as CreatePaymentRequest

    if (!items) return true

    // Check if this is a shop-in-shop item by checking for required shop-in-shop fields
    const isShopInShopItem = request.items[0].merchant && request.items[0].stamp && request.items[0].reference

    // For shop-in-shop items, unitPrice must be >= 0
    if (isShopInShopItem) {
      return items.every((item) => item.unitPrice >= 0)
    }

    if (!request.usePricesWithoutVat) {
      const MIN_VALUE = -2147483648
      const MAX_VALUE = 2147483647

      return items.every((item) => item.unitPrice >= MIN_VALUE && item.unitPrice <= MAX_VALUE)
    }

    return items.every((item) => item.unitPrice >= 0)
  }

  defaultMessage(args: ValidationArguments): string {
    const request = args.object as CreatePaymentRequest

    const isShopInShopItem = request.items[0].merchant && request.items[0].stamp && request.items[0].reference

    if (isShopInShopItem) {
      return 'Shop-in-Shop items cannot have negative unitPrice'
    }

    if (request?.usePricesWithoutVat) {
      return 'When usePricesWithoutVat is true, all items must have non-negative unitPrice values'
    }

    return 'Each item.unitPrice must be between -2147483648 and 2147483647'
  }
}

/**
 * Custom decorator for validating unitPrice with context awareness
 * @param ValidateItemPrices
 */
export function ValidateItemPrices(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateItemPricesConstraint
    })
  }
}
