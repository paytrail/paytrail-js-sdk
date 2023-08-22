import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class RevertPaymentAuthHoldRequest {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
