import { Resolvers } from '../../types/Apollo'

import { DbUser } from '../../db'

import Query from './Queries'
import { User } from './Mutations'

export interface ResolverContext {
  db: any
  dbUserCache: Record<string, DbUser>
}

const resolvers: Resolvers<ResolverContext> = {
  Query,
  Mutation: {
    ...User
  }
}

export default resolvers
