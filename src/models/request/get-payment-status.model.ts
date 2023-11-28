import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

/**
 * Class GetPaymentStatusRequest
 *
 * @see https://docs.paytrail.com/#/?id=get
 */
export class GetPaymentStatusRequest {
  /**
   * The transaction id.
   */
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  transactionId: string
}
