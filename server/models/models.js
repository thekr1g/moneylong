const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
  name: {type: DataTypes.STRING},
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  icon: {type: DataTypes.STRING},
  color: {type: DataTypes.STRING},
})

const Record = sequelize.define('record', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  type: {type: DataTypes.STRING},
  money: {type: DataTypes.INTEGER},
})

const Account = sequelize.define('account', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  color: {type: DataTypes.STRING},
  money: {type: DataTypes.INTEGER},
})

const AccountType = sequelize.define('accountType', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING},
  icon: {type: DataTypes.STRING},
})

User.hasMany(Record)
Record.belongsTo(User)

User.hasMany(Account)
Account.belongsTo(User)

Category.hasMany(Record)
Record.belongsTo(Category)

AccountType.hasMany(Account)
Account.belongsTo(AccountType)

Account.hasMany(Record)
Record.belongsTo(Account)

module.exports = {
  User,
  Category,
  Record,
  Account,
  AccountType
}
