/* eslint-disable no-console */
import { Sequelize } from 'sequelize'

import { User } from '../models'

import { Config } from '../../config'

export interface DbEntity {
  id: string
}

export interface DbUser extends DbEntity {
  email: string
  firstName: string
  lastName: string
  handle: string
  password: string
}

const db: any = {}

export const sequelizeConnection = new Sequelize(
  Config.database,
  Config.username,
  Config.password,
  {
    host: Config.host,
    port: Config.port,
    dialect: Config.dialect,
    storage: Config.storage,
    logging: console.log,
    define: {
      freezeTableName: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

const models = [User]

models.forEach((model) => {
  const dbModel = model(sequelizeConnection, Sequelize)
  db[dbModel.name] = dbModel
})

Object.keys(db).forEach((key) => {
  if ('associated' in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelizeConnection
db.Sequelize = Sequelize

export default db
