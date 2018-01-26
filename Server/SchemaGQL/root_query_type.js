const graphql = require('graphql');
const UserType = require('./user_type');
const EventType = require('./event_type');

const {
  GraphQLInt,
  GraphQLObjectType
} = graphql;


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
      //args is an object that gets called for whatever we input into our query
      // the resolve function looks for the exact data we're looking for
      }
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return _.find(events, { id: args.id })
      }
    }
  })
})