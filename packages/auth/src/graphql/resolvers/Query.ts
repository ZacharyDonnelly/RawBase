import { QueryResolvers } from '../../generated/resolvers-types.generated'

import db from '../../db'

const queryUsers: QueryResolvers = {
  currentUser: () => db.User.findOne({ where: { id: 1 } }),
  user: () => db.User.findOne({ where: { id: 2 } }),
  users: () => db.User.findAll()
}

export default queryUsers
