import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator, ValidationOptions } from 'class-validator'

/**
 * Validator constraint for validating unitPrice based on context
 */
@ValidatorConstraint({ name: 'isValidUnitPrice', async: false })
export class IsValidUnitPriceConstraint implements ValidatorConstraintInterface {
  validate(unitPrice: number, args: ValidationArguments): boolean {
    const object = args.object as any

    // Check if this is a shop-in-shop item by checking for required shop-in-shop fields
    const isShopInShopItem = object.merchant && object.stamp && object.reference

    // For shop-in-shop items, unitPrice must be >= 0
    if (isShopInShopItem && unitPrice < 0) {
      return false
    }

    // Check if payment request has usePricesWithoutVat set to true
    // We need to check the parent payment request context
    const paymentRequest = this.findPaymentRequestContext(object)
    if (paymentRequest?.usePricesWithoutVat === true && unitPrice < 0) {
      return false
    }

    // General validation: unitPrice must be within the valid range
    const MIN_VALUE = -2147483648
    const MAX_VALUE = 2147483647
    return unitPrice >= MIN_VALUE && unitPrice <= MAX_VALUE
  }

  /**
   * Find the payment request context from the validation context
   */
  private findPaymentRequestContext(object: any): any {
    // This is a simplified approach - in real validation context,
    // we might need to traverse up the object hierarchy
    // For now, we assume the context is available through a parent reference
    if (object._paymentRequest) {
      return object._paymentRequest
    }

    // If we can't find the payment request context, we allow negative values
    // unless it's a shop-in-shop item
    return null
  }

  defaultMessage(args: ValidationArguments): string {
    const object = args.object as any
    const unitPrice = args.value as number
    
    const isShopInShopItem = object.merchant && object.stamp && object.reference
    
    if (isShopInShopItem && unitPrice < 0) {
      return 'Shop-in-Shop items cannot have negative unitPrice'
    }

    const paymentRequest = this.findPaymentRequestContext(object)
    if (paymentRequest?.usePricesWithoutVat === true && unitPrice < 0) {
      return 'Items cannot have negative unitPrice when usePricesWithoutVat is true'
    }

    return 'unitPrice must be between -2147483648 and 2147483647'
  }
}

/**
 * Custom decorator for validating unitPrice with context awareness
 * @param validationOptions
 */
export function IsValidUnitPrice(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidUnitPriceConstraint
    })
  }
}