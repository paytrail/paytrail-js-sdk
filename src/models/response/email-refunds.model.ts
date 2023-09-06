import { CreateRefundResponse } from './create-refund.model'
import { Response } from './response-model'

/**
 * Class EmailRefundResponse
 */
export class EmailRefundResponse extends Response {
  /**
   * Data response.
   */
  data: EmailRefundData
}

/**
 * Class EmailRefundData
 */
export class EmailRefundData extends CreateRefundResponse {}
