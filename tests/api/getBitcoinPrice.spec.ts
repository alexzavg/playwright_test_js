import { test, step } from '../../utils/envName'

test.describe('Bitcoin API', () => {

  test('Get Bitcoin Price', async ({pageManager}) => {
    await step('gets current Bitcoin price', async () => {
      await pageManager.apiRequest.getBitcoinPrice()
    })
  })

})
