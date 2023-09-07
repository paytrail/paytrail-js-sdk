"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paytrail = void 0;
const message_response_constant_1 = require("./constants/message-response.constant");
const signature_util_1 = require("./utils/signature.util");
class Paytrail {
    constructor(param) {
        this.merchantId = param.merchantId;
        this.secretKey = param.secretKey;
        this.platformName = param.platformName;
    }
    /**
     * Format request headers.
     *
     * @param {string} method - The request method. GET or POST.
     * @param {string | null} transactionId - Paytrail transaction ID when accessing a single transaction.
     *                                       Not required for a new payment request.
     * @param {string | null} checkoutTokenizationId - Paytrail tokenization ID for getToken request.
     * @param {Record<string, string | number | object> | ''} body - The request body.
     *
     * @returns {Record<string, string | number>} An object representing the request headers.
     */
    getHeaders(method, transactionId, checkoutTokenizationId, body = '') {
        const currentDate = new Date().toISOString();
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
        const hmac = signature_util_1.Signature.calculateHmac(this.secretKey, headers, body, 'sha256');
        if (hmac)
            headers['signature'] = hmac;
        headers['platform-name'] = this.platformName;
        return headers;
    }
    /**
     * Handle API response and return an instance of the specified class.
     *
     * @param {string} type - The response type.
     * @param {T} targetClass - The target class to instantiate.
     * @param {any} data - The response data.
     * @param {{ message: string | boolean; status: number }} dataError - Error data.
     *
     * @returns {T} An instance of the specified class.
     */
    handleResponse(type, targetClass, data, dataError) {
        const instance = new targetClass();
        switch (type) {
            case message_response_constant_1.responseMessage.SUCCESS:
                instance.message = message_response_constant_1.responseMessage.SUCCESS;
                instance.status = message_response_constant_1.responseStatus.SUCCESS;
                instance.data = data;
                break;
            case message_response_constant_1.responseMessage.VALIDATE_FAIL:
            case message_response_constant_1.responseMessage.SIGNATURE_NULL:
            case message_response_constant_1.responseMessage.EXCEPTION:
            case message_response_constant_1.responseMessage.UNAUTHORIZED:
                instance.message = dataError === null || dataError === void 0 ? void 0 : dataError.message;
                instance.status = dataError === null || dataError === void 0 ? void 0 : dataError.status;
                break;
            default:
                instance.message = message_response_constant_1.responseMessage.SERVER_ERROR;
                instance.status = message_response_constant_1.responseStatus.SERVER_ERROR;
        }
        return instance;
    }
    /**
     * Call an API, validate the response, and return an instance of the specified class.
     *
     * @param {() => Promise<any>} getData - A function that fetches data from the API.
     * @param {new () => T} targetClass - The target class to instantiate.
     * @param {() => Promise<any>} validateMessagePayload - A function to validate the message payload.
     * @param {() => Promise<any>} validateMessageParam - A function to validate message parameters.
     * @param {() => Promise<any>} validateMessageQuery - A function to validate message queries.
     *
     * @returns {Promise<T>} A promise that resolves to an instance of the specified class.
     */
    callApi(getData, targetClass, validateMessagePayload, validateMessageParam, validateMessageQuery) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let message = '';
            if (validateMessagePayload) {
                const errorValidatePayload = yield validateMessagePayload();
                if (errorValidatePayload) {
                    message += errorValidatePayload;
                }
            }
            if (validateMessageParam) {
                const errorValidateParam = yield validateMessageParam();
                if (errorValidateParam) {
                    message += errorValidateParam;
                }
            }
            if (validateMessageQuery) {
                const errorValidateQuery = yield validateMessageQuery();
                if (errorValidateQuery) {
                    message += errorValidateQuery;
                }
            }
            if (message) {
                return this.handleResponse(message_response_constant_1.responseMessage.VALIDATE_FAIL, targetClass, null, {
                    message,
                    status: message_response_constant_1.responseStatus.VALIDATE_FAIL
                });
            }
            const [error, data] = yield getData();
            if (error) {
                return this.handleResponse(message_response_constant_1.responseMessage.EXCEPTION, targetClass, null, {
                    message: ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.meta) || ((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message),
                    status: (_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.status
                });
            }
            return this.handleResponse(message_response_constant_1.responseMessage.SUCCESS, targetClass, data);
        });
    }
}
exports.Paytrail = Paytrail;
