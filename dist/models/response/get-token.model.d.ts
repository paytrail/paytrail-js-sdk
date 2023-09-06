import { Card, CustomerDetail, Response } from './response-model';
/**
 * Class GetTokenResponse
 */
export declare class GetTokenResponse extends Response {
    /**
     * Data response.
     */
    data: GetTokenData;
}
/**
 * Class GetTokenData
 */
export declare class GetTokenData {
    /**
     * Payment card token.
     */
    token: string;
    /**
     * Masked card details. Present if verification was successful.
     */
    card: Card;
    /**
     * Customer details.
     */
    customer: CustomerDetail;
}
