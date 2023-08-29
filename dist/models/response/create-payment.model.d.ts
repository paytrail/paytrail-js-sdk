import { Response } from './response-model';
import { ApplePay } from './response-model/apple-pay.model';
import { PaymentMethodGroupData } from './response-model/payment-method-group-data.model';
import { Provider } from './response-model/provider.model';
export declare class CreatePaymentResponse extends Response {
    data: CreatePaymentData;
}
export declare class CreatePaymentData {
    transactionId: string;
    href: string;
    terms: string;
    groups: PaymentMethodGroupData[];
    reference: string;
    providers: Provider[];
    customProviders: ApplePay;
}
