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
exports.CreatePaymentRequest = void 0;
const class_validator_1 = require("class-validator");
const item_model_1 = require("./request-model/item.model");
const customer_model_1 = require("./request-model/customer.model");
const address_model_1 = require("./request-model/address.model");
const callback_url_model_1 = require("./request-model/callback-url.model");
const payment_method_group_model_1 = require("./request-model/payment-method-group.model");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
/**
 * Class CreatePaymentRequest
 *
 * This class is used to create a payment request object
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=create-request-body
 */
class CreatePaymentRequest {
}
exports.CreatePaymentRequest = CreatePaymentRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentRequest.prototype, "stamp", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentRequest.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(99999999),
    __metadata("design:type", Number)
], CreatePaymentRequest.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentRequest.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentRequest.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentRequest.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => item_model_1.Item),
    __metadata("design:type", Array)
], CreatePaymentRequest.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => customer_model_1.Customer),
    __metadata("design:type", customer_model_1.Customer
    /**
     * Delivery address.
     */
    )
], CreatePaymentRequest.prototype, "customer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => address_model_1.Address),
    __metadata("design:type", address_model_1.Address
    /**
     * Invoicing address.
     */
    )
], CreatePaymentRequest.prototype, "deliveryAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => address_model_1.Address),
    __metadata("design:type", address_model_1.Address
    /**
     * If paid with invoice payment method, the invoice will not be activated automatically immediately.
     * Currently only supported with Walley/Collector.
     */
    )
], CreatePaymentRequest.prototype, "invoicingAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePaymentRequest.prototype, "manualInvoiceActivation", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => callback_url_model_1.CallbackUrl),
    __metadata("design:type", callback_url_model_1.CallbackUrl
    /**
     * Which url to ping after this payment is paid or cancelled.
     */
    )
], CreatePaymentRequest.prototype, "redirectUrls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => callback_url_model_1.CallbackUrl),
    __metadata("design:type", callback_url_model_1.CallbackUrl
    /**
     * Callback URL polling delay in seconds.
     */
    )
], CreatePaymentRequest.prototype, "callbackUrls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaymentRequest.prototype, "callbackDelay", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payment_method_group_model_1.PaymentMethodGroup, { each: true }),
    __metadata("design:type", Array)
], CreatePaymentRequest.prototype, "groups", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePaymentRequest.prototype, "usePricesWithoutVat", void 0);
