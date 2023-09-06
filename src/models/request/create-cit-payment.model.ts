import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreatePaymentRequest } from './create-payment.model'

/**
 * Class CreateCitPaymentRequest
 *
 * This class is used to create a CIT payment request object for
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=request4
 */
export class CreateCitPaymentRequest extends CreatePaymentRequest {
  /**
   * Payment card token.
   */
  @IsString()
  @IsNotEmpty()
  token: string
}

export class CreateCitPaymentParams {
  /**
   * The transaction id.
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
