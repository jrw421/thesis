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
    member_status: { type: GraphQLInt },
    
    //this could be ^ GraphQLBoolean but SQL tables process booleans as tinyInt (0 or 1)
    //if we find a way to process integers into true and false before reaching this input it could be helpful
  })
});



module.exports = UserType;