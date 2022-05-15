import PubSub from 'apollo-server'

// const pubsub = new PubSub()

/**
 * extractInput - extracts the actual input payload from the graphql input
 * in case no input was provided, the function returns an empty JSON object
 *
 * @param {*} args
 */
const getQuery = function (args: { query: any }) {
  return args.query ? args.query : {}
}

const getInput = function (args: { input: any }) {
  return args.input ? args.input : {}
}

export default {
  Query: {
    user: (parent: any, args: any, { db }: any, info: any) =>
      db.getUser(args, info)
  }
}
