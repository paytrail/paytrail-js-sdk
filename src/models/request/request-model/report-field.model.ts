/**
 * Enum ReportFields
 *
 * Limit the fields that will be included in the report. Leaving this empty will include all fields
 * @see https://docs.paytrail.com/#/?id=payment-report-request-by-settlement-id
 *
 */
export enum ReportFields {
  ENTRYDATE = 'entryDate',
  CREATED = 'created',
  AMOUNT = 'amount',
  STATUS = 'status',
  FIRSTNAME = 'firstname',
  FAMILY_NAME = 'familyname',
  DESCRIPTION = 'description',
  REFERENCE = 'reference',
  PAYMENT_METHOD = 'paymentMethod',
  STAMP = 'stamp',
  ADDRESS = 'address',
  POSTCODE = 'postcode',
  POSTOFFICE = 'postoffice',
  COUNTRY = 'country',
  CHECKOUT_REFERENCE = 'checkoutReference',
  ARCHIVE_NUMBER = 'archiveNumber',
  PAYER_NAME = 'payerName',
  SETTLEMENT_ID = 'settlementId',
  SETTLEMENT_DATE = 'settlementDate',
  SETTLEMENT_REFERENCE = 'settlementReference',
  ORIGINAL_TRADE_REFERENCE = 'originalTradeReference',
  VAT_PERCENTAGE = 'vatPercentage',
  VAT_AMOUNT = 'vatAmount',
  PAYMENT_METHOD_FEE = 'paymentMethodFee',
  PAYMENT_METHOD_COMMISSION = 'paymentMethodCommission',
  SHOP_IN_SHOP_COMMISSION = 'shopInShopCommission',
  SHOP_IN_SHOP_COMMISSION_VAT_PERCENTAGE = 'shopInShopCommissionVatPercentage',
  SHOP_IN_SHOP_COMMISSION_VAT_AMOUNT = 'shopInShopCommissionVatAmount',
  COMPANY_NAME = 'companyName',
  VAT_ID = 'vatId',
  REFUND_ITEMS = 'refunditems'
}
