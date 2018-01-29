const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const _ = require('lodash');
const UserType = require('./user_type.js')
const EventType = require('./event_type.js')
const mutations = require('./mutations')

const RootQueryType = require('./root_query_type');



module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
})
