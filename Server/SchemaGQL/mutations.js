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
       async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.user.deleteUser(args.id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
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
       async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.addEvent({
            host_id: args.host_id,
            name: args.name,
            description: args.description,
            date: args.date,
            time: args.time,
            location: args.location,
            img: args.img,
            endTime: args.endTime
          }, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
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
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.editEventFields(args.id, args, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    },
    toggleClaimOfItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        user_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
       async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.item.claimItem(args.id, args.user_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
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
        let response
        let wait = new Promise((resolve, reject) => {
          db.user.findOrCreateUser(args, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    },
    confirmPresence: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt)},
        guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event_attendee.confirmPresence(args.id, args.guest_event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    },
    denyPresence: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt)},
        guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args) {
        console.log('args', args)
        let response
        let wait = new Promise((resolve, reject) => {
          db.event_attendee.denyPresence(args.id, args.guest_event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    },

    addItems: {
      type: new GraphQLList(ItemType),
      args: {
        itemNames: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
        event_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
       async resolve(parentValue, args) {

        let response
        let wait = new Promise((resolve, reject) => {
          db.item.addMultiple({name: args.itemNames, event_id: args.event_id}, function(err, res){
            console.log('items resolve', err, res)
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    },
    addItem: {
      type: ItemType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLInt },
        event_id: { type: new GraphQLNonNull(GraphQLInt) },
      },
       async resolve(parentValue, args) {

        let response
        let wait = new Promise((resolve, reject) => {
          db.item.add({name: args.name,  user_id: args.user_id, event_id: args.event_id}, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
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
        let response
        let wait = new Promise((resolve, reject) => {
          db.item.deleteItem(args.id, args.event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
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
      type: EventType,
      args: {
        nameEmail: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
        id: { type: GraphQLInt },
        event_id: { type: GraphQLInt },
        dateTimeStart: {type: GraphQLString},
        dateTimeEnd: {type: GraphQLString}
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
           sendMessage(guests, user, args.event_id, args.dateTimeStart, args.dateTimeEnd, function(err, res){
            if (err) {
              console.log('one error', err)
              reject(err)
            } else {
              console.log('a resolve', res)
              resolve(res)
            }
           })
        })

        return email.then(event => {
                          console.log('sucess??', event)
                          event
                        })
                        .catch(err => {
                          console.log('last error', err)
                          err
                        })
                        
      },
    },
    upVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
           db.vote.upVote(args.item_id, args.user_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    },
    downVoteItem: {
      type: VoteType,
      args: {
        user_id: { type: GraphQLInt },
        item_id: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
           db.vote.downVote(args.item_id, args.user_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
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
    }
  },
});

module.exports = mutations;
