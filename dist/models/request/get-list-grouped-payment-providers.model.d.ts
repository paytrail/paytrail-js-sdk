import { PaymentMethodGroup } from './request-model/payment-method-group.model';
/**
 * Class ListGroupedProvidersRequest
 *
 * @see https://docs.paytrail.com/#/?id=list-grouped-providers
 */
export declare class ListGroupedProvidersRequest {
    /**
     * Purchase amount in currency's minor unit. Some payment methods have minimum or maximum purchase limits.
     * When the amount is provided, only the methods suitable for the amount are returned.
     * Otherwise, all merchant's payment methods are returned.
     */
    amount?: number;
    /**
     * Comma separated list of payment method groups to include. Otherwise all enabled methods are returned.
     */
    groups?: PaymentMethodGroup[];
    /**
     * Code of the language the terms of payment and the payment group names will be displayed in.
     * Supports only FI, EN and SV. FI is the default if left undefined.
     */
    language?: string;
}
