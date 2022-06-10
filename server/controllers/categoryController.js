const ApiError = require('../error/ApiError')
const {Category} = require('../models/models');


class CategoryController {
  async create(req, res, next) {
    try {
      const {name, icon} = req.body
      await Category.create({name, icon})
      const category = await Category.findAll()
      return res.json(category)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    const category = await Category.findAll()
    return res.json(category)
  }
}

module.exports = new CategoryController()