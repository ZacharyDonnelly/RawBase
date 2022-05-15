const queryUsers = {
  currentUser: () => ({
    id: '123',
    handle: 'johndoe',
    createdAt: ''
  }),
  user: (id: number) => ({
    id: '123',
    handle: 'johndoe'
  }),
  users: () => []
}

export default queryUsers
