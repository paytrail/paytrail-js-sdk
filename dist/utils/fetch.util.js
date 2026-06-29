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
const variable_constant_1 = require("../constants/variable.constant");
const handle_request_util_1 = require("./handle-request.util");
const convert_object_keys_util_1 = require("./convert-object-keys.util");
const apiEndpoint = variable_constant_1.API_ENDPOINT;
const buildHeaders = (extra) => {
    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    if (extra) {
        for (const key of Object.keys(extra)) {
            headers.set(key, String(extra[key]));
        }
    }
    return headers;
};
const readErrorBody = (response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const contentType = response.headers.get('content-type');
    if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('application/json')) {
        return response.json().catch(() => ({}));
    }
    yield ((_a = response.body) === null || _a === void 0 ? void 0 : _a.cancel());
    return {};
});
exports.requests = {
    get: (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'GET',
            headers: buildHeaders(headers)
        });
        if (!response.ok) {
            const errorData = yield readErrorBody(response);
            const error = new Error((errorData === null || errorData === void 0 ? void 0 : errorData.message) || response.statusText);
            error.response = { status: response.status, data: errorData };
            throw error;
        }
        return response.json();
    }),
    post: (url, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'POST',
            headers: buildHeaders(headers),
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const errorData = yield readErrorBody(response);
            const error = new Error((errorData === null || errorData === void 0 ? void 0 : errorData.message) || response.statusText);
            error.response = { status: response.status, data: errorData };
            throw error;
        }
        return response.json();
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
const createAddCardFormRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${apiEndpoint}/tokenization/addcard-form`, {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify((0, convert_object_keys_util_1.convertObjectKeys)(payload)),
        redirect: 'manual'
    });
    if (response.status >= 400) {
        const errorData = yield response.json().catch(() => ({}));
        throw { status: response.status, message: (errorData === null || errorData === void 0 ? void 0 : errorData.message) || response.statusText };
    }
    const location = response.headers.get('location');
    if (location && location.trim() !== '') {
        return { data: { redirectUrl: location }, message: 'Success', status: 200 };
    }
    const data = yield response.json().catch(() => null);
    if (data && typeof data.redirectUrl === 'string') {
        return { data: { redirectUrl: data.redirectUrl }, message: 'Success', status: 200 };
    }
    throw { status: 500, message: 'Missing or invalid redirectUrl in response' };
});
const tokenPayments = {
    createGetToken: (param, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/tokenization/${param.checkoutTokenizationId}`, {}, headers)),
    createMitPayment: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/mit/charge`, payload, headers)),
    createMitPaymentAuthorizationHold: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/mit/authorization-hold`, payload, headers)),
    createCitPaymentCharge: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/cit/charge`, payload, headers)),
    createCitPaymentAuthorizationHold: (payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/token/cit/authorization-hold`, payload, headers)),
    createMitOrCitPaymentCommit: (params, payload, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/${params.transactionId}/token/commit`, payload, headers)),
    revertPaymentAuthorizationHold: (params, headers) => (0, handle_request_util_1.handleRequest)(exports.requests.post(`${apiEndpoint}/payments/${params.transactionId}/token/revert`, {}, headers)),
    createAddCardFormRequest
};
exports.api = {
    merchants,
    payments,
    paymentReports,
    settlements,
    tokenPayments
};
