import { IsNotEmpty, IsNumber, IsOptional, Length, Min, ValidateNested } from 'class-validator'
import { Commission } from './commission.model'

export class Item {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public unitPrice: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public units: number

  @IsNotEmpty()
  @IsNumber()
  public vatPercentage: number

  @IsNotEmpty()
  @Length(1, 100)
  public productCode: string

  @Length(0, 1000)
  @IsOptional()
  public description?: string

  @IsOptional()
  @Length(0, 100)
  public category?: string

  @IsOptional()
  public orderId?: string

  @IsOptional()
  @Length(0, 50)
  public stamp?: string

  @IsOptional()
  @Length(0, 50)
  public reference?: string

  @IsOptional()
  @Length(0, 50)
  public merchant?: string

  @IsOptional()
  @ValidateNested()
  public commission?: Commission
}
