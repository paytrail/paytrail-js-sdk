# Paytrail Javascript SDK

The goal for this project is to develop a Javascript SDK for the Paytrail payment service. The aim is to provide JS developers with an easier and more streamlined way to integrate our API into their applications.

The initial version of the JS SDK will be focused on basic payment handling and backend usage, specifically enabling communication with the [Paytrail payment API](https://docs.paytrail.com/#/). As such, it will not include any frontend functionalities, similar to the [Paytrail PHP-SDK](https://github.com/paytrail/paytrail-php-sdk). However, we may provide examples for frontend implementation at a later stage.

## Paytrail Payment Service

Paytrail is a payment gateway that offers 20+ payment methods for Finnish customers.

The payment gateway provides all the popular payment methods with one simple integration. The provided payment methods include, but are not limited to, credit cards, online banking and mobile payments.

To use the payment service, you need to sign up for a Paytrail account. Transaction fees will be charged for every transaction. Transaction cost may vary from merchant to merchant, based on what is agreed upon with Paytrail when negotiating your contract. For more information and registration, please visit our [website](https://www.paytrail.com) or contact asiakaspalvelu@paytrail.com directly.

## Requirements

### General requirements

- NodeJS v19.0.0 or later

### Development requirements

- [Jest](https://jestjs.io) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

## Installation

Install with npm:

```
npm install paytrail-js-sdk
```

Install with yarn:

```
yarn add paytrail-js-sdk
```

## Usage

```javascript
const { PaytrailClient, PaymentMethodGroup } = require('paytrail-js-sdk')

const client = new PaytrailClient({
  merchantId: 123456,
  secretKey: 'xxx',
  platformName: 'xxx'
})

async function main() {
  // Example
  const res = await client.listGroupedProviders({
    amount: 1,
    groups: [PaymentMethodGroup.Mobile, PaymentMethodGroup.CreditCard]
  })

  console.log(res)
}

main()
```

## Folder contents & descriptions

| Folder/File            | Content/Description                                                      |
| ---------------------- | ------------------------------------------------------------------------ |
| src/exceptions         | Exception classes and functions                                          |
| src/interfaces         | Interface classes and functions for all the related classes to implement |
| src/models             | Model classes and functions                                              |
| src/models/request     | Request model and functions                                              |
| src/models/response    | Response model and functions                                             |
| src/utils              | Utility/trait classes and functions                                      |
| src/paytrail.ts        | Init paytrail service                                                    |
| src/paytrail-client.ts | Paytrail client class and functions                                      |
| tests                  | Unit test                                                                |

## Basic functionalities

The Paytrail JS-SDK supports most of the functionalities of the [Paytrail Payment API](https://paytrail.github.io/api-documentation/#/).

Some of the key features are:

### Payments and refunds

- [Creating payment request](https://paytrail.github.io/api-documentation/#/?id=create)
- [Creating payment status request](https://paytrail.github.io/api-documentation/#/?id=get)
- [Creating refund request](https://paytrail.github.io/api-documentation/#/?id=refund)

### Tokenized credit cards and payments

- [Creating Add card form request](https://paytrail.github.io/api-documentation/#/?id=adding-tokenizing-cards)
- [Creating Get token request](https://paytrail.github.io/api-documentation/#/?id=get-token)
- [Creating Customer Initiated Transactions (CIT) or Merchant Initiated Transactions (MIT)](https://checkoutfinland.github.io/psp-api/#/?id=charging-a-token)

### Shop-in-Shop

- Creating Shop-in-Shop payment request

### Settlements

- [Requesting merchant settlements](https://docs.paytrail.com/#/?id=settlements)

### Reports

- [Request payment report](https://docs.paytrail.com/#/?id=payment-report-request)

## Methods

List of `PaytrailClient::class` methods

| Method                              | Description                                          |
| ----------------------------------- | ---------------------------------------------------- |
| listGroupedProviders()              | Returns an array of grouped payment providers fields |
| createPayment()                     | Create payment                                       |
| createShopInShopPayment()           | Create SiS payment                                   |
| getPaymentStatus()                  | Request payment status                               |
| createRefund()                      | Create refund                                        |
| emailRefund()                       | Create email refund                                  |
| paymentReportRequest()              | Request payment report                               |
| requestSettlements()                | Request settlements                                  |
| createGetTokenRequest()             | Request card token                                   |
| createMitPaymentCharge()            | Create MiT payment                                   |
| createMitPaymentAuthorizationHold() | Create MiT authorization hold                        |
| createCitPaymentCharge()            | Create CiT payment                                   |
| createCitPaymentAuthorizationHold() | Create CiT authorization hold                        |
| createMitPaymentCommit()            | Commit MiT authorization hold                        |
| createCitPaymentCommit()            | Commit CiT authorization hold                        |
| revertPaymentAuthorizationHold()    | Revert existing Mit or CiT authorization hold        |
| createAddCardFormRequest()          | Create payment and save card details                 |

---

**_Disclaimer:_** _This open source project is made available to assist coders in getting started with our API. However, we do not provide any warranty or guarantee that the code will work as intended and offer limited support for it. Use at your own risk._
