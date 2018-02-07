// 
// module.exports.addEvent = gql`
//   mutation AddEvent($name: String!, $host_id: ID!, $description: String!, $location: String!, $img: String!){
//     addEvent(name: $name, host_id: $host_id, description: $description, location: $location, img: $img) {
//       name
//       host_id
//       description
//       location
//       img
//       id
//     }
//   }
// `
//
// module.exports.addItems = gql`
//   mutation addItems($itemNames: [String]!, $eventId: Int!){
//     addItems(itemNames: $itemNames, eventId: $eventId){
//       items {
//         id
//       }
//     }
//   }
// `
