import { Response } from './response-model'

/**
 * Class SettlementsResponse
 */
export class SettlementsResponse extends Response {
  /**
   * Data response.
   */
  data: SettlementsData
}

/**
 * Class SettlementsData
 */
export class SettlementsData {
  /**
   * The settlements.
   */
  settlements: string
}
