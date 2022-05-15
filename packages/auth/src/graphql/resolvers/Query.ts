import { QueryResolvers } from '../../generated/resolvers-types.generated'

import { UserResolverContext } from '.'

const queryUsers: QueryResolvers<UserResolverContext> = {
  currentUser: () => ({
    id: '123',
    handle: 'johndoe',
    createdAt: '',
    firstName: '',
    lastName: '',
    email: ''
  }),
  user: () => ({
    id: '123',
    handle: 'johndoe',
    createdAt: '',
    firstName: '',
    lastName: '',
    email: ''
  }),
  users: () => []
}

export default queryUsers
