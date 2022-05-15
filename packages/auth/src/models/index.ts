import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import User from './User'

const db: any = {}

dotenv.config()

export const sequelizeConnection = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'sqlite'
  }
)

const models = [User]

models.forEach((model) => {
  const sqModel = model(sequelizeConnection)
  db[sqModel.name] = sqModel
})

Object.keys(db).forEach((key) => {
  if ('associated' in db[key]) {
    db[key].associate(db)
  }
})

db.sequelize = sequelizeConnection
db.Sequelize = Sequelize

export default db
