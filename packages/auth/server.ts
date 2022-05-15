/* eslint-disable no-console */
import { createServer } from 'http'

import express, { urlencoded } from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import dotenv from 'dotenv'

import { createApolloServer } from './src/graphql'

const app = express()
const httpServer = createServer(app)

const configureApp = () => {
  app.disable('x-powered-by')
  app.use(cors({ credentials: true }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
}

async function main() {
  dotenv.config()
  configureApp()
  await createApolloServer(httpServer, app)

  await new Promise<void>((resolve) =>
    app.listen({ port: process.env.PORT }, () => {
      console.log(
        [
          `GraphQL server ready at \thttp://localhost:${process.env.PORT}/graphql\n`,
          `API ready on \thttp://localhost:${process.env.PORT}${''}\t`
        ].join('')
      )
      resolve()
    })
  )
}

main().catch((err) => {
  console.error(err)
})
