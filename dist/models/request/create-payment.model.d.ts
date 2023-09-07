import { Item } from './request-model/item.model';
import { Customer } from './request-model/customer.model';
import { Address } from './request-model/address.model';
import { CallbackUrl } from './request-model/callback-url.model';
import { PaymentMethodGroup } from './request-model/payment-method-group.model';
/**
 * Class CreatePaymentRequest
 *
 * This class is used to create a payment request object
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=create-request-body
 */
export declare class CreatePaymentRequest {
    /**
     * Merchant unique identifier for the order.
     */
    stamp: string;
    /**
     * Order reference.
     */
    reference: string;
    /**
     * Total amount of the payment in currency's minor units,
     * eg. for Euros use cents. Must match the total sum of items.
     */
    amount: number;
    /**
     * Currency, only EUR supported at the moment.
     */
    currency: string;
    /**
     * Payment's language, currently supported are FI, SV, and EN.
     */
    language: string;
    /**
     * Order ID. Used for e.g. Walley/Collector payments order ID. If not given, merchant reference is used instead.
     */
    orderId?: string;
    /**
     * Array of items. Always required for Shop-in-Shop payments. Required if VAT calculations are wanted in settlement reports.
     */
    items?: Item[];
    /**
     * Customer information.
     */
    customer: Customer;
    /**
     * Delivery address.
     */
    deliveryAddress?: Address;
    /**
     * Invoicing address.
     */
    invoicingAddress?: Address;
    /**
     * If paid with invoice payment method, the invoice will not be activated automatically immediately.
     * Currently only supported with Walley/Collector.
     */
    manualInvoiceActivation?: boolean;
    /**
     * Where to redirect browser after a payment is paid or cancelled.
     */
    redirectUrls: CallbackUrl;
    /**
     * Which url to ping after this payment is paid or cancelled.
     */
    callbackUrls?: CallbackUrl;
    /**
     * Callback URL polling delay in seconds.
     */
    callbackDelay?: number;
    /**
     * Return only given groups.
     */
    groups?: PaymentMethodGroup[];
    /**
     * If true, amount and items.unitPrice should be sent to API not including VAT, and final amount is calculated by Paytrail's system using the items' unitPrice and vatPercentage (with amounts rounded to closest cent).
     */
    usePricesWithoutVat?: boolean;
}
