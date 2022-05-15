/* eslint-disable no-console */
import { createServer } from 'http'

import express, { urlencoded } from 'express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import { createApolloServer } from './src/graphql'

const db = {}

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
  configureApp()
  await createApolloServer(db, httpServer, app)

  await new Promise<void>((resolve) =>
    app.listen({ port: 3006 }, () => {
      console.log(
        [
          'GraphQL server ready at \thttp://localhost:3006/graphql\n',
          `API ready on \thttp://localhost:3006${''}\t`
        ].join('')
      )
      resolve()
    })
  )
}

main().catch((err) => {
  console.error(err)
})
