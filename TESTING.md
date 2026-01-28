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
import { PaytrailClient, AddCardFormRequest } from '@paytrail/paytrail-js-sdk';

const client = new PaytrailClient({
  merchantId: 1072377,
  secretKey: '226382458d7a1a75486c9732881472dd61fff6debfb193afab1f7e8b85131081418380be827a69fc',
  platformName: 'test'
});

const run = async () => {
    const request = new AddCardFormRequest();
    request.checkoutRedirectSuccessUrl = 'https://example.com/success';
    request.checkoutRedirectCancelUrl = 'https://example.com/cancel';
    request.language = 'EN';

    try {
        const response = await client.createAddCardFormRequest(request);
        console.log('Redirect URL:', response.data.redirectUrl);
    } catch (error) {
        console.error('Error:', error);
    }
};

run();
```
