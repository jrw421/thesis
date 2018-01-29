const graphql = require('graphql');
const { GraphQLSchema } = graphql;
const _ = require('lodash');

const UserType = require('./types.js').UserType
const EventType = require('./types.js').EventType
const ItemType = require('./types.js').ItemType
const mutations = require('./mutations')


const RootQueryType = require('./root_query_type');



module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
})
