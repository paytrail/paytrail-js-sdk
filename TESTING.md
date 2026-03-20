# Testing Guide

This guide describes how to test the `paytrail-js-sdk` locally, focusing on the recent changes to `createAddCardFormRequest`.

## Prerequisites

- Node.js (>= 20)
- npm

## Running Automated Tests

To run the unit tests, use the following command:

```bash
npm test
```

To run only the tests related to `createAddCardFormRequest`:

```bash
npm test -- tests/create-add-card-form.test.ts
```

## Manual / Integration Verification

### Setup

1. Ensure you have valid Paytrail Merchant credentials (Merchant ID and Secret Key).
2. The current test suite uses default test credentials (`merchantId: 695861`, `secret: MONISAIPPUAKAUPPIAS`).

### Test Flow

1. Instantiate `PaytrailClient` with your credentials.
2. Create an `AddCardFormRequest` object with only the business fields:
   - `checkoutRedirectSuccessUrl`
   - `checkoutRedirectCancelUrl`
   - `language` (optional)
   - `checkoutCallbackSuccessUrl` (optional)
   - `checkoutCallbackCancelUrl` (optional)
3. Call `client.createAddCardFormRequest(request)`.
4. Inspect the result. It should contain a `redirectUrl`.

### Example Code

```typescript
import { PaytrailClient, AddCardFormRequest } from '@paytrail/paytrail-js-sdk'

const client = new PaytrailClient({
  merchantId: 695861,
  secretKey: 'MONISAIPPUAKAUPPIAS',
  platformName: 'test'
})

const run = async () => {
  const request = new AddCardFormRequest()
  request.checkoutRedirectSuccessUrl = 'https://example.com/success'
  request.checkoutRedirectCancelUrl = 'https://example.com/cancel'
  request.language = 'EN'

  try {
    const response = await client.createAddCardFormRequest(request)
    console.log('Redirect URL:', response.data.redirectUrl)
  } catch (error) {
    console.error('Error:', error)
  }
}

### Cancel Order (Klarna/Invoice)

1. Instantiate `PaytrailClient`.
2. Provide a `transactionId` for a payment created with `manualInvoiceActivation: true`.
3. Call `client.cancelPayment({ transactionId })`.

**Example Code:**

```typescript
import { PaytrailClient } from '@paytrail/paytrail-js-sdk'

const client = new PaytrailClient({
  merchantId: 695861,
  secretKey: 'MONISAIPPUAKAUPPIAS',
  platformName: 'test'
})

const runCancel = async () => {
  try {
    const response = await client.cancelPayment({
      transactionId: 'YOUR_TRANSACTION_ID_HERE'
    })
    console.log('Cancel Status:', response.status)
  } catch (error) {
    console.error('Error:', error)
  }
}

runCancel()
```

run()
```
