import { PaymentMethodGroup } from '../../request/request-model/payment-method-group.model';
import { Provider } from './provider.model';
/**
 * Class PaymentMethodGroupDataWithProviders
 */
export declare class PaymentMethodGroupDataWithProviders {
    /**
     * ID of the group.
     */
    id: PaymentMethodGroup;
    /**
     * Localized name of the group.
     */
    name: string;
    /**
     * URL to PNG version of the group icon.
     */
    icon: string;
    /**
     * URL to SVG version of the group icon. Using the SVG icon is preferred.
     */
    svg: string;
    /**
     * Providers for the payment group.
     */
    providers: Provider[];
}
