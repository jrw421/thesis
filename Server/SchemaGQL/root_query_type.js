const graphql = require('graphql');
const UserType = require('./types').UserType;
const EventType = require('./types').EventType;
const ItemCommentType = require('./types').ItemCommentType;
const ItemType = require('./types').ItemType;
const _ = require('lodash');
const schema = require('./schema');
const db = require('../ControllersDB/mainController.js');

const { GraphQLInt, GraphQLObjectType, GraphQLList, GraphQLString } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    //this ^ callback can be omitted, but resolves certain errors in definition and invocation order
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        google_id: { type: GraphQLInt },
        hash: { type: GraphQLString }
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
       return await wait
      }
    },
    guestUser: {
      type: UserType,
      args: {
        // id: { type: GraphQLInt },
        // google_id: { type: GraphQLInt },
        hash: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.user.getUserByHash(args.hash, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })

       let hashUser = await wait

       if (hashUser.member_status == 0){
         return hashUser
       } else {
        let user = new Promise((resolve, reject) => {
          db.user.getUserById(hashUser.member_status, function(err, res){
             if (err){
             reject(err)
            }
             resolve(res)
           }, hashUser.guest_event_id)
        })
        return user.then(data => data).catch(err => err)
         
       }
      }
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLInt } },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.event.getEvent(args.id, function(err, res){
            if (err){
            console.log('event err', err)
             reject(err)
            }
            console.log('event res', res)
             resolve(res)
           })
       })
       return await wait
      }
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLInt } },
      async resolve(parentValue, args) {
        let wait = new Promise((resolve, reject) => {
          db.item.getItem(args.id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       return await wait
      }
    },
  })
});

module.exports = RootQueryType;
