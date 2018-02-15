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
const addToCal = require('../Calendar/gcalConfig.js')

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }
      },
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.user.deleteUser(args.id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
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
        dateTimeStart: { type: GraphQLString }
      },
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.event.addEvent({
            host_id: args.host_id,
            name: args.name,
            description: args.description,
            date: args.date,
            time: args.time,
            location: args.location,
            img: args.img,
            dateTimeStart: args.dateTimeStart
          }, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       let event = await wait
       addToCal(event, args.host_id, true)
       return event
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
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.event.editEventFields(args.id, args, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
    toggleClaimOfItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.item.claimItem(args.id, args.user_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
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
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.user.findOrCreateUser(args, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
    confirmPresence: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.event_attendee.confirmPresence(args.id, args.guest_event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
    denyPresence: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.event_attendee.denyPresence(args.id, args.guest_event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },

    addItems: {
      type: new GraphQLList(ItemType),
      args: {
        itemNames: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.item.addMultiple({name: args.itemNames, event_id: args.event_id}, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLInt },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
       async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.item.add({name: args.name,  user_id: args.user_id, event_id: args.event_id}, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
    deleteItem: {
      type: new GraphQLList(ItemType),
      args: {
        user_id: { type: GraphQLInt },
        event_id: { type: GraphQLInt },
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.item.deleteItem(args.id, args.event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
    addComment: {
      type: ItemCommentType,
      args: {
        content: { type: GraphQLString },
        user_id: { type: new GraphQLNonNull(GraphQLInt) },
        item_id: { type: new GraphQLNonNull(GraphQLInt) },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValues, args) {
        let wait = new Promise((resolve, reject) => {
          db.itemComments.addItemComment(
            {
              content: args.content,
              user_id: args.user_id,
              item_id: args.item_id,
              event_id: args.event_id
            },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
        return await wait
      }
    },
    addRecipients: {
      type: EventType,
      args: {
        nameEmail: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
        id: { type: GraphQLInt },
        event_id: { type: GraphQLInt },
        dateTimeStart: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
           db.user.getUserById(args.id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       let user = await wait
       let guests = args.nameEmail.map((n) => {
              const arr = n.split('*');
              return [arr[0], arr[1]];
        });

        let email = new Promise((reject, resolve) => {
           sendMessage(guests, user, args.event_id, function(err, res){
            if (err) {
              reject(err)
            } else {
    
              resolve(res)
            }
           })
        })

        return email.then(event => {
                          event
                        })
                        .catch(err => {
                          err
                        })        
      },
    },
    upVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt }
      },
      async resolve(parentValue, args) {
        let response;
        let wait = new Promise((resolve, reject) => {
          db.vote.upVote(args.item_id, args.user_id, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      return await wait
      }
    },
    downVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt }
      },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.vote.downVote(args.item_id, args.user_id, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        return await wait
      }
    },
    saveEvent: {
      type: UserType,
      args: {
        id: {type: GraphQLInt}, 
        lastEvent: {type: GraphQLInt}
      }, 
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.user.editField(args.id, 'lastEvent', args.lastEvent, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },  
    addToCalendar: {
      type: EventType, 
      args: {
          description: {type: GraphQLString}, 
          name: {type: GraphQLString}, 
          location: {type: GraphQLString}, 
          dateTimeStart: {type: GraphQLString}, 
          id: {type: GraphQLInt},
          user_id: {type: GraphQLInt}
      }, 
      resolve(parentValue, args){
        let event = {
          description: args.description, 
          name: args.name, 
          location: args.location, 
          dateTimeStart: args.dateTimeStart, 
          id: args.id
        }
        addToCal(event, args.user_id)
        return event
      }
    },
  }
});

module.exports = mutations;
