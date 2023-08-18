import { PaymentMethodGroupDataWithProviders } from './response-model/payment-method-group-data-with-providers.model';
import { Provider } from './response-model/provider.model';
export declare class ListGroupedProvidersResponse {
    terms: string;
    groups: PaymentMethodGroupDataWithProviders[];
    providers: Provider[];
}
