import { QueryResolvers } from '../../generated/resolvers-types.generated'

const queryUsers: QueryResolvers = {
  currentUser: async (_, __, ctx) => ctx.db.User.findOne({ where: { id: 1 } }),
  user: async (_, { id }, ctx) => ctx.db.User.findOne({ where: { id } }),
  users: async (_, __, ctx) => ctx.db.User.findAll()
}

export default queryUsers
