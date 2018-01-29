const graphql = require('graphql');
const UserType = require('./types').UserType;
const EventType = require('./types').EventType;
const _ = require('lodash');
const schema = require('./schema');
const db = require('../ControllersDB/mainController.js')

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList
} = graphql;


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
