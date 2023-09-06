import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'

/**
 * Class SettlementsRequest
 *
 * @see https://docs.paytrail.com/#/?id=settlements
 */
export class SettlementsRequest {
  /**
   * Only include settlements that were settled with this bank reference.
   */
  @IsString()
  @IsOptional()
  bankReference?: string

  /**
   * Limit the number of settlement IDs returned. Limit 1 will only include the most recent settlement.
   */
  @IsNumber()
  @Min(0)
  limit: number

  /**
   * Get submerchant's payment report (aggregate only).
   */
  @IsInt()
  @IsOptional()
  submerchant?: number

  /**
   * Only settlements created after this date will be included in the response. Must follow the following format: YYYY-MM-DD.
   */
  @IsString()
  @IsNotEmpty()
  startDate: string

  /**
   * Only settlements created before or on this date will be included in the response. Must follow the following format: YYYY-MM-DD.
   */
  @IsString()
  @IsNotEmpty()
  endDate: string
}
