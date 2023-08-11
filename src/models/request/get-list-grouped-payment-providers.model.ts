import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'
import { PaymentMethodGroup } from './request-model/payment-method-group.model'

export class ListGroupedProvidersRequest {
  @IsNumber()
  @Min(0)
  @Max(99999999)
  @IsOptional()
  public amount?: number

  @IsArray()
  @IsOptional()
  @IsEnum(PaymentMethodGroup, { each: true })
  public groups?: PaymentMethodGroup[]

  @IsString()
  @IsOptional()
  public language?: string
}
