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
exports.PaymentReportRequest = void 0;
const class_validator_1 = require("class-validator");
const request_type_model_1 = require("./request-model/request-type.model");
const payment_status_model_1 = require("./request-model/payment-status.model");
class PaymentReportRequest {
}
exports.PaymentReportRequest = PaymentReportRequest;
__decorate([
    (0, class_validator_1.IsEnum)(request_type_model_1.RequestType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PaymentReportRequest.prototype, "requestType", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PaymentReportRequest.prototype, "callbackUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(payment_status_model_1.PaymentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaymentReportRequest.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PaymentReportRequest.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PaymentReportRequest.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(50000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaymentReportRequest.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PaymentReportRequest.prototype, "reportFields", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaymentReportRequest.prototype, "submerchant", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PaymentReportRequest.prototype, "includeItems", void 0);
