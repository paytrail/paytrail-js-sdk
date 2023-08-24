import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class GetPaymentStatusRequest {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  transactionId: string
}
