# Release 1.1.0

## What's Changed

**Breaking Change**: Refactored `createAddCardFormRequest` to internalize signature calculation and authentication parameters. This aligns the method with the rest of the SDK patterns and simplifies usage for developers. The `AddCardFormRequest` model no longer requires `checkoutAccount`, `checkoutMethod`, `checkoutNonce`, `checkoutTimestamp`, `checkoutAlgorithm`, or `signature` to be populated manually.

### Features
- Internalized signature calculation for `createAddCardFormRequest` (matches `createPayment` pattern).
- Implemented Form Post style authentication (Body Auth) for add-card requests.

### Refactoring
- Removed manual authentication fields from `AddCardFormRequest` model.
- Automatically injects merchant credentials and generates HMAC signature within the SDK.

### Testing
- Added unit tests to verify signature generation and payload structure for card form requests.