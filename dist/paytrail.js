"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paytrail = void 0;
const exception_1 = require("./exceptions/exception");
const signature_util_1 = require("./utils/signature.util");
class Paytrail {
    constructor(param) {
        this.merchantId = param.merchantId;
        this.secretKey = param.secretKey;
        this.platformName = param.platformName;
    }
    getHeaders(method, transactionId = '', checkoutTokenizationId = '', body = '') {
        const currentDate = new Date().toISOString();
        // Header for calculation HMAC
        const headers = {
            'checkout-account': this.merchantId,
            'checkout-algorithm': 'sha256',
            'checkout-method': method.toUpperCase(),
            'checkout-nonce': signature_util_1.Signature.encodeMD5(currentDate),
            'checkout-timestamp': currentDate
        };
        if (transactionId) {
            headers['checkout-transaction-id'] = transactionId;
        }
        if (checkoutTokenizationId) {
            headers['checkout-tokenization-id'] = checkoutTokenizationId;
        }
        // Caculation HMAC
        const hmac = signature_util_1.Signature.calculateHmac(this.secretKey, headers, body, 'sha256');
        if (hmac)
            headers['signature'] = hmac;
        headers['platform-name'] = this.platformName;
        return headers;
    }
    validateRequestItem(item) {
        const [isPassValidate, message] = item.validate();
        if (!isPassValidate) {
            throw new exception_1.ValidateException(message, 400);
        }
        return true;
    }
}
exports.Paytrail = Paytrail;
