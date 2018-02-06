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
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    host_id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    img: { type: GraphQLString },
    host: {
      type: UserType,
      resolve(parentValue, args) {
        return db.user.getUserById(parentValue.host_id);
      }
    },
    reply: { type: GraphQLInt },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return db.event_attendee.getUsers(parentValue.id);
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(parentValue, args) {
        return db.item.getItemsByEventId(parentValue.id).catch(err => console.log(30, err));
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
      resolve(parentValue, args) {
        return db.user.getUser(parentValue.user_id)
      }
    },
    event: {
      type: EventType,
      resolve(parentValue, args) {
        return db.user.getUser(parentValue.user_id)
      }
    },
    comments: {
      type: new GraphQLList(ItemCommentType),
      resolve(parentValue, args) {
        return db.itemComments.getItemCommentsByItemId(parentValue.id);
      }
    },
    upVotes: {
      type: new GraphQLList(VoteType),
      resolve(parentValue, args) {
        return db.vote.getUpVotesForItem(parentValue.id)
      }
    },
    downVotes: {
      type: new GraphQLList(VoteType),
      resolve(parentValue, args) {
        return db.vote.getDownVotesForItem(parentValue.id)
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
      resolve(parentValue, args) {
        return db.user.getUserById(parentValue.user_id)
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
  resolve(parentValue, args) {
    return db.items
      .getItemsByEventId(parentValue.event_id)
      .then(item => item);
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
    hostedEvents: {
      type: new GraphQLList(EventType),
      resolve(parentValue, args) {
        return db.event.getHostedEvents(parentValue.id).catch(err => console.log(32, err));
      }
    },
    pastEvents: {
      type: new GraphQLList(EventType),
      resolve(parentValue, args) {
        return db.event.getPastEvents(parentValue.id).catch(err => console.log(33, err));
      }
    },
    currentEvents: {
      type: new GraphQLList(EventType),
      resolve(parentValue, args) {
        console.log('breaking after getcurrentevents')
        return db.event.getCurrentEvents(parentValue.id).catch(err => console.log(34, err));
      }
    },
    guestEvent: {
      type: EventType,
      resolve(parentValue, args) {
        return db.event.getEvent(parentValue.guest_event_id);
      }
    }
  })
});

module.exports = { EventType, UserType, ItemType, ItemsType, ItemCommentType, VoteType };
