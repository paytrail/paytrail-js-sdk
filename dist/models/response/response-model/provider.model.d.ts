import { FormField } from './form-field.model';
/**
 * Class Provider
 */
export declare class Provider {
    /**
     * Form target URL. Use POST as method.
     */
    url: string;
    /**
     * URL to PNG version of the provider icon.
     */
    icon: string;
    /**
     * URL to SVG version of the provider icon. Using the SVG icon is preferred.
     */
    svg: string;
    /**
     * Display name of the provider.
     */
    name: string;
    /**
     * Provider group.
     * Provider groups allow presenting same type of providers
     * in separate groups which usually makes it easier for the customer to select a payment method.
     */
    group: string;
    /**
     * ID of the provider.
     */
    id: string;
    /**
     * Array of form fields.
     */
    parameters: FormField[];
}
