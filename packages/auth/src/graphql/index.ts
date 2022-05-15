import { Server } from 'http'

import * as express from 'express'

import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer, ExpressContext } from 'apollo-server-express'

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import resolvers from './resolvers'

export const schema: any = makeExecutableSchema({
  typeDefs: importSchema('src/graphql/typeDefs/schema.gql'),
  resolvers
})

export async function createApolloServer(
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const server = new ApolloServer({
    schema,
    introspection: true,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  server.applyMiddleware({ app })

  return server
}
