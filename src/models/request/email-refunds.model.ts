import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreateRefundRequest } from './create-refund.model'

/**
 * Class EmailRefundRequest
 *
 * @see https://paytrail.github.io/api-documentation/#/examples?id=email-refund-request-body
 */
export class EmailRefundRequest extends CreateRefundRequest {
  /**
   * Email to which the refund message will be sent.
   */
  @IsNotEmpty()
  @IsEmail()
  email: string
}

/**
 * Class EmailRefundParams
 */
export class EmailRefundParams {
  /**
   * The transaction id.
   */
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  transactionId: string
}
