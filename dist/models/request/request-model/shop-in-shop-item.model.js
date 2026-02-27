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
exports.ShopInShopItem = void 0;
const class_validator_1 = require("class-validator");
const item_model_1 = require("./item.model");
const class_transformer_1 = require("class-transformer");
const commission_model_1 = require("./commission.model");
require("reflect-metadata");
/**
 * Class ShopInShopItem
 *
 * Shop-in-Shop item extends the base Item class with specific validations:
 * - stamp is required
 * - reference is required
 * - merchant is required
 * - commission can be given but is optional
 * - unitPrice minimum is 0 (no negative values allowed)
 */
class ShopInShopItem extends item_model_1.Item {
}
exports.ShopInShopItem = ShopInShopItem;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], ShopInShopItem.prototype, "unitPrice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShopInShopItem.prototype, "stamp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShopInShopItem.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShopInShopItem.prototype, "merchant", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => commission_model_1.Commission),
    __metadata("design:type", commission_model_1.Commission)
], ShopInShopItem.prototype, "commission", void 0);
