import { Response } from './response-model';
export declare class GetPaymentStatusResponse extends Response {
    data: GetPaymentStatusData;
}
export declare class GetPaymentStatusData {
    transactionId: string;
    status: string;
    amount: number;
    currency: string;
    stamp: string;
    reference: string;
    createdAt: string;
    href: string;
    provider: string;
    filingCode: string;
    paidAt: string;
    settlementReference: string;
}
