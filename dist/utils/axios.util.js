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
exports.api = exports.requests = void 0;
const axios_1 = require("axios");
const variable_constant_1 = require("../constants/variable.constant");
const handle_request_util_1 = require("./handle-request.util");
const convert_object_keys_util_1 = require("./convert-object-keys.util");
const apiEndpoint = variable_constant_1.API_ENDPOINT;
axios_1.default.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
});
exports.requests = {
    get: (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
        return (0, axios_1.default)({
            method: 'get',
            url,
            headers
        }).then((res) => res.data);
    }),
    post: (url, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
        if (headers) {
            return (0, axios_1.default)({
                method: 'post',
                url,
                headers,
                data: body
            }).then((res) => res.data);
        }
        return (0, axios_1.default)({
            method: 'post',
            url,
            data: body
        }).then((res) => res.data);
    })
};
const convertQuery = (param) => {
    return Object.keys(param)
        .map((key) => `${key}=${param[key]}`)
        .join('&');
};
const merchants = {
    listGroupedProviders: (query, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.get(`${apiEndpoint}/merchants/grouped-payment-providers?${convertQuery(query)}`, headers))
};
const payments = {
    create: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments`, payload, headers)),
    createSiSPayment: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments`, payload, headers)),
    getPaymentStatus: (param, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.get(`${apiEndpoint}/payments/${param.transactionId}`, headers)),
    createRefund: (params, payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund`, payload, headers)),
    emailRefunds: (params, payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/${params.transactionId}/refund/email`, payload, headers))
};
const paymentReports = {
    paymentReportRequest: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/report`, payload, headers))
};
const settlements = {
    get: (query, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.get(`${apiEndpoint}/settlements?${convertQuery(query)}`, headers))
};
const tokenPayments = {
    createGetToken: (param, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/tokenization/${param.checkoutTokenizationId}`, {}, headers)),
    createMitPayment: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/mit/charge`, payload, headers)),
    createMitPaymentAuthorizationHold: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/mit/authorization-hold`, payload, headers)),
    createCitPaymentCharge: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/cit/charge`, payload, headers)),
    createCitPaymentAuthorizationHold: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/cit/authorization-hold`, payload, headers)),
    createMitOrCitPaymentCommit: (params, payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/${params.transactionId}/token/commit`, payload, headers)),
    revertPaymentAuthorizationHold: (params, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/${params.transactionId}/token/revert`, {}, headers)),
    createAddCardFormRequest: (payload) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/tokenization/addcard-form`, (0, convert_object_keys_util_1.convertObjectKeys)(payload)))
};
exports.api = {
    merchants,
    payments,
    paymentReports,
    settlements,
    tokenPayments
};
