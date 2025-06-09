/**
 * Class NetworkToken
 */
export class NetworkToken {
  /**
   * Type of the card.
   */
  type: string

  /**
   * Last four digits of the card.
   */
  partial_pan: string

  /**
   * Card expiration year.
   */
  expire_year: string

  /**
   * Card expiration month.
   */
  expire_month: string

  /**
   * Card illustration.
   */
  image_url?: string

  /**
   * Reference to the card. Only present for type 'Visa' cards.
   */
  payment_account_reference?: string
}
