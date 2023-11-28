import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

/**
 * Class Customer
 *
 * The customer class defines the customer details object.
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=customer
 */
export class Customer {
  /**
   * The customer email.
   */
  @IsNotEmpty()
  @Length(1, 200)
  @IsString()
  @IsEmail()
  public email: string

  /**
   * The customer first name.
   */
  @IsString()
  @Length(1, 50)
  @IsOptional()
  public firstName?: string

  /**
   * The customer last name.
   */
  @IsString()
  @Length(1, 50)
  @IsOptional()
  public lastName?: string

  /**
   * The customer phone.
   */
  @IsString()
  @IsOptional()
  public phone?: string

  /**
   * The customer VAT id.
   */
  @IsString()
  @IsOptional()
  public vatId?: string

  /**
   * The Company name.
   */
  @IsString()
  @IsOptional()
  public companyName?: string
}
