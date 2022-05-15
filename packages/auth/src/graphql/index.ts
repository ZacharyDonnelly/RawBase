import { Server } from 'http'

import * as express from 'express'

import { importSchema } from 'graphql-import'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServer, ExpressContext } from 'apollo-server-express'

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { GRAPHQL_SCHEMA_PATH } from '../constants'

import resolvers from './resolvers'

const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
  loaders: [new GraphQLFileLoader()]
})

export async function createApolloServer(
  httpServer: Server,
  app: express.Application
): Promise<ApolloServer<ExpressContext>> {
  const server = new ApolloServer({
    schema: addResolversToSchema({
      schema: SCHEMA,
      resolvers
    }),
    introspection: true,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  server.applyMiddleware({ app })

  return server
}
