"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodGroup = void 0;
/**
 * Enum PaymentMethodGroup
 *
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroup
 */
var PaymentMethodGroup;
(function (PaymentMethodGroup) {
    /**
     * Mobile payment methods: Pivo, Siirto, MobilePay
     */
    PaymentMethodGroup["Mobile"] = "mobile";
    /**
     * Bank payment methods
     */
    PaymentMethodGroup["Bank"] = "bank";
    /**
     * Visa, MasterCard, American Express
     */
    PaymentMethodGroup["CreditCard"] = "creditcard";
    /**
     * Instalment and invoice payment methods: OP Lasku, Walley/Collector, Jousto, AfterPay
     */
    PaymentMethodGroup["Credit"] = "credit";
})(PaymentMethodGroup || (exports.PaymentMethodGroup = PaymentMethodGroup = {}));
