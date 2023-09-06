import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

/**
 * This class defines address details for a payment request.
 * @see {@link https://paytrail.github.io/api-documentation/#/?id=address}
 */
export class Address {
  /**
   * The street address.
   */
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  public streetAddress: string

  /**
   * The postal code.
   */
  @IsString()
  @IsNotEmpty()
  @Length(1, 15)
  public postalCode: string

  /**
   * The city.
   */
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  public city: string

  /**
   * The county.
   */
  @IsString()
  @IsOptional()
  public county?: string

  /**
   * The country.
   */
  @IsString()
  @IsNotEmpty()
  public country: string
}
