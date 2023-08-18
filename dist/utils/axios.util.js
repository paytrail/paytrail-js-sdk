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
exports.api = void 0;
const axios_1 = require("axios");
const variable_constant_1 = require("../constants/variable.constant");
const handle_request_util_1 = require("./handle-request.util");
const apiEndpoint = variable_constant_1.API_ENDPOINT;
// Config Axios
axios_1.default.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    return config;
});
const requests = {
    get: (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
        if (headers) {
            return (0, axios_1.default)({
                method: 'get',
                url,
                headers
            });
        }
        return (0, axios_1.default)({
            method: 'get',
            url
        });
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
    }),
    delete: (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
        if (headers) {
            return (0, axios_1.default)({
                method: 'delete',
                url,
                headers
            }).then((res) => res.data);
        }
        return (0, axios_1.default)({
            method: 'delete',
            url
        }).then((res) => res.data);
    }),
    put: (url, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
        if (headers) {
            return (0, axios_1.default)({
                method: 'put',
                url,
                headers,
                data: body
            }).then((res) => res.data);
        }
        return (0, axios_1.default)({
            method: 'put',
            url,
            data: body
        }).then((res) => res.data);
    }),
    patch: (url, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
        if (headers) {
            return (0, axios_1.default)({
                method: 'patch',
                url,
                headers,
                data: body
            }).then((res) => res.data);
        }
        return (0, axios_1.default)({
            method: 'patch',
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
// Execute Paytrail API
const merchants = {
    listGroupedProviders: (payload, headers) => (0, handle_request_util_1.handleRequest)(requests.get(`${apiEndpoint}/merchants/grouped-payment-providers?${convertQuery(payload)}`, headers))
};
// Execute Paytrail API
const payments = {
    create: (payload, headers) => (0, handle_request_util_1.handleRequest)(requests.post(`${apiEndpoint}/payments`, payload, headers)),
    createSiSPayment: (payload, headers) => (0, handle_request_util_1.handleRequest)(requests.post(`${apiEndpoint}/payments`, payload, headers))
};
exports.api = {
    merchants,
    payments
};
