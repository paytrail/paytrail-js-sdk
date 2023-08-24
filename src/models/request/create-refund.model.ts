import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'
import { CallbackUrl, RefundItem } from './request-model'

export class CreateRefundRequest {
  @IsNumber()
  @IsOptional()
  amount?: number

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  refundStamp?: string

  @IsString()
  @IsOptional()
  refundReference?: string

  @IsArray()
  @ValidateNested()
  @IsOptional()
  items?: RefundItem[]

  @IsNotEmpty()
  @ValidateNested()
  callbackUrls: CallbackUrl
}

export class CreateRefundParams {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  transactionId: string
}
