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
    allUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve: (parentValue, args) => {
        return db.user.findAll().catch(err => console.log(28, err));
      }
      //this is where ^ controller functions would be input

      //args is an object that gets called for whatever we input into our query
      // the resolve function looks for the exact data we're looking for
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        google_id: { type: GraphQLInt },
        hash: { type: GraphQLString }
      },
      resolve: (parentValue, args) => {
        // return db.user.getUser(args.id, args.google_id, args.hash);
        return db.user.getUserById(args.id);
      }
    },
     guestUser: {
      type: UserType,
      args: {
        hash: { type: GraphQLString }
      },
      resolve: (parentValue, args) => {
        // return db.user.getUser(args.id, args.google_id, args.hash);
        return db.user.getUserByHash(args.id);
      }
    },
    events: {
      type: new GraphQLList(EventType),
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return db.event.findAll().catch(err => console.log(29, err));
      }
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLInt } },
      resolve: (parentValue, args) => {
        return db.event.getEvent(args.id);
      }
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLInt } },
      resolve: (parentValue, args) => {
        return db.item.getItem(args.id);
      }
    }
  })
});

module.exports = RootQueryType;
