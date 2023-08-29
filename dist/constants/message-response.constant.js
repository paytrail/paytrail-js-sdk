"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseStatus = exports.responseMessage = void 0;
exports.responseMessage = {
    SUCCESS: 'Success',
    SERVER_ERROR: 'Paytrail Server Error',
    VALIDATE_FAIL: 'Validate Failed',
    SIGNATURE_NULL: 'Signature Null',
    UNAUTHORIZED: 'Unauthorized',
    EXCEPTION: 'Exception'
};
exports.responseStatus = {
    SUCCESS: 200,
    SERVER_ERROR: 500,
    VALIDATE_FAIL: 400,
    SIGNATURE_NULL: 401,
    UNAUTHORIZED: 403
};
