// const graphql = require('graphql');
// const { GraphQLObjectType,
//         GraphQLString,
//         GraphQLInt,
//         GraphQLSchema,
//         GraphQLList } = graphql;
// const _ = require('lodash');

// // const RootQueryType = require('./root_query_type');
// // const mutations = require('./mutations');


// const users = [
//   { id: 23, firstName: 'Bill', },
//   { id: 28, firstName: 'Alice'}

// ]

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: {
//     id: { type: GraphQLInt },
//     firstName: { type: GraphQLString }
//   }
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     user: {
//       type: UserType,
//       args: { id: { type: GraphQLInt } },
//       resolve(parentValue, args) {
//         return _.find(users, { id: args.id })
//       //args is an object that gets called for whatever we input into our query
//       // the resolve function looks for the exact data we're looking for
//       }
//     }
//   }
// })



module.exports = new GraphQLSchema({
  query: RootQuery
});