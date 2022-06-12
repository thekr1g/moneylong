const { Account} = require('../models/models')
const ApiError = require('../error/ApiError')


class AccountController {
  async create(req, res, next) {
    try {
      const {name, color, money, userId, accountTypeId} = req.body
      await Account.create({name, color, money, userId, accountTypeId})
      const accounts = await Account.findAll({order: [['createdAt', 'ASC']]})
      return res.json(accounts)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let {userId} = req.query
      const accounts = await Account.findAll({order: [['createdAt', 'ASC']], where: {userId}})
      return res.json(accounts)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

  async update(req, res, next) {
    try {
      const {id, name, color, money, accountTypeId} = req.body
      let changes
      if (name) {
        changes = {name}
      }
      if (color) {
        changes = {...changes, color}
      }
      if (money) {
        changes = {...changes, money}
      }
      if (accountTypeId) {
        changes = {...changes, accountTypeId}
      }

      const account = await Account.findOne({where: {id}})
      await  account.update(changes)

      const accounts = await Account.findAll({order: [['createdAt', 'ASC']]})
      return res.json(accounts)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      let {id} = req.query
      await Account.destroy({where: {id}})
      const accounts = await Account.findAll({order: [['createdAt', 'ASC']]})
      return res.json(accounts)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

}

module.exports = new AccountController()