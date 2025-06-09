import { Response } from './response-model';
import { ApplePay } from './response-model/apple-pay.model';
import { PaymentMethodGroupData } from './response-model/payment-method-group-data.model';
import { Provider } from './response-model/provider.model';
/**
 * Class CreateSiSPaymentResponse
 */
export declare class CreateSiSPaymentResponse extends Response {
    /**
     * Data response.
     */
    data?: CreateSiSPaymentData;
}
/**
 * Class CreateSiSPaymentData
 */
export declare class CreateSiSPaymentData {
    /**
     * Assigned transaction ID for the payment.
     */
    transactionId: string;
    /**
     * URL to hosted payment gateway.
     */
    href: string;
    /**
     * Localized text with a link to the terms of payment.
     */
    terms: string;
    /**
     * Array of payment method group data with localized names and URLs to icons.
     */
    groups: PaymentMethodGroupData[];
    /**
     * The bank reference used for the payments.
     */
    reference: string;
    /**
     * Payment providers.
     */
    providers: Provider[];
    /**
     * Providers which require custom implementation.
     */
    customProviders: ApplePay;
}
