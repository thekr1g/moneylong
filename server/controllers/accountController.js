const { Account, Record} = require('../models/models')
const ApiError = require('../error/ApiError')


class AccountController {
  async create(req, res, next) {
    try {
      const {name, color, money, userId, accountTypeId, filter} = req.body
      let ord
      if (filter) {
        if (filter === 'A-Z') {
          ord = [['name', 'ASC']]
        }
        if (filter === 'Default') {
          ord = [['createdAt', 'ASC']]
        }
      } else {
        ord = [['createdAt', 'ASC']]
      }
      await Account.create({name, color, money, userId, accountTypeId})
      const accounts = await Account.findAll({order: ord})
      return res.json(accounts)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let {userId, filter} = req.query
      let ord
      if (filter) {
        if (filter === 'A-Z') {
          ord = [['name', 'ASC']]
        }
        if (filter === 'Z-A') {
          ord = [['name', 'DESC']]
        }
        if (filter === 'Сумма (по убыванию)') {
          ord = [['money', 'DESC']]
        }
        if (filter === 'Сумма (по возрастанию)') {
          ord = [['money', 'ASC']]
        }
        if (filter === 'Default') {
          ord = [['createdAt', 'ASC']]
        }
      } else {
        ord = [['createdAt', 'ASC']]
      }
      const accounts = await Account.findAll({order: ord, where: {userId}})
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

  async getOne(req, res) {
    const {id} = req.params
    const account = await Account.findOne({where: {id}})
    return res.json(account)
  }

  async delete(req, res, next) {
    try {
      let {id} = req.query
      await Record.destroy({where: {accountId: id}})
      await Account.destroy({where: {id}})
      const accounts = await Account.findAll({order: [['createdAt', 'ASC']]})
      return res.json(accounts)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

}

module.exports = new AccountController()