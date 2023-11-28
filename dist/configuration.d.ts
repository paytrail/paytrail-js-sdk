import { ConfigurationParameters } from './interfaces/IConfiguration.interface';
export declare class Configuration {
    /**
     * The merchant id.
     * @memberof Configuration
     */
    merchantId?: number;
    /**
     * The merchant secret key.
     * @memberof Configuration
     */
    secretKey?: string;
    /**
     * Platform name for the API.
     * @memberof Configuration
     */
    platformName?: string;
    constructor(param: ConfigurationParameters);
}
