import { Configuration } from './configuration';
import { IPaytrail } from './interfaces/IPayTrail.interface';
import { CreatePaymentRequest, CreatePaymentResponse, CreateSiSPaymentRequest, CreateSiSPaymentResponse, ListGroupedProvidersRequest, ListGroupedProvidersResponse } from './models';
import { Paytrail } from './paytrail';
export declare class PaytrailClient extends Paytrail implements IPaytrail {
    API_ENDPOINT: string;
    constructor(configuration: Configuration);
    validateHmac(hparams: {
        [key: string]: string;
    }, body: {
        [key: string]: string | number | object;
    } | '', signature: string, secretKey: string, encType?: string): boolean;
    listGroupedProviders(listGroupedProvidersRequest: ListGroupedProvidersRequest): Promise<ListGroupedProvidersResponse>;
    createPayment(createPaymentRequest: CreatePaymentRequest): Promise<CreatePaymentResponse>;
    createSiSPayment(createSiSPaymentResquest: CreateSiSPaymentRequest): Promise<CreateSiSPaymentResponse>;
}
