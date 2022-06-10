const ApiError = require('../error/ApiError')
const {AccountType} = require('../models/models');


class AccountTypeController {
  async create(req, res, next) {
    try {
      const {name, icon} = req.body
      await AccountType.create({name, icon})
      const accountTypes = await AccountType.findAll()
      return res.json(accountTypes)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const accountTypes = await AccountType.findAll()
    return res.json(accountTypes)
  }
}

module.exports = new AccountTypeController()