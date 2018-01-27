const graphql = require('graphql');
const UserType = require('./user_type');
const EventType = require('./event_type');
const _ = require('lodash');
const schema = require('./schema');

const {
  GraphQLInt,
  GraphQLObjectType
} = graphql;



var users = [
  { id: 23, name: 'Bill', email: 'csfsd@sdfss.com', token: '234234', member_status: false},
  { id: 28, name: 'Alice', email: 'csfsd@sdfsdfsss.com', token: '23sdf4234', member_status: false}
]

let events = [
  { id: 22, userId: 23, name: 'my party', description: 'a party', date: '04-13-2019', location: '23 Pine Street'},
  { id: 29, userId: 28, name: 'come on over', description: 'another party', date: '04-13-2019', location: '23 Pine Street'}
]


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    //this ^ callback can be omitted, but resolves certain errors in definition and invocation order
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return _.find(users, { id: args.id })
        //this is where ^ controller functions would be input

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

module.exports = RootQueryType
