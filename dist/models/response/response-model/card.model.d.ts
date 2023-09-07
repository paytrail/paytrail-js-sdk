/**
 * Class Card
 */
export declare class Card {
    /**
     * Card type, for example 'Visa'.
     */
    type: string;
    /**
     * First 2 or 6 digits of the card number. (6 MC/VISA, 2 Amex/Diners)
     */
    bin: string;
    /**
     * Last four digits of the card.
     */
    partial_pan: string;
    /**
     * Card expiration year.
     */
    expire_year: string;
    /**
     * Card expiration month.
     */
    expire_month: string;
    /**
     * Whether the CVC is required for paying with this card. Can be one of yes, no or not_tested.
     */
    cvc_required: string;
    /**
     * credit, debit or unknown.
     */
    funding: string;
    /**
     * business, prepaid or unknown.
     */
    category: string;
    /**
     * e.g. FI
     */
    country_code: string;
    /**
     * Identifies a specific card number.
     * Cards with the same PAN but different expiry dates will have the same PAN fingerprint.
     * Hex string of length 64.
     */
    pan_fingerprint: string;
    /**
     * Identifies a specific card, including the expiry date. Hex string of length 64.
     */
    card_fingerprint: string;
}
