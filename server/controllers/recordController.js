const { Account, Record} = require('../models/models')
const ApiError = require('../error/ApiError')


class RecordController {
  async create(req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit

      const {name, accountId, categoryId, type, money, userId} = req.body
      await Record.create({name, accountId, categoryId, type, money, userId})
      const records = await Record.findAll({limit, offset})
      return res.json(records)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit

      const records = await Record.findAll({limit, offset})
      return res.json(records)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

  async update(req, res, next) {
    try {

      let {id, name, accountId, categoryId, type, money, limit, page} = req.body
      page = page || 1
      limit = limit || 20
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

      const records = await Record.findAll({limit, offset})
      return res.json(records)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      let {id, limit, page} = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit
      await Account.destroy({where: {id}})
      const accounts = await Account.findAll({limit, offset})
      return res.json(accounts)
    } catch (e) {
      return next(ApiError.badRequest(e.message))
    }

  }

}

module.exports = new RecordController()