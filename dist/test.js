"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const paytrail_client_1 = require("./paytrail-client");
const payment_method_group_model_1 = require("./models/request/request-model/payment-method-group.model");
function createPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new paytrail_client_1.PaytrailClient('375917', 'SAIPPUAKAUPPIAS', 'aaa');
        const body = {
            stamp: 'd2568f2a-e4c6-40ba-a7cd-ds573s3121ce549',
            reference: '9187445',
            amount: 1590,
            currency: 'EUR',
            language: 'FI',
            items: [
                {
                    unitPrice: 1590,
                    units: 1,
                    vatPercentage: 24,
                    productCode: '#927502759',
                    stamp: '10743336-b969-4d5c-87f7-0ssef18594d212g'
                }
            ],
            customer: {
                email: 'erja.esimerkki@example.org'
            },
            redirectUrls: {
                success: 'https://ecom.example.org/success',
                cancel: 'https://ecom.example.org/cancel'
            },
            callbackUrls: {
                success: 'https://ecom.example.org/success',
                cancel: 'https://ecom.example.org/cancel'
            }
        };
        try {
            const data = yield client.createPayment(body);
            console.log(data);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function createSiSPayment() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new paytrail_client_1.PaytrailClient('375917', 'SAIPPUAKAUPPIAS', 'aaa');
        const body = {
            stamp: 'd2568f2a-e4c6-40ba-a7cd-ds573s3121ce549',
            reference: '9187445',
            amount: 1590,
            currency: 'EUR',
            language: 'FI',
            items: [
                {
                    unitPrice: 1590,
                    units: 1,
                    vatPercentage: 24,
                    productCode: '#927502759',
                    stamp: '10743336-b969-4d5c-87f7-0ssef18594d212g'
                }
            ],
            customer: {
                email: 'erja.esimerkki@example.org',
                firstName: 'hi'
            },
            redirectUrls: {
                success: 'https://ecom.example.org/success',
                cancel: 'https://ecom.example.org/cancel'
            },
            callbackUrls: {
                success: 'https://ecom.example.org/success',
                cancel: 'https://ecom.example.org/cancel'
            }
        };
        try {
            const data = yield client.createSiSPayment(body);
            console.log(data);
        }
        catch (e) {
            console.log(e);
        }
    });
}
function listGroupedProviders() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new paytrail_client_1.PaytrailClient('375917', 'SAIPPUAKAUPPIAS', 'aaa');
        try {
            const data = yield client.listGroupedProviders({
                amount: 1,
                groups: [payment_method_group_model_1.PaymentMethodGroup.Mobile, payment_method_group_model_1.PaymentMethodGroup.Credit]
            });
            console.log(data.groups[0].providers);
        }
        catch (e) {
            console.log(e);
        }
    });
}
// createPayment()
// listGroupedProviders()
createSiSPayment();
// const headers = {
//   'checkout-account': '375917',
//   'checkout-algorithm': 'sha256',
//   'checkout-method': 'POST',
//   'checkout-nonce': '77861fe8a0966f0114b7053d685b3148889',
//   'checkout-timestamp': '2018-07-05T11:19:25.950Z'
// }
// const body = {
//   stamp: 'd2568f2a-e4c6-40ba-a7cd-d573382ce548',
//   reference: '9187445',
//   amount: 1590,
//   currency: 'EUR',
//   language: 'FI',
//   items: [
//     {
//       unitPrice: 1590,
//       units: 1,
//       vatPercentage: 24,
//       productCode: '#927502759',
//       stamp: '10743336-b969-4d5c-87f7-0ef8594d24ef'
//     }
//   ],
//   customer: {
//     email: 'erja.esimerkki@example.org'
//   },
//   redirectUrls: {
//     success: 'https://ecom.example.org/success',
//     cancel: 'https://ecom.example.org/cancel'
//   },
//   callbackUrls: {
//     success: 'https://ecom.example.org/success',
//     cancel: 'https://ecom.example.org/cancel'
//   }
// }
// const hmac = Signature.calculateHmac('SAIPPUAKAUPPIAS', headers, body)
// console.log(hmac)
// const check = Signature.validateHmac(headers, body, hmac, 'SAIPPUAKAUPPIAS')
// console.log(check)
