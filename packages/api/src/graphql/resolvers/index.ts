import PubSub from 'apollo-server'

// const pubsub = new PubSub()

/**
 * extractInput - extracts the actual input payload from the graphql input
 * in case no input was provided, the function returns an empty JSON object
 *
 * @param {*} args
 */
let getQuery = function (args: { query: any }) {
  return args.query ? args.query : {}
}

let getInput = function (args: { input: any }) {
  return args.input ? args.input : {}
}

export default {
  Query: {
    user: (parent: any, args: any, { db }: any, info: any) =>
      db.getUser(args, info),
    org: (parent: any, args: any, { db }: any, info: any) =>
      db.getOrg(args, info),
    role: (parent: any, args: any, { db }: any, info: any) =>
      db.getRole(args, info)
  }
}
