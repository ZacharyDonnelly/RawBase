/* eslint-disable no-console */
import { createServer } from 'http'

import chalk from 'chalk'
import express, { urlencoded } from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import dotenv from 'dotenv'

import { createApolloServer } from './src/graphql/ApolloServer'
import db, { sequelizeConnection } from './src/db'

const app = express()
const httpServer = createServer(app)

const configureApp = () => {
  app.disable('x-powered-by')
  app.use(cors({ credentials: true }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
}

const main = async () => {
  dotenv.config()
  configureApp()
  await createApolloServer(db, httpServer, app)

  // * Testing SQLITE DB connection on dev
  if (process.env.NODE_ENV === 'development') {
    try {
      await sequelizeConnection.authenticate()
      await sequelizeConnection.sync()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

  await new Promise<void>((resolve) =>
    app.listen({ port: process.env.PORT }, () => {
      console.log(
        [
          chalk.bgBlueBright.white.bold(
            `GraphQL server ready at \thttp://localhost:${process.env.PORT}/graphql\n`
          ),
          chalk.bgWhite.black(
            `API ready on \thttp://localhost:${process.env.PORT}${''}\t`
          )
        ].join('')
      )
      resolve()
    })
  )
}

main().catch((err) => {
  console.error(err)
})
