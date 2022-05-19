import { MutationResolvers } from '../../../types/Apollo'

import { ResolverContext } from '..'

import { DbUser } from './../../../db/index'

const mutateUsers: MutationResolvers<ResolverContext> = {
  createUser: async (_, { user }, ctx): Promise<DbUser> =>
    // TODO Hash passwords after seeding
    ctx.db.User.create({
      handle: user?.handle,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      hash: user?.password
    })
}

export default mutateUsers
