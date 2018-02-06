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
const ItemCommentType = require('./types').ItemCommentType;
const VoteType = require('./types').VoteType;
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
    resolve(parentValues, args) {
      return db.user.findOrCreateUser(args)
        .then(response => response)
        .catch(error => error)
    }
  },
  confirmPresence: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt)},
      guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.event_attendee.confirmPresence(args.id, args.guest_event_id)
        .then(user => user)
        .catch(error => error)
    }
  },
  denyPresence: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt)},
      guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.event_attendee.denyPresence(args.id, args.guest_event_id)
        .then(user => user)
        .catch(error => error)
    }
  },
  addItem: {
    type: ItemType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: GraphQLID },
      event_id: { type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(parentValues, args) {
      return db.item.add({
        name: args.name,
        user_id: args.user_id,
        event_id: args.event_id
      })
      .then(item => item)
      .catch(error => error)
    }
  },
  addItems: {
    type: new GraphQLList(ItemsType),
    args: {
      itemNames: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
      eventId: { type: new GraphQLNonNull(GraphQLInt)  }
    },
    resolve(parentValues, args) {
      console.log('args in mutations', args)
      return db.item.addMultiple({
        name: args.itemNames,
        event_id: args.event_id
      }).then(() => {
      return db.item.getItemsByEventId(args.event_id)
      })
    }
    // items: {
    //   type: new GraphQLList(ItemType),
    //   resolve(parentValue, args){
    //     return db.item.getItemsByEventId(args.eventId)
    //   }
    }

}
})






            return sendMessage(guests, user, args.event_id);
          })
          .catch(x => x);
      }
    },
    upVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return db.vote.upVote(args.item_id, args.user_id)
      }
    },
    downVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return db.vote.downVote(args.item_id, args.user_id)
      }
    }
  }
});

module.exports = mutations;
