import { MutationResolvers } from '../../../generated'

import { ResolverContext } from '..'

import { DbUser } from './../../../db/index'

const mutateUsers: MutationResolvers<ResolverContext> = {
  createUser: async (_, { user }): Promise<DbUser> => {
    const _user: any = {
      email: user?.email,
      firstName: user?.firstName,
      handle: user?.handle,
      lastName: user?.lastName,
      password: user?.password
    }

    return _user
  }

  // TODO Re-add once password hashing is implemented
  // return ctx.db.User.create({
  //   handle,
  //   email,
  //   firstName,
  //   lastName
  // })
}

export default mutateUsers
