import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from '@graphql-tools/schema'

import resolvers from './resolvers'

export const schema: any = makeExecutableSchema({
  typeDefs: importSchema('src/graphql/typeDefs/schema.gql'),
  resolvers
})
