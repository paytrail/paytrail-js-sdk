import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreatePaymentRequest } from './create-payment.model'

export class MitPaymentRequest extends CreatePaymentRequest {
  @IsNotEmpty()
  @IsString()
  token: string
}

export class MitPaymentParams {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
