import { Item } from './request-model/item.model';
import { Customer } from './request-model/customer.model';
import { Address } from './request-model/address.model';
import { CallbackUrl } from './request-model/callback-url.model';
import { PaymentMethodGroup } from './request-model/payment-method-group.model';
export declare class CreatePaymentRequest {
    stamp: string;
    reference: string;
    amount: number;
    currency: string;
    language: string;
    orderId?: string;
    items?: Item[];
    customer: Customer;
    deliveryAddress?: Address;
    invoicingAddress?: Address;
    manualInvoiceActivation?: boolean;
    redirectUrls: CallbackUrl;
    callbackUrls?: CallbackUrl;
    callbackDelay?: number;
    groups?: PaymentMethodGroup[];
    usePricesWithoutVat?: boolean;
}
