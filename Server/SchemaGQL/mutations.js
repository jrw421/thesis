const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt } = graphql;
const UserType = require('./types').UserType
const EventType = require('./types').EventType;
const ItemType = require('./types').ItemType;
const db = require('../ControllersDB/mainController.js');


const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: { 

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
      host_id: { type: new GraphQLNonNull(GraphQLID) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: GraphQLString } , 
      location: { type: new GraphQLNonNull(GraphQLString)},
      image: { type: GraphQLString}
    },
    resolve(parentValue, args) {
      return db.event.addEvent({
        host_id: args.host_id,
        //host id isnt adding for some reason
        name: args.name,
        description: args.description,
        date: args.date,
        location: args.location
      })
    }
  },
  editEventFields: {
    type: EventType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLString },
      description: {type: GraphQLString },
      date: { type: GraphQLString },
      location: { type: GraphQLString },
      img: { type: GraphQLString }
    },
    resolve(parentValues, args) {
      return db.event.editEventFields(args.id, args)
        .then(editedEvent =>  editedEvent[0])
    }
    },
    toggleClaimOfItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
        userId: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parentValues, args) {
        return db.item.claimItem(args.id, args.userId)
          .then(response => response[0])
      }
  },
  findOrCreateUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString)},
      img: { type: new GraphQLNonNull(GraphQLString)},
      google_id: { type: new GraphQLNonNull(GraphQLString)},
      etag: { type: new GraphQLNonNull(GraphQLString)},
      email: { type: new GraphQLNonNull(GraphQLString)},
      cookie: { type: GraphQLString }
    },
    resolve(parentValues, args) {
      return db.user.findOrCreateUser(args)
        .then(response => response)
    }
  },
  confirmPresence: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLInt)},
      eventId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.event_attendee.confirmPresence(args.userId, args.eventId)
        .then(user => user)
    }
  },
  denyPresence: {
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLInt)},
      eventId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.event_attendee.confirmPresence(args.userId, args.eventId)
        .then(user => user)
    }
  },
  addItem: {
    type: ItemType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      userId: { type: GraphQLID },
      eventId: { type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(parentValues, args) {
      return db.item.add({
        name: args.name, 
        user_id: args.userId,
        event_id: args.eventId 
      })
      .then(item => item)
    }
  }
}
})







module.exports = mutations;


// addEvent
// deleteEvent
// editEvent
// confirmPresence
// denyPresence

