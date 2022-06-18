import { Server } from 'http'

import path from 'path'

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import * as express from 'express'

import resolvers from '../graphql/resolvers'

import { ResolverContext } from './../graphql/resolvers/index'

const current = path.dirname('schema.graphql')

const SCHEMA = loadSchemaSync(current, {
  loaders: [new GraphQLFileLoader()]
})

async function createApolloServer(
  db: any,
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
    context: () => ({ db, dbUserCache: {} } as ResolverContext),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app })

  return server
}

export default createApolloServer
