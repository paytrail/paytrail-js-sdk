import { CreateRefundResponse } from './create-refund.model'
import { Response } from './response-model'

export class EmailRefundResponse extends Response {
  data: EmailRefundData
}

export class EmailRefundData extends CreateRefundResponse {}
