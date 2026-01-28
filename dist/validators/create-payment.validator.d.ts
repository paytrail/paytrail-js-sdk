import { ValidationArguments, ValidatorConstraintInterface, ValidationOptions } from 'class-validator';
import { Item } from '../models';
/**
 * Validator constraint for validating items array
 */
export declare class ValidateItemPricesConstraint implements ValidatorConstraintInterface {
    validate(items: Item[], args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
/**
 * Custom decorator for validating unitPrice with context awareness
 * @param ValidateItemPrices
 */
export declare function ValidateItemPrices(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
