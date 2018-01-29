const graphql = require('graphql');
const db = require('../ControllersDB/mainController.js')
const EventType = require('./event_type.js')
const {
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLObjectType, 
  GraphQLList
} = graphql



const UserType = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    member_status: { type: GraphQLInt },
    events: {
      type: new GraphQLList(EventType), 
      resolve(parentValue, args){
        return db.event_attendee.getEvents(parentValue.id)
        // .then((event_attendees) => {
        // var p = Promise.all(event_attendees.map((event_attendee) => {
        //  return  db.event.getEvent(event_attendee['event_id'])
         
        // })).then((values) => (values))
        // console.log(p)
        // return p
      }
    }
    // items : {
    //   type: new GraphQLList(ItemType)
    // }
    
    //this could be ^ GraphQLBoolean but SQL tables process booleans as tinyInt (0 or 1)
    //if we find a way to process integers into true and false before reaching this input it could be helpful
  })
})


module.exports = UserType;