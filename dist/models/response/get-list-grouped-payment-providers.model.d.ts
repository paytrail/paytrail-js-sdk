import { Response } from './response-model';
import { PaymentMethodGroupDataWithProviders } from './response-model/payment-method-group-data-with-providers.model';
import { Provider } from './response-model/provider.model';
export declare class ListGroupedProvidersResponse extends Response {
    data: ListGroupedProvidersData;
}
export declare class ListGroupedProvidersData {
    terms: string;
    groups: PaymentMethodGroupDataWithProviders[];
    providers: Provider[];
}
