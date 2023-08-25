import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
export class AddCardFormRequest {
  @IsNotEmpty()
  @IsNumber()
  checkoutAccount: number

  @IsNotEmpty()
  @IsString()
  checkoutAlgorithm: string

  @IsNotEmpty()
  @IsString()
  checkoutMethod: string

  @IsNotEmpty()
  @IsString()
  checkoutNonce: string

  @IsNotEmpty()
  @IsString()
  checkoutTimestamp: string

  @IsNotEmpty()
  @IsString()
  checkoutRedirectSuccessUrl: string

  @IsNotEmpty()
  @IsString()
  checkoutRedirectCancelUrl: string

  @IsNotEmpty()
  @IsString()
  signature: string

  @IsString()
  @IsOptional()
  checkoutCallbackSuccessUrl?: string

  @IsString()
  @IsOptional()
  checkoutCallbackCancelUrl?: string

  @IsString()
  language?: string
}
