import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class Customer {
  @IsNotEmpty()
  @Length(1, 200)
  @IsString()
  @IsEmail()
  public email: string

  @IsString()
  @Length(1, 50)
  @IsOptional()
  public firstName?: string

  @IsString()
  @Length(1, 50)
  @IsOptional()
  public lastName?: string

  @IsString()
  @IsOptional()
  public phone?: string

  @IsString()
  @IsOptional()
  public vatId?: string

  @IsString()
  @IsOptional()
  public companyName?: string
}
