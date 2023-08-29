import { PaymentMethodGroup } from '../../request/request-model/payment-method-group.model';
import { Provider } from './provider.model';
export declare class PaymentMethodGroupDataWithProviders {
    id: PaymentMethodGroup;
    name: string;
    icon: string;
    svg: string;
    providers: Provider[];
}
