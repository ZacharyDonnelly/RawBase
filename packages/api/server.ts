import { ApolloServer } from 'apollo-server'
import { schema } from './src/graphql/index.js'

const db = {}

const server = new ApolloServer({
  schema,
  introspection: true,
  context: { db },
})

// once sequelize is up & running, start market data service http listener
server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
