const account = require('../routes/account')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const { mockReq, mockRes } = require('sinon-express-mock')

chai.use(sinonChai)
const { expect } = chai

describe('account', () => {
  describe('count', () => {
    it('should return 0', async () => {
      const req = mockReq()
      const res = mockRes()
      await account.count(req, res)
      expect(res.json).to.be.calledWith({ count: 0 })
    })
  })
})

