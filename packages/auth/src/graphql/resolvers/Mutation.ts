import db from '../../db'
import { MutationResolvers } from '../../generated/resolvers-types.generated'

const mutateUsers: MutationResolvers = {
  createUser: async (_, { handle, email, firstName, lastName, hash }, ctx) =>
    ctx.db.User.create({
      handle,
      email,
      firstName,
      lastName,
      hash
    })
}

export default mutateUsers
