"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRefundData = exports.EmailRefundResponse = void 0;
const create_refund_model_1 = require("./create-refund.model");
const response_model_1 = require("./response-model");
class EmailRefundResponse extends response_model_1.Response {
}
exports.EmailRefundResponse = EmailRefundResponse;
class EmailRefundData extends create_refund_model_1.CreateRefundResponse {
}
exports.EmailRefundData = EmailRefundData;
