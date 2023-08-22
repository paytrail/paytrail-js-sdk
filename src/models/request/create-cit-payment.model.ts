import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreatePaymentRequest } from './create-payment.model'

export class CreateCitPaymentRequest extends CreatePaymentRequest {
  @IsString()
  @IsNotEmpty()
  token: string
}

export class CreateCitPaymentParams {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string
}
