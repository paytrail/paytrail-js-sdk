import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class SettlementsRequest {
  @IsString()
  @IsOptional()
  bankReference?: string

  @IsNumber()
  @Min(0)
  limit: number

  @IsInt()
  @IsOptional()
  submerchant?: number

  @IsString()
  @IsNotEmpty()
  startDate: string

  @IsString()
  @IsNotEmpty()
  endDate: string
}
