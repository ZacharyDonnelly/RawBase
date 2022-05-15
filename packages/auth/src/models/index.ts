/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import User from './User'

dotenv.config()

const db: any = {}

export const sequelizeConnection = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD,
  {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    dialect: 'sqlite',
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
  const sqlModel = model(sequelizeConnection, Sequelize)
  db[sqlModel.name] = sqlModel
})

Object.keys(db).forEach((key) => {
  if ('associated' in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelizeConnection
db.Sequelize = Sequelize

export default db
