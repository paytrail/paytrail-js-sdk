import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class Commission {
  @IsString()
  @IsNotEmpty()
  public merchant: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public amount: number
}
