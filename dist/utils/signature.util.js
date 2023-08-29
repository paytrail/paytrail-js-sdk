"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signature = void 0;
const crypto = require("crypto");
class Signature {
    static validateHmac(hparams, body, signature, secretKey, encType = 'sha256') {
        const hmac = Signature.calculateHmac(secretKey, hparams, body, encType);
        return hmac === signature;
    }
    static encodeMD5(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}
exports.Signature = Signature;
Signature.supportedEnc = ['sha256', 'sha512'];
Signature.calculateHmac = (secret, hparams, body, encType = 'sha256') => {
    const hmacPayload = Object.keys(hparams)
        .sort()
        .map((key) => [key, hparams[key]].join(':'))
        .concat(body ? JSON.stringify(body) : '')
        .join('\n');
    return crypto.createHmac(encType, secret).update(hmacPayload).digest('hex');
};
