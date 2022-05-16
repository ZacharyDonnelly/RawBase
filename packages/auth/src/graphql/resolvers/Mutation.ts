import {
  MutationResolvers,
  MutationCreateUserArgs
} from '../../generated/resolvers-types.generated'

const mutateUsers: MutationResolvers<MutationCreateUserArgs> = {
  createUser: async (_, { email, firstName, handle, lastName }, ctx) => {
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
