import { Response } from './response-model'

export class SettlementsResponse extends Response {
  data: SettlementsData
}

export class SettlementsData {
  settlements: string
}
