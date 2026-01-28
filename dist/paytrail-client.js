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
exports.PaytrailClient = void 0;
const variable_constant_1 = require("./constants/variable.constant");
const models_1 = require("./models");
const paytrail_1 = require("./paytrail");
const axios_util_1 = require("./utils/axios.util");
const convert_object_keys_util_1 = require("./utils/convert-object-keys.util");
const convert_object_to_class_utils_1 = require("./utils/convert-object-to-class.utils");
const signature_util_1 = require("./utils/signature.util");
const validate_error_utils_1 = require("./utils/validate-error.utils");
/**
 * Class PaytrailClient
 *
 * The PaytrailClient is the connector class for the API.
 *
 */
class PaytrailClient extends paytrail_1.Paytrail {
    constructor() {
        super(...arguments);
        /**
         * The Paytrail API endpoint.
         */
        this.API_ENDPOINT = variable_constant_1.API_ENDPOINT;
    }
    validateHmac(hparams, body, signature, secretKey, encType) {
        return signature_util_1.Signature.validateHmac(hparams, body, signature, secretKey, encType);
    }
    listGroupedProviders(listGroupedProvidersRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.GET);
                return yield this.callApi(() => axios_util_1.api.merchants.listGroupedProviders(listGroupedProvidersRequest, headers), models_1.ListGroupedProvidersResponse, null, null, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(listGroupedProvidersRequest, models_1.ListGroupedProvidersRequest)));
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createPayment(createPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, createPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.payments.create(createPaymentRequest, headers), models_1.CreatePaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(createPaymentRequest, models_1.CreatePaymentRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createShopInShopPayment(createSiSPaymentResquest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, createSiSPaymentResquest);
                return yield this.callApi(() => axios_util_1.api.payments.createSiSPayment(createSiSPaymentResquest, headers), models_1.CreateSiSPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(createSiSPaymentResquest, models_1.CreateSiSPaymentRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    getPaymentStatus(getPaymentStatusRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.GET, getPaymentStatusRequest.transactionId);
                return yield this.callApi(() => axios_util_1.api.payments.getPaymentStatus(getPaymentStatusRequest, headers), models_1.GetPaymentStatusResponse, null, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(getPaymentStatusRequest, models_1.GetPaymentStatusRequest)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createRefund(createRefundParams, createRefundRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, createRefundParams.transactionId, null, createRefundRequest);
                return yield this.callApi(() => axios_util_1.api.payments.createRefund(createRefundParams, createRefundRequest, headers), models_1.CreateRefundResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(createRefundRequest, models_1.CreateRefundRequest)), () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(createRefundParams, models_1.CreateRefundParams)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    emailRefund(emailRefundParams, emailRefundRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, emailRefundParams.transactionId, null, emailRefundRequest);
                return yield this.callApi(() => axios_util_1.api.payments.emailRefunds(emailRefundParams, emailRefundRequest, headers), models_1.EmailRefundResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(emailRefundRequest, models_1.EmailRefundRequest)), () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(emailRefundParams, models_1.EmailRefundParams)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    paymentReportRequest(paymentReportRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, paymentReportRequest);
                return yield this.callApi(() => axios_util_1.api.paymentReports.paymentReportRequest(paymentReportRequest, headers), models_1.PaymentReportResponse, null, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(paymentReportRequest, models_1.PaymentReportRequest)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    requestSettlements(settlementsRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.GET);
                return yield this.callApi(() => axios_util_1.api.settlements.get(settlementsRequest, headers), models_1.SettlementsResponse, null, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(settlementsRequest, models_1.SettlementsRequest)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createGetTokenRequest(getTokenRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, getTokenRequest.checkoutTokenizationId, {});
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createGetToken(getTokenRequest, headers), models_1.GetTokenResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(getTokenRequest, models_1.GetTokenRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createMitPaymentCharge(mitPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, mitPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createMitPayment(mitPaymentRequest, headers), models_1.MitPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(mitPaymentRequest, models_1.MitPaymentRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createMitPaymentAuthorizationHold(mitPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, mitPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createMitPaymentAuthorizationHold(mitPaymentRequest, headers), models_1.MitPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(mitPaymentRequest, models_1.MitPaymentRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createCitPaymentCharge(createCitPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, createCitPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createCitPaymentCharge(createCitPaymentRequest, headers), models_1.CreateCitPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(createCitPaymentRequest, models_1.CreateCitPaymentRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createCitPaymentAuthorizationHold(createCitPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, null, null, createCitPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createCitPaymentAuthorizationHold(createCitPaymentRequest, headers), models_1.CreateCitPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(createCitPaymentRequest, models_1.CreateCitPaymentRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createMitPaymentCommit(mitPaymentParams, mitPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, mitPaymentParams.transactionId, null, mitPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createMitOrCitPaymentCommit(mitPaymentParams, mitPaymentRequest, headers), models_1.MitPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(mitPaymentRequest, models_1.MitPaymentRequest)), () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(mitPaymentParams, models_1.MitPaymentParams)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createCitPaymentCommit(citPaymentParams, citPaymentRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, citPaymentParams.transactionId, null, citPaymentRequest);
                return yield this.callApi(() => axios_util_1.api.tokenPayments.createMitOrCitPaymentCommit(citPaymentParams, citPaymentRequest, headers), models_1.CreateCitPaymentResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(citPaymentRequest, models_1.CreateCitPaymentRequest)), () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(citPaymentParams, models_1.CreateCitPaymentParams)), null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    revertPaymentAuthorizationHold(revertPaymentAuthHoldRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers = this.getHeaders(variable_constant_1.METHOD.POST, revertPaymentAuthHoldRequest.transactionId, null, {});
                return yield this.callApi(() => axios_util_1.api.tokenPayments.revertPaymentAuthorizationHold(revertPaymentAuthHoldRequest, headers), models_1.RevertPaymentAuthHoldResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(revertPaymentAuthHoldRequest, models_1.RevertPaymentAuthHoldRequest)), null, null);
            }
            catch (error) {
                throw new Error(error === null || error === void 0 ? void 0 : error.message);
            }
        });
    }
    createAddCardFormRequest(addCardFormRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line no-useless-catch
            try {
                addCardFormRequest.checkoutAccount = this.merchantId;
                addCardFormRequest.checkoutAlgorithm = 'sha256';
                addCardFormRequest.checkoutMethod = 'POST';
                const currentDate = new Date().toISOString();
                addCardFormRequest.checkoutTimestamp = currentDate;
                addCardFormRequest.checkoutNonce = signature_util_1.Signature.encodeMD5(currentDate);
                const converted = (0, convert_object_keys_util_1.convertObjectKeys)(addCardFormRequest);
                const hparams = {};
                Object.keys(converted).forEach((key) => {
                    if (key.startsWith('checkout-')) {
                        hparams[key] = converted[key];
                    }
                });
                addCardFormRequest.signature = signature_util_1.Signature.calculateHmac(this.secretKey, hparams, '');
                return yield this.callApi(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const data = yield axios_util_1.api.tokenPayments.createAddCardFormRequest(addCardFormRequest);
                        // If the response is { data: { redirectUrl } }
                        if (data && 'data' in data && data.data && 'redirectUrl' in data.data) {
                            return [undefined, data.data];
                        }
                        return [undefined, data];
                    }
                    catch (error) {
                        // If error is an object with status, pass it as the first tuple element
                        if (error && typeof error === 'object' && 'status' in error) {
                            return [error, undefined];
                        }
                        // Otherwise, treat as generic error
                        return [error, undefined];
                    }
                }), models_1.AddCardFormResponse, () => (0, validate_error_utils_1.validateError)((0, convert_object_to_class_utils_1.convertObjectToClass)(addCardFormRequest, models_1.AddCardFormRequest)), null, null);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.PaytrailClient = PaytrailClient;
