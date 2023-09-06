import { IPaytrail } from './interfaces/IPayTrail.interface';
import { AddCardFormRequest, AddCardFormResponse, CreateCitPaymentParams, CreateCitPaymentRequest, CreateCitPaymentResponse, CreatePaymentRequest, CreatePaymentResponse, CreateRefundParams, CreateRefundRequest, CreateRefundResponse, CreateSiSPaymentRequest, CreateSiSPaymentResponse, EmailRefundParams, EmailRefundRequest, EmailRefundResponse, GetPaymentStatusRequest, GetPaymentStatusResponse, GetTokenRequest, GetTokenResponse, ListGroupedProvidersRequest, ListGroupedProvidersResponse, MitPaymentParams, MitPaymentRequest, MitPaymentResponse, PaymentReportRequest, PaymentReportResponse, RevertPaymentAuthHoldRequest, RevertPaymentAuthHoldResponse, SettlementsRequest, SettlementsResponse } from './models';
import { Paytrail } from './paytrail';
/**
 * Class PaytrailClient
 *
 * The PaytrailClient is the connector class for the API.
 *
 */
export declare class PaytrailClient extends Paytrail implements IPaytrail {
    /**
     * The Paytrail API endpoint.
     */
    API_ENDPOINT: string;
    validateHmac(hparams: {
        [key: string]: string;
    }, body: {
        [key: string]: string | number | object;
    } | '', signature: string, secretKey: string, encType?: string): boolean;
    listGroupedProviders(listGroupedProvidersRequest: ListGroupedProvidersRequest): Promise<ListGroupedProvidersResponse>;
    createPayment(createPaymentRequest: CreatePaymentRequest): Promise<CreatePaymentResponse>;
    createShopInShopPayment(createSiSPaymentResquest: CreateSiSPaymentRequest): Promise<CreateSiSPaymentResponse>;
    getPaymentStatus(getPaymentStatusRequest: GetPaymentStatusRequest): Promise<GetPaymentStatusResponse>;
    createRefund(createRefundParams: CreateRefundParams, createRefundRequest: CreateRefundRequest): Promise<CreateRefundResponse>;
    emailRefund(emailRefundParams: EmailRefundParams, emailRefundRequest: EmailRefundRequest): Promise<EmailRefundResponse>;
    paymentReportRequest(paymentReportRequest: PaymentReportRequest): Promise<PaymentReportResponse>;
    requestSettlements(settlementsRequest: SettlementsRequest): Promise<SettlementsResponse>;
    createGetTokenRequest(getTokenRequest: GetTokenRequest): Promise<GetTokenResponse>;
    createMitPaymentCharge(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse>;
    createMitPaymentAuthorizationHold(mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse>;
    createCitPaymentCharge(createCitPaymentRequest: CreateCitPaymentRequest): Promise<CreateCitPaymentResponse>;
    createCitPaymentAuthorizationHold(createCitPaymentRequest: CreateCitPaymentRequest): Promise<CreateCitPaymentResponse>;
    createMitPaymentCommit(mitPaymentParams: MitPaymentParams, mitPaymentRequest: MitPaymentRequest): Promise<MitPaymentResponse>;
    createCitPaymentCommit(citPaymentParams: CreateCitPaymentParams, citPaymentRequest: CreateCitPaymentRequest): Promise<CreateCitPaymentResponse>;
    revertPaymentAuthorizationHold(revertPaymentAuthHoldRequest: RevertPaymentAuthHoldRequest): Promise<RevertPaymentAuthHoldResponse>;
    createAddCardFormRequest(addCardFormRequest: AddCardFormRequest): Promise<AddCardFormResponse>;
}
