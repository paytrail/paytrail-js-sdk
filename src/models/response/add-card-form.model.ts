import { Response } from './response-model'

/**
 * Class AddCardFormResponse
 */
export class AddCardFormResponse extends Response {
  /**
   * Data response.
   */
  data: AddCardFormData
}

/**
 * Class AddCardFormData
 */
export class AddCardFormData {
  /**
   * URL to hosted payment gateway.
   */
  redirectUrl: string
}
