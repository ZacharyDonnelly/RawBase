import { Resolvers } from '../../resolvers-types.generated'

import Db from '../../db'

import Query from './Query'

export interface UserResolverContext {
  db: Db
}

const resolvers: Resolvers<UserResolverContext> = {
  Query
}

export default resolvers
