import { AddCardFormRequest, CreateCitPaymentParams, CreateCitPaymentRequest, CreatePaymentRequest, CreateRefundParams, CreateRefundRequest, CreateSiSPaymentRequest, EmailRefundParams, EmailRefundRequest, GetPaymentStatusRequest, GetTokenRequest, ListGroupedProvidersRequest, MitPaymentParams, MitPaymentRequest, RevertPaymentAuthHoldRequest, SettlementsRequest } from '../models';
import { PaymentReportRequest } from '../models/request/payment-report-request.model';
export declare const requests: {
    get: (url: string, headers: {
        [key: string]: string | number;
    }) => Promise<any>;
    post: (url: string, body: object, headers?: {
        [key: string]: string | number;
    }) => Promise<any>;
};
export declare const api: {
    merchants: {
        listGroupedProviders: (query: ListGroupedProvidersRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
    };
    payments: {
        create: (payload: CreatePaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createSiSPayment: (payload: CreateSiSPaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        getPaymentStatus: (param: GetPaymentStatusRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createRefund: (params: CreateRefundParams, payload: CreateRefundRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        emailRefunds: (params: EmailRefundParams, payload: EmailRefundRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
    };
    paymentReports: {
        paymentReportRequest: (payload: PaymentReportRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
    };
    settlements: {
        get: (query: SettlementsRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
    };
    tokenPayments: {
        createGetToken: (param: GetTokenRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createMitPayment: (payload: MitPaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createMitPaymentAuthorizationHold: (payload: MitPaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createCitPaymentCharge: (payload: CreateCitPaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createCitPaymentAuthorizationHold: (payload: CreateCitPaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createMitOrCitPaymentCommit: (params: MitPaymentParams | CreateCitPaymentParams, payload: MitPaymentRequest | CreateCitPaymentRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        revertPaymentAuthorizationHold: (params: RevertPaymentAuthHoldRequest, headers: {
            [key: string]: string | number;
        }) => Promise<readonly [any, any]>;
        createAddCardFormRequest: (payload: AddCardFormRequest) => Promise<readonly [any, any]>;
    };
};
