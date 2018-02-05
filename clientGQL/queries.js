// module.exports.DASHBOARD_QUERY2 = gql `
//   query eventQuery($id: String){
//     user (hash: $id){
//       guestEvent{
//         id
//          name
//          description
//          img
//       }
//     }
//   }
// `
//
// module.exports.DASHBOARD_QUERY = gql `
//   query dashboardQuery ($id: Int){
//     user (id: $id) {
//         hostedEvents {
//           id
//           name
//           location
//           description
//           date
//           img
//         }
//         currentEvents {
//           id
//           name
//           location
//           description
//           date
//           img
//         }
//         pastEvents {
//           id
//           name
//           location
//           description
//           date
//           img
//         }
//     }
//   }
// `
//
// module.exports.ITEMS_QUERY = gql `
//   query itemsQuery ($id: Int){
//       event(id: $id) {
//         name
//         items {
//           id
//           name
//           user_id
//         }
//     }
//   }
// `
//
// module.exports.NAME_QUERY = gql `
//   query nameQuery ($id: String){
//     user(hash: $id) {
//       name
//     }
//   }
// `
//
//
// module.exports.GUEST_QUERY = gql `
//   query guestQuery ($id: String){
//       user(hash: $id) {
//         id
//     }
//   }
// `
