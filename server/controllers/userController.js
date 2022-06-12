const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const uuid = require('uuid')
const path = require('path');

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    const {email, password, name} = req.body
    console.log(email, password, name)
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, password: hashPassword, name})
    const token = generateJwt(user.id, user.email, user.name)
    return res.json(token)
  }

  async login(req, res, next) {
    const {email, password} = req.body

    console.log(email, password)
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'))
    }
    const token = generateJwt(user.id, user.email, user.name)
    return res.json(token)
  }


  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.name)
    return res.json(token)
  }

  async updateImage(req, res, next) {
    try {
      const {id} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))
      const user = await User.findOne({where: {id}})
      user.update({avatar: fileName})
      const token = generateJwt(user.id, user.email, user.role)
      const userInfo = {
        name: user.name,
        avatar: user.avatar,
        isActivate: user.isActivate
      }
      return res.json({token, userInfo})
    } catch (e) {
      return next(ApiError.badRequest('Не получилось обновить картинку'))
    }
  }

}

module.exports = new UserController()