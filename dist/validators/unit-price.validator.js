"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidUnitPrice = exports.IsValidUnitPriceConstraint = void 0;
const class_validator_1 = require("class-validator");
/**
 * Validator constraint for validating unitPrice based on context
 */
let IsValidUnitPriceConstraint = class IsValidUnitPriceConstraint {
    validate(unitPrice, args) {
        const object = args.object;
        // Check if this is a shop-in-shop item by checking for required shop-in-shop fields
        const isShopInShopItem = object.merchant && object.stamp && object.reference;
        // For shop-in-shop items, unitPrice must be >= 0
        if (isShopInShopItem && unitPrice < 0) {
            return false;
        }
        // Check if payment request has usePricesWithoutVat set to true
        // We need to check the parent payment request context
        const paymentRequest = this.findPaymentRequestContext(object);
        if ((paymentRequest === null || paymentRequest === void 0 ? void 0 : paymentRequest.usePricesWithoutVat) === true && unitPrice < 0) {
            return false;
        }
        // General validation: unitPrice must be within the valid range
        const MIN_VALUE = -2147483648;
        const MAX_VALUE = 2147483647;
        return unitPrice >= MIN_VALUE && unitPrice <= MAX_VALUE;
    }
    /**
     * Find the payment request context from the validation context
     */
    findPaymentRequestContext(object) {
        // This is a simplified approach - in real validation context,
        // we might need to traverse up the object hierarchy
        // For now, we assume the context is available through a parent reference
        if (object._paymentRequest) {
            return object._paymentRequest;
        }
        // If we can't find the payment request context, we allow negative values
        // unless it's a shop-in-shop item
        return null;
    }
    defaultMessage(args) {
        const object = args.object;
        const unitPrice = args.value;
        const isShopInShopItem = object.merchant && object.stamp && object.reference;
        if (isShopInShopItem && unitPrice < 0) {
            return 'Shop-in-Shop items cannot have negative unitPrice';
        }
        const paymentRequest = this.findPaymentRequestContext(object);
        if ((paymentRequest === null || paymentRequest === void 0 ? void 0 : paymentRequest.usePricesWithoutVat) === true && unitPrice < 0) {
            return 'Items cannot have negative unitPrice when usePricesWithoutVat is true';
        }
        return 'unitPrice must be between -2147483648 and 2147483647';
    }
};
exports.IsValidUnitPriceConstraint = IsValidUnitPriceConstraint;
exports.IsValidUnitPriceConstraint = IsValidUnitPriceConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isValidUnitPrice', async: false })
], IsValidUnitPriceConstraint);
/**
 * Custom decorator for validating unitPrice with context awareness
 * @param validationOptions
 */
function IsValidUnitPrice(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidUnitPriceConstraint
        });
    };
}
exports.IsValidUnitPrice = IsValidUnitPrice;
