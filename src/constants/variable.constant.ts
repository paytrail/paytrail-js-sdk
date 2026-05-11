export const API_ENDPOINT: string = process.env.PAYTRAIL_API_URL || 'https://services.paytrail.com'

export const METHOD: { [key: string]: string } = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}
