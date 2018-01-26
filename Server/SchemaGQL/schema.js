const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const _ = require('lodash');
const UserType = require('./user_type.js')
const EventType = require('./event_type.js')

const RootQueryType = require('./root_query_type');
// const mutations = require('./mutations');


const users = [
  { id: 23, name: 'Bill', email: 'csfsd@sdfss.com', token: '234234', member_status: false},
  { id: 28, name: 'Alice', email: 'csfsd@sdfsdfsss.com', token: '23sdf4234', member_status: false}
]

const events = [
  { id: 22, userId: 23, description: 'a party', date: '04-13-2019', location: '23 Pine Street'},
  { id: 29, userId: 28, description: 'another party', date: '04-13-2019', location: '23 Pine Street'}
]


module.exports = new GraphQLSchema({
  query: RootQueryType,
});