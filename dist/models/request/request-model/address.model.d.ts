/**
 * This class defines address details for a payment request.
 * @see {@link https://paytrail.github.io/api-documentation/#/?id=address}
 */
export declare class Address {
    /**
     * The street address.
     */
    streetAddress: string;
    /**
     * The postal code.
     */
    postalCode: string;
    /**
     * The city.
     */
    city: string;
    /**
     * The county.
     */
    county?: string;
    /**
     * The country.
     */
    country: string;
}
