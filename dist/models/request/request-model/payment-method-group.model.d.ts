/**
 * Enum PaymentMethodGroup
 *
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroup
 */
export declare enum PaymentMethodGroup {
    /**
     * Mobile payment methods: Pivo, Siirto, MobilePay
     */
    Mobile = "mobile",
    /**
     * Bank payment methods
     */
    Bank = "bank",
    /**
     * Visa, MasterCard, American Express
     */
    CreditCard = "creditcard",
    /**
     * Instalment and invoice payment methods: OP Lasku, Walley/Collector, Jousto, AfterPay
     */
    Credit = "credit"
}
