import { ValidationArguments, ValidatorConstraintInterface, ValidationOptions } from 'class-validator';
/**
 * Validator constraint for validating unitPrice based on context
 */
export declare class IsValidUnitPriceConstraint implements ValidatorConstraintInterface {
    validate(unitPrice: number, args: ValidationArguments): boolean;
    /**
     * Find the payment request context from the validation context
     */
    private findPaymentRequestContext;
    defaultMessage(args: ValidationArguments): string;
}
/**
 * Custom decorator for validating unitPrice with context awareness
 * @param validationOptions
 */
export declare function IsValidUnitPrice(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
