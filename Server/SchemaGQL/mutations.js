const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} = graphql;
const UserType = require('./types').UserType;
const EventType = require('./types').EventType;
const ItemType = require('./types').ItemType;
const ItemsType = require('./types').ItemsType;
const db = require('../ControllersDB/mainController.js');
const {
  generateID,
  transporter,
  sendMessage
} = require('../Email/emailConfig.js');
const knex = require('../dbConfig.js').knex;

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return db.user.deleteUser(args.id).then(item => item).catch(err => console.log(20, err));
      }
    },
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        host_id: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLString },
        location: { type: new GraphQLNonNull(GraphQLString) },
        img: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return db.event.addEvent({
          host_id: args.host_id,
          name: args.name,
          description: args.description,
          date: args.date,
          location: args.location,
          img: args.img
        });
      }
    },
    editEventFields: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        location: { type: GraphQLString },
        img: { type: GraphQLString }
      },
      resolve(parentValues, args) {
        return db.event
          .editEventFields(args.id, args)
          .then(editedEvent => editedEvent[0]).catch(err => console.log(21, err));
      }
    },
    toggleClaimOfItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValues, args) {
        return db.item
          .claimItem(args.id, args.user_id)
          .then(response => response[0]).catch(err => console.log(22, err));
      }
    },
    findOrCreateUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        img: { type: new GraphQLNonNull(GraphQLString) },
        google_id: { type: new GraphQLNonNull(GraphQLString) },
        etag: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString }
      },
      resolve(parentValues, args) {
        return db.user
          .findOrCreateUser(args)
          .then(response => response)
          .catch(error => console.log(23, error));
      }
    },
    confirmPresence: {
      type: UserType,
      args: {
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValues, args) {
        return db.event_attendee
          .confirmPresence(args.user_id, args.event_id)
          .then(user => user)
          .catch(error => console.log(24, error));
      }
    }
  },
  addItem: {
    type: ItemType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: GraphQLInt },
      event_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.item
        .add({
          name: args.name,
          user_id: args.userId,
          event_id: args.event_id
        })
        .then(item => item)
        .catch(error => console.log(25, error));
    }
  },

  addItems: {
    type: new GraphQLList(ItemsType),
    args: {
      itemNames: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
      event_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      console.log('add items resolve args', args)
      return db.item
        .addMultiple({
          name: args.itemNames,
          event_id: args.event_id
        })
        .then(() => {
          return db.item.getItemsByEventId(args.event_id);
        })
        .catch(err => {
          console.log(26, err)
          return null
        });
    }
  },

  addRecipients: {
    type: new GraphQLList(UserType),
    args: {
      nameEmail: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
      id: { type: GraphQLInt },
      event_id: { type: GraphQLInt }
    },
    resolve(parentValues, args) {
      return knex
        .select('*')
        .from('user')
        .where('id', args.id)
        .then(res => {
          let user = res[0];
          let guests = args.nameEmail.map(n => {
            let arr = n.split('*');
            return [arr[0], arr[1]];
          });

          return sendMessage(guests, user, args.event_id);
        })
        .catch(x => console.log(27, x));
    }
  }
});

module.exports = mutations;
