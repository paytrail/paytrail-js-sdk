export declare class BaseException extends Error {
    status: number;
    constructor(message: string, status: number, name: string);
}
export declare class ClientException extends BaseException {
    constructor(message: string, status: number);
}
export declare class HmacException extends BaseException {
    constructor(message: string, status: number);
}
export declare class RequestException extends BaseException {
    constructor(message: string, status: number);
}
export declare class ValidateException extends BaseException {
    constructor(message: string, status: number);
}
