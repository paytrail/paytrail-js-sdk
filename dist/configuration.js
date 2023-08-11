"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    constructor(param) {
        this.merchantId = param.merchantId;
        this.secretKey = param.secretKey;
        this.platformName = param.platformName;
    }
}
exports.Configuration = Configuration;
