import { Card, CustomerDetail, Response } from './response-model'

export class GetTokenResponse extends Response {
  data: GetTokenData
}

export class GetTokenData {
  token: string
  card: Card
  customer: CustomerDetail
}
