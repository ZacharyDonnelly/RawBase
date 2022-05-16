import { Resolvers } from '../../generated/resolvers-types.generated'

import { DbUser } from '../../db'

import Query from './Queries'
import Mutation from './Mutations'

export interface ResolverContext {
  db: any
  dbUserCache: Record<string, DbUser>
}

const resolvers: Resolvers<ResolverContext> = {
  Query,
  Mutation
}

export default resolvers
