import { FormField } from './form-field.model'

/**
 * Class Provider
 */
export class Provider {
  /**
   * Form target URL. Use POST as method.
   */
  public url: string

  /**
   * URL to PNG version of the provider icon.
   */
  public icon: string

  /**
   * URL to SVG version of the provider icon. Using the SVG icon is preferred.
   */
  public svg: string

  /**
   * Display name of the provider.
   */
  public name: string

  /**
   * Provider group.
   * Provider groups allow presenting same type of providers
   * in separate groups which usually makes it easier for the customer to select a payment method.
   */
  public group: string

  /**
   * ID of the provider.
   */
  public id: string

  /**
   * Array of form fields.
   */
  public parameters: FormField[]
}
