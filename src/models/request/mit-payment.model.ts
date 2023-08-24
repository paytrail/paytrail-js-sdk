import { IsNotEmpty, IsString } from 'class-validator'
import { CreatePaymentRequest } from './create-payment.model'

export class MitPaymentRequest extends CreatePaymentRequest {
  @IsNotEmpty()
  @IsString()
  token: string
}
