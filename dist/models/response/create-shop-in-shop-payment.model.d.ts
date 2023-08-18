import { ApplePay } from './response-model/apple-pay.model';
import { PaymentMethodGroupData } from './response-model/payment-method-group-data.model';
import { Provider } from './response-model/provider.model';
export declare class CreateSiSPaymentResponse {
    transactionId?: string;
    href: string;
    terms: string;
    groups: PaymentMethodGroupData[];
    reference: string;
    providers: Provider[];
    customProviders: ApplePay | undefined;
}
