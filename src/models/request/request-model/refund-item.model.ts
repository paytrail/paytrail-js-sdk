import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator'
import { Commission } from './commission.model'

export class RefundItem {
  @IsNumber()
  @Min(0)
  public amount?: number

  @IsNotEmpty()
  public stamp?: string

  @IsNotEmpty()
  public refundStamp?: string

  @IsNotEmpty()
  public refundReference?: string

  @IsNotEmpty()
  @ValidateNested()
  public commission?: Commission
}
