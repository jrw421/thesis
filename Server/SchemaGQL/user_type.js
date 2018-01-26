const graphql = require('graphql');
const {
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLObjectType
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    member_status: { type: GraphQLInt }
  })
});

module.exports = UserType;