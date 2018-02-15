import gql from 'graphql-tag';

const GUEST_QUERY = gql `
  query guestQuery ($id: String){
    guestUser(hash: $id) {
      id
      name
      guestEvent{
        items {
          name
          user_id
          id
        }
        users {
         name
         id
         memberReply
       }
          id
          name
          description
          img
          location
          dateTimeStart
       }
    }
  }
`
const GUEST_QUERY2 = gql `
  query guestQuery ($id: String){
    user(hash: $id) {
      id
      name
    }
  }
`

const ITEMS_QUERY = gql `
  query itemsQuery ($id: Int){
    event(id: $id) {
      items{
        id
        name
        user_id

          user {
            id
            name
          }
      }
    }
  }
`
module.exports = {
  ITEMS_QUERY,
  GUEST_QUERY,
  GUEST_QUERY2
}
