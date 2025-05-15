"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRequest = void 0;
const handleRequest = (promise) => {
    return promise
        .then((data) => [undefined, data])
        .catch((err) => [err, undefined]);
};
exports.handleRequest = handleRequest;
