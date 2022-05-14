import express, { urlencoded } from 'express'
import { ApolloServer } from 'apollo-server-express'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import { schema } from './src/graphql'

const db = {}

const app = express()

const server = new ApolloServer({
  schema,
  introspection: true,
  csrfPrevention: true,
  context: { db }
})

const configureApp = () => {
  app.disable('x-powered-by')
  app.use(cors({ credentials: true }))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
  app.use(express.static('public'))
}

const startServer = async () => {
  await server.start()
  server.applyMiddleware({ app })
}

configureApp()
startServer()

// once sequelize is up & running, start market data service http listener
app.listen({ port: 3006 }, () => {
  console.log(`🚀 Server ready at 127.0.0.1:3006`)
})
