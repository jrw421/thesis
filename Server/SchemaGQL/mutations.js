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
        return db.user.deleteUser(args.id).then(item => item).catch(err => err);
      }
    },
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        host_id: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLInt },
        time: { type: GraphQLString },
        location: { type: GraphQLString },
        img: { type: GraphQLString },
        endTime: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        return db.event.addEvent({
          host_id: args.host_id,
          name: args.name,
          description: args.description,
          date: args.date,
          time: args.time,
          location: args.location,
          img: args.img,
          endTime: args.endTime
        })   .then(x => x)
        .catch(err => err)
      }
    },
    editEventFields: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLInt },
        time: { type: GraphQLString },
        location: { type: GraphQLString },
        img: { type: GraphQLString }
      },
      resolve(parentValues, args) {
        return db.event
          .editEventFields(args.id, args)
          .then(editedEvent => editedEvent[0]).catch(err => err);
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
          .then(response => response[0]).catch(err =>  err);
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
          .catch(error => error);
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
          .catch(error => error);
      }
    },
    addItems: {
      type: new GraphQLList(ItemType),
      args: {
        itemNames: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValues, args) {
        return db.item
          .addMultiple({
            name: args.itemNames,
            event_id: args.event_id
          })
          .then(() => {
            return db.item.getItemsByEventId(args.event_id);
          })
          .catch(err => {
            return err
          });
      },
    },
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLInt },
        event_id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValues, args) {
        return db.item
          .add({
            name: args.name,
            user_id: args.user_id,
            event_id: args.event_id,
          })
          .then(item => item)
          .catch(error => error);
      },
    },
    deleteItem: {
      type: new GraphQLList(ItemType),
      args: {
        user_id: { type: GraphQLInt },
        event_id: { type: GraphQLInt },
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValues, args) {
        let query
        try {
          let deletion = await db.item.deleteItem(args.id)
          query = await db.item.getItemsByEventId(args.event_id) 
        } catch(e) {
          return e
        }
        return query
      },
    },
    addComment: {
      type: ItemCommentType,
      args: {
        content: { type: GraphQLString },
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        item_id: { type: new GraphQLNonNull(GraphQLInt) },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValues, args) {
        return db.itemComments.addItemComment({
          content: args.content,
          user_id: args.user_id,
          item_id: args.item_id,
          event_id: args.event_id,
        }).then(x => x)
        .catch(err => err)
      },
    },
    addRecipients: {
      type: new GraphQLList(UserType),
      args: {
        nameEmail: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
        id: { type: GraphQLInt },
        event_id: { type: GraphQLInt },
        dateTimeStart: {type: GraphQLString},
        dateTimeEnd: {type: GraphQLString}
      },
      resolve(parentValues, args) {
        return knex
          .select('*')
          .from('user')
          .where('id', args.id)
          .then((res) => {
            const user = res[0];
            const guests = args.nameEmail.map((n) => {
              const arr = n.split('*');
              return [arr[0], arr[1]];
            });

            return sendMessage(guests, user, args.event_id, args.dateTimeStart, args.dateTimeEnd);
          })
          .catch(x => x);
      },
    },
    upVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return db.vote.upVote(args.item_id, args.user_id)   .then(x => x)
        .catch(err => err)
      },
    },
    downVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return db.vote.downVote(args.item_id, args.user_id)   .then(x => x)
        .catch(err => err)
      },
    },
    saveEvent: {
      type: UserType, 
      args: {
        id: {type: GraphQLInt}, 
        lastEvent: {type: GraphQLInt}
      }, 
      resolve(parentValue, args){
        console.log('save event params', args.id, args.lastEvent)
        return db.user.editField(args.id, 'lastEvent', args.lastEvent)   .then(x => x)
        .catch(err => err)
      }
    }
  },
});

module.exports = mutations;
