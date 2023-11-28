"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = void 0;
/**
 * Enum PaymentStatus
 *
 * How are the payments statuses filtered. "default" includes both paid and settled payments, "paid" includes paid payments that have not been settled yet, "all" includes everything, for example unpaid or failed payments and "settled" only includes settled payments.
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroup
 */
var PaymentStatus;
(function (PaymentStatus) {
    /**
     * default includes both paid and settled payments.
     */
    PaymentStatus["DEFAULT"] = "default";
    /**
     * paid includes paid payments that have not been settled yet.
     */
    PaymentStatus["PAID"] = "paid";
    /**
     * all includes everything, for example unpaid or failed payments.
     */
    PaymentStatus["ALL"] = "all";
    /**
     * settled only includes settled payments.
     */
    PaymentStatus["SETTLED"] = "settled ";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
