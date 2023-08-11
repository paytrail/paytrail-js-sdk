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
const exception_1 = require("./exceptions/exception");
const models_1 = require("./models");
const paytrail_1 = require("./paytrail");
const axios_util_1 = require("./utils/axios.util");
const convert_object_to_class_utils_1 = require("./utils/convert-object-to-class.utils");
const signature_util_1 = require("./utils/signature.util");
const validate_error_utils_1 = require("./utils/validate-error.utils");
class PaytrailClient extends paytrail_1.Paytrail {
    constructor(configuration) {
        super(configuration);
        this.API_ENDPOINT = variable_constant_1.API_ENDPOINT;
    }
    validateHmac(hparams, body, signature, secretKey, encType) {
        return signature_util_1.Signature.validateHmac(hparams, body, signature, secretKey, encType);
    }
    listGroupedProviders(listGroupedProvidersRequest) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // Create headers
            const headers = this.getHeaders(variable_constant_1.METHOD.GET);
            // Validate payload
            const validate = (0, convert_object_to_class_utils_1.convertObjectToClass)(listGroupedProvidersRequest, models_1.ListGroupedProvidersRequest);
            const [errorValidate, isSuccess] = yield (0, validate_error_utils_1.validateError)(validate);
            if (errorValidate) {
                throw new exception_1.ValidateException(JSON.stringify(errorValidate), 400);
            }
            // Execute to Paytrail API
            const [error, res] = yield axios_util_1.api.merchants.listGroupedProviders(listGroupedProvidersRequest, headers);
            if (error) {
                throw new exception_1.RequestException((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message, (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.status);
            }
            const data = res === null || res === void 0 ? void 0 : res.data;
            return data;
        });
    }
    createPayment(createPaymentRequest) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // Create headers
            const headers = this.getHeaders(variable_constant_1.METHOD.POST, '', '', createPaymentRequest);
            // Validate payload
            const validate = (0, convert_object_to_class_utils_1.convertObjectToClass)(createPaymentRequest, models_1.CreatePaymentRequest);
            const [errorValidate, isSuccess] = yield (0, validate_error_utils_1.validateError)(validate);
            if (errorValidate) {
                throw new exception_1.ValidateException(JSON.stringify(errorValidate), 400);
            }
            // Execute to Paytrail API
            const [error, data] = yield axios_util_1.api.payments.create(createPaymentRequest, headers);
            if (error) {
                throw new exception_1.RequestException((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.meta, (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.status);
            }
            return data;
        });
    }
    createSiSPayment(createSiSPaymentResquest) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // Create headers
            const headers = this.getHeaders(variable_constant_1.METHOD.POST, '', '', createSiSPaymentResquest);
            // Validate payload
            const validate = (0, convert_object_to_class_utils_1.convertObjectToClass)(createSiSPaymentResquest, models_1.CreateSiSPaymentRequest);
            const [errorValidate, isSuccess] = yield (0, validate_error_utils_1.validateError)(validate);
            if (errorValidate) {
                throw new exception_1.ValidateException(JSON.stringify(errorValidate), 400);
            }
            // Execute to Paytrail API
            const [error, data] = yield axios_util_1.api.payments.create(createSiSPaymentResquest, headers);
            if (error) {
                throw new exception_1.RequestException((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.meta, (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.status);
            }
            return data;
        });
    }
}
exports.PaytrailClient = PaytrailClient;
