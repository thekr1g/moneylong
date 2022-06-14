const ApiError = require('../error/ApiError')
const {Category} = require('../models/models');
const uuid = require('uuid')
const path = require('path')
const T = require('tesseract.js')


class CheckController {
  async create(req, res, next) {
    try {
      const {img} = req.files
      console.log(img)
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      let result = ''
      await T.recognize(`./static/${fileName}`, 'rus', {logger: e => console.log(e)} ).then(out => {
        console.log(out.data.text)
        result = out.data.text

      })
      return res.json(result)
      // await Category.create({name, icon, color})
      // const category = await Category.findAll()

    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new CheckController()