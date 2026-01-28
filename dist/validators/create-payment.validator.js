"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateItemPrices = exports.ValidateItemPricesConstraint = void 0;
const class_validator_1 = require("class-validator");
/**
 * Validator constraint for validating items array
 */
let ValidateItemPricesConstraint = class ValidateItemPricesConstraint {
    validate(items, args) {
        const request = args.object;
        if (!items)
            return true;
        // Check if this is a shop-in-shop item by checking for required shop-in-shop fields
        const isShopInShopItem = request.items[0].merchant && request.items[0].stamp && request.items[0].reference;
        // For shop-in-shop items, unitPrice must be >= 0
        if (isShopInShopItem) {
            return items.every((item) => item.unitPrice >= 0);
        }
        if (!request.usePricesWithoutVat) {
            const MIN_VALUE = -2147483648;
            const MAX_VALUE = 2147483647;
            return items.every((item) => item.unitPrice >= MIN_VALUE && item.unitPrice <= MAX_VALUE);
        }
        return items.every((item) => item.unitPrice >= 0);
    }
    defaultMessage(args) {
        const request = args.object;
        const isShopInShopItem = request.items[0].merchant && request.items[0].stamp && request.items[0].reference;
        if (isShopInShopItem) {
            return 'Shop-in-Shop items cannot have negative unitPrice';
        }
        if (request === null || request === void 0 ? void 0 : request.usePricesWithoutVat) {
            return 'When usePricesWithoutVat is true, all items must have non-negative unitPrice values';
        }
        return 'Each item.unitPrice must be between -2147483648 and 2147483647';
    }
};
exports.ValidateItemPricesConstraint = ValidateItemPricesConstraint;
exports.ValidateItemPricesConstraint = ValidateItemPricesConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'validateItemPrices', async: false })
], ValidateItemPricesConstraint);
/**
 * Custom decorator for validating unitPrice with context awareness
 * @param ValidateItemPrices
 */
function ValidateItemPrices(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ValidateItemPricesConstraint
        });
    };
}
exports.ValidateItemPrices = ValidateItemPrices;
