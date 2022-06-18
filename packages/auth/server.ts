/* eslint-disable no-console */
import { createServer } from 'http'

import chalk from 'chalk'

// ts-ignore
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { urlencoded } from 'express'
import morgan from 'morgan'

import createApolloServer from './src/apollo'
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
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }

  await new Promise<void>((resolve) =>
    sequelizeConnection.sync().then(() => {
      app.listen({ port: process.env.PORT }, () => {
        console.log(
          [
            `\n`,
            chalk?.bgBlueBright.white.bold(
              `GraphQL server ${''} ready at\thttp://localhost:${
                process.env.PORT
              }/graphql\n`
            ),
            chalk?.bgWhite.black(
              `Rest API server ready at\thttp://localhost:${process.env.PORT}\n`
            ),
            chalk?.bgMagentaBright.black(
              `Database server ready at\tsqlite://127.0.0.1:${process.env.DB_PORT}\n`
            )
          ].join('')
        )
        resolve()
      })
    })
  )
}

main().catch((err) => {
  console.error(err)
})
