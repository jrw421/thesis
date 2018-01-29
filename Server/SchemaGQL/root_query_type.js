const graphql = require('graphql');
const UserType = require('./user_type');
const EventType = require('./event_type');
const _ = require('lodash');
const schema = require('./schema');
const db = require('../ControllersDB/mainController.js')

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
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
    allUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve: (parentValue, args) => {
        return db.user.findAll()
      }
        //this is where ^ controller functions would be input

      //args is an object that gets called for whatever we input into our query
      // the resolve function looks for the exact data we're looking for
      },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parentValue, args) => {
        return db.user.getUser(args.id)
          .then(user => user[0])
      }
    },
    events: {
      type: new GraphQLList(EventType),
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return db.event.findAll()
      }
    }
  })
})

module.exports = RootQueryType

// SAMPLE GRAPHQL QUERIES FROM ROOT
// GET ALL USERS
// {
// 	allUsers {
// 		email
// 		id
// 		member_status
// 	}
// }
// GET SINGLE USER
// {
// 	user(id: 1) {
// 		email
// 		id
// 		member_status
// 	}
// }
