import { Response } from './response-model';
export declare class AddCardFormResponse extends Response {
    data: AddCardFormData;
}
export declare class AddCardFormData {
    transactionId: string;
    redirectUrl: string;
}
