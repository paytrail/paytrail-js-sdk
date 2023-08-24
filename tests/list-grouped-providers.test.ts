import { ListGroupedProvidersRequest, PaymentMethodGroup } from '../src/models'
import { api } from '../src/utils/axios.util'
import { PaytrailClient } from './../src/paytrail-client'

describe('list-grouped-providers', () => {
  let client: PaytrailClient

  beforeEach(() => {
    const mockConfiguration = {
      merchantId: '375917',
      secretKey: 'SAIPPUAKAUPPIAS',
      platformName: 'test'
    }
    client = new PaytrailClient(mockConfiguration)
  })

  it('should return status 200', async () => {
    const data = await client.listGroupedProviders({
      amount: 1,
      groups: [PaymentMethodGroup.Mobile, PaymentMethodGroup.CreditCard]
    })

    expect(data.status).toEqual(200)
  })

  it('should return status 400', async () => {
    const data = await client.listGroupedProviders({
      amount: -1,
      groups: [PaymentMethodGroup.Mobile, PaymentMethodGroup.CreditCard]
    })

    expect(data.status).toEqual(400)
  })

  it('should return status 401', async () => {
    client = new PaytrailClient({
      merchantId: '375917',
      secretKey: 'SAIPPUAKAUPPIASS',
      platformName: 'test'
    })

    const data = await client.listGroupedProviders({
      amount: 1,
      groups: [PaymentMethodGroup.Mobile, PaymentMethodGroup.CreditCard]
    })

    expect(data.status).toEqual(401)
  })

  it('should handle API error', async () => {
    // Mock the API call to throw an error
    const mockError = new Error('API error')
    jest.spyOn(api.merchants, 'listGroupedProviders').mockRejectedValue(mockError)

    // Use a request that will trigger the mocked error
    const request: ListGroupedProvidersRequest = {
      amount: 1,
      groups: [PaymentMethodGroup.Mobile, PaymentMethodGroup.CreditCard]
    }

    try {
      await client.listGroupedProviders(request)
    } catch (error) {
      expect(error.message).toBe('API error')
    }
  })
})
