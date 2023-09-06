import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

/**
 * Class Commission
 */
export class Commission {
  /**
   * Merchant identifier for the commission.
   */
  @IsString()
  @IsNotEmpty()
  public merchant: string

  /**
   * Total amount to refund this item, in currency's minor units.
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  public amount: number
}
