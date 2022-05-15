export interface DbEntity {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

const db = {}

export default db
