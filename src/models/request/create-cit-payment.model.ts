import { IsNotEmpty, IsString } from 'class-validator'
import { CreatePaymentRequest } from './create-payment.model'

export class CreateCitPaymentRequest extends CreatePaymentRequest {
  @IsString()
  @IsNotEmpty()
  token: string
}
