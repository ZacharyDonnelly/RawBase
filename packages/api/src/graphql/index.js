import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers/index.js'

export const schema = makeExecutableSchema({
  typeDefs: importSchema('src/graphql/typeDefs/schema.gql'),
  resolvers,
})
