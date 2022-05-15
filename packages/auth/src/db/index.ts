export interface DbEntity {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface DbUser extends DbEntity {
  handle: string
  lastName: string
  firstName: string
  email: string
}

export interface DbSchema {
  users: DbUser[]
}

class Db {
  constructor() {}
}

export default Db
