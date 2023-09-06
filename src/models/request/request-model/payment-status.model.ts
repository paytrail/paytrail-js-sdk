/**
 * Enum PaymentStatus
 *
 * How are the payments statuses filtered. "default" includes both paid and settled payments, "paid" includes paid payments that have not been settled yet, "all" includes everything, for example unpaid or failed payments and "settled" only includes settled payments.
 * @see https://docs.paytrail.com/#/?id=paymentmethodgroup
 */
export enum PaymentStatus {
  /**
   * default includes both paid and settled payments.
   */
  DEFAULT = 'default',

  /**
   * paid includes paid payments that have not been settled yet.
   */
  PAID = 'paid',

  /**
   * all includes everything, for example unpaid or failed payments.
   */
  ALL = 'all',

  /**
   * settled only includes settled payments.
   */
  SETTLED = 'settled '
}
