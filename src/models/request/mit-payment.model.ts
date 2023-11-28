import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreatePaymentRequest } from './create-payment.model'

/**
 * Class MitPaymentRequest
 *
 * This class is used to create a MIT payment request object
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=request4
 */
export class MitPaymentRequest extends CreatePaymentRequest {
  /**
   * Token
   */
  @IsNotEmpty()
  @IsString()
  token: string
}

/**
 * Class MitPaymentParams
 *
 * @see https://docs.paytrail.com/#/?id=get-token
 */
export class MitPaymentParams {
  /**
   * The transaction id.
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
