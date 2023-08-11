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
exports.ListGroupedProvidersRequest = void 0;
const class_validator_1 = require("class-validator");
const payment_method_group_model_1 = require("./request-model/payment-method-group.model");
class ListGroupedProvidersRequest {
}
exports.ListGroupedProvidersRequest = ListGroupedProvidersRequest;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(99999999),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ListGroupedProvidersRequest.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(payment_method_group_model_1.PaymentMethodGroup, { each: true }),
    __metadata("design:type", Array)
], ListGroupedProvidersRequest.prototype, "groups", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ListGroupedProvidersRequest.prototype, "language", void 0);
