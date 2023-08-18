"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
const crypto = require("crypto");
const exception_1 = require("../exceptions/exception");
class Signature {
    static validateHmac(hparams, body, signature = '', secretKey = '', encType = 'sha256') {
        try {
            const hmac = Signature.calculateHmac(secretKey, hparams, body, encType);
            return hmac === signature;
        }
        catch (error) {
            throw new exception_1.HmacException('HMAC signature is invalid.', 401);
        }
    }
    static encodeMD5(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}
exports.Signature = Signature;
_a = Signature;
Signature.supportedEnc = ['sha256', 'sha512'];
Signature.calculateHmac = (secret, hparams, body, encType = 'sha256') => {
    if (!_a.supportedEnc.includes(encType)) {
        throw new exception_1.HmacException('Not supported encryption', 400);
    }
    const hmacPayload = Object.keys(hparams)
        .sort()
        .map((key) => [key, hparams[key]].join(':'))
        .concat(body ? JSON.stringify(body) : '')
        .join('\n');
    return crypto.createHmac(encType, secret).update(hmacPayload).digest('hex');
};
