import { ConfigurationParameters } from './interfaces/IConfiguration.interface'

export class Configuration {
  /**
   * Paytrail account ID
   * @type {string}
   * @memberof Configuration
   */
  merchantId?: string

  /**
   * Parameter for API Security
   * @type {string}
   * @memberof Configuration
   */
  secretKey?: string

  /**
   * Platform and integrator information helps customer service to provide better assistance for the merchants using the integration.
   * @type {string}
   * @memberof Configuration
   */
  platformName?: string

  constructor(param: ConfigurationParameters) {
    this.merchantId = param.merchantId
    this.secretKey = param.secretKey
    this.platformName = param.platformName
  }
}
