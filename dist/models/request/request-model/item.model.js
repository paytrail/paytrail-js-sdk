"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const class_validator_1 = require("class-validator");
const commission_model_1 = require("./commission.model");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
/**
 * Class Item
 *
 * This class defines payment item details.
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=item
 */
class Item {
}
exports.Item = Item;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Item.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], Item.prototype, "units", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 1 }, { message: 'VAT percentage values between 0 and 100 are allowed with one number in decimal part' }),
    (0, class_validator_1.Min)(0, { message: 'VAT percentage values between 0 and 100 are allowed with one number in decimal part' }),
    (0, class_validator_1.Max)(100, { message: 'VAT percentage values between 0 and 100 are allowed with one number in decimal part' }),
    __metadata("design:type", Number)
], Item.prototype, "vatPercentage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], Item.prototype, "productCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Item.prototype, "deliveryDate", void 0);
__decorate([
    (0, class_validator_1.Length)(0, 1000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Item.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], Item.prototype, "stamp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], Item.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 50),
    __metadata("design:type", String)
], Item.prototype, "merchant", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => commission_model_1.Commission),
    __metadata("design:type", commission_model_1.Commission)
], Item.prototype, "commission", void 0);
