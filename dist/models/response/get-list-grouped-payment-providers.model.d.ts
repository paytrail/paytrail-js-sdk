import { Response } from './response-model';
import { PaymentMethodGroupDataWithProviders } from './response-model/payment-method-group-data-with-providers.model';
import { Provider } from './response-model/provider.model';
/**
 * Class ListGroupedProvidersResponse
 */
export declare class ListGroupedProvidersResponse extends Response {
    /**
     * Data response.
     */
    data?: ListGroupedProvidersData;
}
/**
 * Class ListGroupedProvidersData
 */
export declare class ListGroupedProvidersData {
    /**
     * Localized text with a link to the terms of payment
     */
    terms: string;
    /**
     * Array of payment method group data with localized names and URLs to icons and providers.
     * Contains only the groups the merchant has providers in. Can be limited by the request query parameters
     */
    groups: PaymentMethodGroupDataWithProviders[];
    /**
     * A flat list of all the providers the merchant has. Can be limited by query parameters.
     */
    providers: Provider[];
}
