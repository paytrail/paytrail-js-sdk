"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportFields = void 0;
/**
 * Enum ReportFields
 *
 * Limit the fields that will be included in the report. Leaving this empty will include all fields
 * @see https://docs.paytrail.com/#/?id=payment-report-request-by-settlement-id
 *
 */
var ReportFields;
(function (ReportFields) {
    ReportFields["ENTRYDATE"] = "entryDate";
    ReportFields["CREATED"] = "created";
    ReportFields["AMOUNT"] = "amount";
    ReportFields["STATUS"] = "status";
    ReportFields["FIRSTNAME"] = "firstname";
    ReportFields["FAMILY_NAME"] = "familyname";
    ReportFields["DESCRIPTION"] = "description";
    ReportFields["REFERENCE"] = "reference";
    ReportFields["PAYMENT_METHOD"] = "paymentMethod";
    ReportFields["STAMP"] = "stamp";
    ReportFields["ADDRESS"] = "address";
    ReportFields["POSTCODE"] = "postcode";
    ReportFields["POSTOFFICE"] = "postoffice";
    ReportFields["COUNTRY"] = "country";
    ReportFields["CHECKOUT_REFERENCE"] = "checkoutReference";
    ReportFields["ARCHIVE_NUMBER"] = "archiveNumber";
    ReportFields["PAYER_NAME"] = "payerName";
    ReportFields["SETTLEMENT_ID"] = "settlementId";
    ReportFields["SETTLEMENT_DATE"] = "settlementDate";
    ReportFields["SETTLEMENT_REFERENCE"] = "settlementReference";
    ReportFields["ORIGINAL_TRADE_REFERENCE"] = "originalTradeReference";
    ReportFields["VAT_PERCENTAGE"] = "vatPercentage";
    ReportFields["VAT_AMOUNT"] = "vatAmount";
    ReportFields["PAYMENT_METHOD_FEE"] = "paymentMethodFee";
    ReportFields["PAYMENT_METHOD_COMMISSION"] = "paymentMethodCommission";
    ReportFields["SHOP_IN_SHOP_COMMISSION"] = "shopInShopCommission";
    ReportFields["SHOP_IN_SHOP_COMMISSION_VAT_PERCENTAGE"] = "shopInShopCommissionVatPercentage";
    ReportFields["SHOP_IN_SHOP_COMMISSION_VAT_AMOUNT"] = "shopInShopCommissionVatAmount";
    ReportFields["COMPANY_NAME"] = "companyName";
    ReportFields["VAT_ID"] = "vatId";
    ReportFields["REFUND_ITEMS"] = "refunditems";
})(ReportFields || (exports.ReportFields = ReportFields = {}));
