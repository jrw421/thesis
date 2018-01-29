const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt } = graphql;
const UserType = require('./user_type')
const EventType = require('./event_type');
const db = require('../ControllersDB/mainController.js');


const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: { 
    addUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      token: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parentValue, args) {
      return db.user.addUser({name: args.name, email: args.email, token: args.token})
      .then(item => item.attributes)
    }
  },
  deleteUser: {
    type: UserType,
    args: { id: { type: GraphQLInt }
    },
    resolve(parentValue, args) {
      return db.user.deleteUser(args.id)
        .then(item => item)
    }
  },
  addEvent: {
    type: EventType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      host_id: { type: new GraphQLNonNull(GraphQLInt) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: GraphQLString } , 
      location: { type: new GraphQLNonNull(GraphQLString)},
      image: { type: GraphQLString}
    },
    resolve(parentValue, args) {
      return db.event.addEvent({
        host_id: args.host_id,
        name: args.name,
        description: args.description,
        date: args.date,
        location: args.location
      })
    }
  }
  }
})


module.exports = mutations;


// addUser
// removeUser
// claimAnItem
// --may not need to wait for Madison to finish before dealing with this
// addEvent
// deleteEvent
// editEvent
// confirmPresence
// denyPresence

