import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

/**
 * Class CancelOrderRequest
 *
 * @see https://docs.paytrail.com/#/?id=settlements
 */
export class CancelOrderRequest {
  /**
   * Set the transaction id.
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
