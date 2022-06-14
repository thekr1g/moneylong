const { Account, Record} = require('../models/models')
const ApiError = require('../error/ApiError')


class RecordController {
  async create(req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 50
      let offset = page * limit - limit

      const {name, accountId, categoryId, type, money, userId} = req.body
      await Record.create({name, accountId, categoryId, type, money, userId})
      const records = await Record.findAll({order: [['createdAt', 'DESC']],where: {userId}, limit, offset})
      return res.json(records)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let {limit, page, userId, accountId} = req.query
      page = page || 1
      limit = limit || 50
      let offset = page * limit - limit
      let records = []
      if (accountId) {
        records = await Record.findAll({order: [['createdAt', 'DESC']], where: {userId, accountId}, limit, offset})
      } else {
        records = await Record.findAll({order: [['createdAt', 'DESC']], where: {userId}, limit, offset})
      }

      return res.json(records)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

  async update(req, res, next) {
    try {

      let {id, name, accountId, categoryId, type, money, limit, page, userId} = req.body
      page = page || 1
      limit = limit || 50
      let offset = page * limit - limit

      let changes
      if (name) {
        changes = {name}
      }
      if (accountId) {
        changes = {...changes, accountId}
      }
      if (categoryId) {
        changes = {...changes, categoryId}
      }
      if (type) {
        changes = {...changes, type}
      }
      if (money) {
        changes = {...changes, money}
      }

      const record = await Record.findOne({where: {id}})
      await  record.update(changes)

      const records = await Record.findAll({order: [['createdAt', 'DESC']],where: {userId}, limit, offset})
      return res.json(records)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      let {id, limit, page, userId} = req.query
      page = page || 1
      limit = limit || 50
      let money
      let offset = page * limit - limit
      const record = await Record.findOne({where: {id}})
      const account = await Account.findOne({where: {id: record.accountId}})
      if (record.type === '+') {
        money = Number(account.money) - Number(record.money)
      } else if (record.type === '-') {
        money = Number(account.money) + Number(record.money)
      }
      account.update({money})
      await Record.destroy({where: {id}})
      const records = await Record.findAll({order: [['createdAt', 'DESC']],where: {userId} ,limit, offset})
      return res.json(records)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

}

module.exports = new RecordController()