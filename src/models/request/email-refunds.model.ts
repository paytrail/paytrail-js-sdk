import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { CreateRefundRequest } from './create-refund.model'

export class EmailRefundRequest extends CreateRefundRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string
}

export class EmailRefundParams {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  transactionId: string
}
