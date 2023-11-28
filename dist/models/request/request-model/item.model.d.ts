import { Commission } from './commission.model';
/**
 * Class Item
 *
 * This class defines payment item details.
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=item
 */
export declare class Item {
    /**
     * Price per unit, VAT included, in each country's
     * minor unit, e.g. for Euros use cents.
     */
    unitPrice: number;
    /**
     * Quantity, how many items ordered.
     */
    units: number;
    /**
     * The VAT percentage.
     */
    vatPercentage: number;
    /**
     * Merchant product code.
     * May appear on invoices of certain payment methods.
     */
    productCode: string;
    /**
     * The delivery date.
     *
     * @deprecated
     */
    deliveryDate?: string;
    /**
     * ItemInterface description.
     * May appear on invoices of certain payment methods.
     */
    description?: string;
    /**
     * Merchant specific item category.
     */
    category?: string;
    /**
     * Item level order ID (suborder ID).
     * Mainly useful for Shop-in-Shop purchases.
     */
    orderId?: string;
    /**
     * Unique identifier for this item.
     * Required for Shop-in-Shop payments.
     */
    stamp?: string;
    /**
     * Reference for this item.
     * Required for Shop-in-Shop payments.
     */
    reference?: string;
    /**
     * Merchant ID for the item.
     * Required for Shop-in-Shop payments, do not use for normal payments.
     */
    merchant?: string;
    /**
     * Shop-in-Shop commission.
     * Do not use for normal payments.
     */
    commission?: Commission;
}
