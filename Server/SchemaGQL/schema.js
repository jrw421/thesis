const graphql = require('graphql');
const { GraphQLSchema } = graphql;


const _ = require('lodash');

const mutations = require('./mutations')
const UserType = require('./types.js').UserType
const EventType = require('./types.js').EventType
const ItemType = require('./types.js').ItemType


const RootQueryType = require('./root_query_type');



module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
})
