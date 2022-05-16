import { MutationResolvers } from '../../../generated/resolvers-types.generated'

import { ResolverContext } from '..'

const mutateUsers: MutationResolvers<ResolverContext> = {
  createUser: async (_, { email, firstName, handle, lastName }) => {
    const users: any = []

    await setTimeout(() => {
      users.push({
        email,
        firstName,
        handle,
        lastName
      })
    }, 1000)

    return users
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
