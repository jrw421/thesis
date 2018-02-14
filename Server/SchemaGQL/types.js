const graphql = require('graphql');
const db = require('../ControllersDB/mainController.js');

const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    time: { type: GraphQLString },
    date: { type: GraphQLInt },
    location: { type: GraphQLString },
    host_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    img: { type: GraphQLString },
    endTime: {type: GraphQLString},
    dateTimeStart: {type: GraphQLString},
    dateTimeEnd: {type: GraphQLString},
    host: {
      type: UserType,
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.user.getUserById(parentValue.host_id, function(err, res){
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
    reply: { type: GraphQLInt },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event_attendee.getUsers(parentValue.id, function(err, res){
            console.log('err response get users for evetn', err, res)
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
    items: {
      type: new GraphQLList(ItemType),
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.item.getItemsByEventId(parentValue.id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    }
  })
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    user_id: { type: GraphQLInt },
    event_id: { type: GraphQLInt },
    user: {
      type: UserType,
       async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.user.getUserById(parentValue.user_id, function(err, res){
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
    event: {
      type: EventType,
       async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.user.getUserById(parentValue.user_id, function(err, res){
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
    comments: {
      type: new GraphQLList(ItemCommentType),
      resolve(parentValue, args) {
        return db.itemComments.getItemCommentsByItemId(parentValue.id)
        .then(x => x)
        .catch(err => err)
      }
    },
    upVotes: {
      type: new GraphQLList(VoteType),
      resolve(parentValue, args) {
        return db.vote.getUpVotesForItem(parentValue.id)
        .then(x => x)
        .catch(err => err)
      }
    },
    downVotes: {
      type: new GraphQLList(VoteType),
      resolve(parentValue, args) {
        return db.vote.getDownVotesForItem(parentValue.id)
        .then(x => x)
        .catch(err => err)
      }
    }
  })
});

const VoteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: { type: GraphQLInt },
    item_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    vote: { type: GraphQLInt }
  })
})

const ItemCommentType = new GraphQLObjectType({
  name: 'ItemComment',
  fields: () => ({
    id: { type: GraphQLInt },
    content: { type: GraphQLString },
    likes: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    event_id: { type: GraphQLInt },
    item_id: { type: GraphQLInt },
    user: {
      type: UserType,
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.user.getUserById(parentValue.user_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })

       response = await wait
       return response 
      }
    }
  })
});

const ItemsType = new GraphQLObjectType({
  name: 'Items',
  fields: () => ({
    event_id: { type: GraphQLInt },
    items: { type: GraphQLList(ItemType) }
  }),
   async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.items.getItemsByEventId(parentValue.event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })

       response = await wait
       return response 
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    google_id: { type: GraphQLString },
    member_status: { type: GraphQLInt },
    reply: { type: GraphQLInt },
    accessToken: { type: GraphQLString },
    hash: { type: GraphQLString },
    guest_event_id: { type: GraphQLInt },
    refreshToken: {type: GraphQLString},
    subscription: {type: GraphQLString},
    lastEvent: {
      type: EventType, 
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.lastEvent(parentValue.id, function(err, res){
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
    memberReply: {
     type: GraphQLInt,
     async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event_attendee.checkReply(parentValue.id, parentValue.event_id, function(err, res){
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
    hostedEvents: {
      type: new GraphQLList(EventType),
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.getHostedEvents(parentValue.id, function(err, res){
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
    pastEvents: {
      type: new GraphQLList(EventType),
        async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.getPastEvents(parentValue.id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })

       response = await wait
       console.log('past', response)
       return response 
      }
    },
    currentEvents: {
      type: new GraphQLList(EventType),
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.getCurrentEvents(parentValue.id, function(err, res){
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
    guestEvent: {
      type: EventType,  
      async resolve(parentValue, args) {
        let response
        let wait = new Promise((resolve, reject) => {
          db.event.getEvent(parentValue.guest_event_id, function(err, res){
            if (err){
             reject(err)
            }
             resolve(res)
           })
       })
       response = await wait
       return response 
      }
    }
  })
});

module.exports = { EventType, UserType, ItemType, ItemsType, ItemCommentType, VoteType };
