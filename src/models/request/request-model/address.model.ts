import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class Address {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  public streetAddress?: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  public postalCode?: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  public city?: string

  @IsString()
  @IsOptional()
  public county?: string

  @IsString()
  @IsNotEmpty()
  public country?: string
}
