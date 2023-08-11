import { PaymentMethodGroup } from './request-model/payment-method-group.model';
export declare class ListGroupedProvidersRequest {
    amount?: number;
    groups?: PaymentMethodGroup[];
    language?: string;
}
