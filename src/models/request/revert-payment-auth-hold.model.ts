import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

/**
 * Class RevertPaymentAuthHoldRequest
 *
 * @see https://docs.paytrail.com/#/?id=settlements
 */
export class RevertPaymentAuthHoldRequest {
  /**
   * Set the transaction id.
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
