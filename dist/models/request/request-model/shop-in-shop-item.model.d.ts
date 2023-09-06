import { Commission } from './commission.model';
/**
 * Class ShopInShopItem
 */
export declare class ShopInShopItem {
    /**
     * Item level order ID (suborder ID). Mainly useful for Shop-in-Shop purchases.
     */
    orderId?: string;
    /**
     * Unique identifier for this item. Required for Shop-in-Shop payments. Required for item refunds.
     */
    stamp: string;
    /**
     * Reference for this item. Required for Shop-in-Shop payments.
     */
    reference: string;
    /**
     * Merchant ID for the item. Required for Shop-in-Shop payments, do not use for normal payments.
     */
    merchant: string;
    /**
     * Shop-in-Shop commission. Do not use for normal payments.
     */
    commission?: Commission;
}
