import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator'
import { RequestType } from './request-model/request-type.model'
import { PaymentStatus } from './request-model/payment-status.model'
import { ReportFields } from './request-model/report-field.model'

export class PaymentReportRequest {
  @IsEnum(RequestType)
  @IsNotEmpty()
  requestType: RequestType

  @IsNotEmpty()
  @IsString()
  callbackUrl: string

  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus?: PaymentStatus

  @IsString()
  @IsNotEmpty()
  startDate: string

  @IsString()
  @IsNotEmpty()
  endDate: string

  @IsInt()
  @Min(0)
  @Max(50000)
  @IsOptional()
  limit?: number

  @IsArray()
  @ValidateNested()
  @IsOptional()
  reportFields?: ReportFields[]

  @IsInt()
  @IsOptional()
  submerchant?: number

  @IsBoolean()
  @IsOptional()
  includeItems?: boolean
}
