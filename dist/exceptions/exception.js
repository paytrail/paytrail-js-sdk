"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateException = exports.RequestException = exports.HmacException = exports.ClientException = exports.BaseException = void 0;
class BaseException extends Error {
    constructor(message, status, name) {
        super(message);
        this.status = status;
        this.name = name;
    }
}
exports.BaseException = BaseException;
class ClientException extends BaseException {
    constructor(message, status) {
        super(message, status, 'ClientException');
    }
}
exports.ClientException = ClientException;
class HmacException extends BaseException {
    constructor(message, status) {
        super(message, status, 'HmacException');
    }
}
exports.HmacException = HmacException;
class RequestException extends BaseException {
    constructor(message, status) {
        super(message, status, 'RequestException');
    }
}
exports.RequestException = RequestException;
class ValidateException extends BaseException {
    constructor(message, status) {
        super(message, status, 'ValidateException');
    }
}
exports.ValidateException = ValidateException;
