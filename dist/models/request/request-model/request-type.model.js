"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestType = void 0;
/**
 * Enum RequestType
 *
 * In which format will the response be delivered in, currently supported are json and csv.
 * @see https://docs.paytrail.com/#/?id=payment-report-request
 *
 */
var RequestType;
(function (RequestType) {
    RequestType["JSON"] = "json";
    RequestType["CSV"] = "csv";
})(RequestType || (exports.RequestType = RequestType = {}));
