const graphql = require('graphql');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    events: {
      type: new GraphQLList()
    }
  })
})