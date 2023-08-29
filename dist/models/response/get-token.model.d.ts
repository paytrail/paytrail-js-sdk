import { Card, CustomerDetail, Response } from './response-model';
export declare class GetTokenResponse extends Response {
    data: GetTokenData;
}
export declare class GetTokenData {
    token: string;
    card: Card;
    customer: CustomerDetail;
}
