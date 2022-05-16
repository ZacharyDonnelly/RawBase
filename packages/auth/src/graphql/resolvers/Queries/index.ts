import { QueryResolvers } from '../../../generated'

import { DbUser } from '../../../db/index'
import { ResolverContext } from '..'

const queryResolvers: QueryResolvers<ResolverContext> = {
  currentUser: async (_, __, { db }: any): Promise<DbUser> =>
    await db.User.findOne({ where: { id: 1 } }),
  user: async (_, { id }, { db }: any): Promise<DbUser> =>
    await db.User.findOne({ where: { id } }),
  users: async (_, __, { db }: any): Promise<DbUser[]> =>
    await db.User.findAll()
}

export default queryResolvers
