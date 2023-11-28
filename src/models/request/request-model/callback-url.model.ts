import { IsNotEmpty, IsString } from 'class-validator'

/**
 * Class CallbackUrl
 *
 * This class defines callback url details.
 *
 * @see https://paytrail.github.io/api-documentation/#/?id=callbackurl
 */
export class CallbackUrl {
  /**
   * The success url.
   */
  @IsNotEmpty()
  @IsString()
  public success: string

  /**
   * The cancellation url.
   */
  @IsNotEmpty()
  @IsString()
  public cancel: string
}
