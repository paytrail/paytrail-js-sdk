import { CreatePaymentRequest, CreateSiSPaymentRequest, ListGroupedProvidersRequest } from '../models';
export declare const api: {
    merchants: {
        listGroupedProviders: (payload: ListGroupedProvidersRequest, headers: {
            [key: string]: string;
        }) => Promise<readonly [any, any] | readonly [any, import("axios").AxiosResponse<any, any>]>;
    };
    payments: {
        create: (payload: CreatePaymentRequest, headers: {
            [key: string]: string;
        }) => Promise<readonly [any, any]>;
        createSiSPayment: (payload: CreateSiSPaymentRequest, headers: {
            [key: string]: string;
        }) => Promise<readonly [any, any]>;
    };
};
