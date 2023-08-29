import { IsNotEmpty, IsString } from 'class-validator'

export class CallbackUrl {
  @IsNotEmpty()
  @IsString()
  public success: string

  @IsNotEmpty()
  @IsString()
  public cancel: string
}
