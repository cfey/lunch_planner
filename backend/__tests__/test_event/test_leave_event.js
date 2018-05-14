const { leave } = require('../../routes/event/leave_event')
const { create } = require('../../routes/event/join_event')
const location = require('../../routes/location/create_location')
const account = require('../../routes/account/register_account')
const { createLunchspace } = require('../../routes/lunchspace/create_lunchspace')
const { createMockDatabase, dropMockDatabase } = require('../../lib/database/mock')

const testSpaceName = 'testspace'
const testSpaceSubdomain = 'test-space-subdomain'
const testLocationName = 'McBurger'
const testLocationCoordinates = { lat: 20, long: 10 }
const testFirstName = 'Max'
const testLastName = 'Mustermann'
const testEmail = 'max.mustermann@gmail.com'
const testPassword = 'password'
const testTime = '10:30'
const testDate = '2018-10-12'

let testUserId
let testLunchspaceId
let testLocationId

describe('leave event', () => {
  beforeAll(createMockDatabase)
  afterAll(dropMockDatabase)
  beforeAll(async () => {
    testUserId = await account.create(testEmail, testPassword, testFirstName, testLastName)
    testLunchspaceId = await createLunchspace(testUserId, testSpaceName, testSpaceSubdomain)
    testLocationId = await location
      .create(testLocationName, testLocationCoordinates, testLunchspaceId)
    await create(testUserId, testLocationId, testTime, testDate)
  })
  describe('leave', async () => {
    it('should delete a join_up_at entry in DB', async () => {
      await leave(testUserId, testLocationId, testTime, testDate)
    })
  })
})
