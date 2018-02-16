import gql from 'graphql-tag';

const GUEST_QUERY = gql `
  query guestQuery ($id: String){
    guestUser(hash: $id) {
      id
      name
      guestEvent{
        items {
          id
          name
          user {
            id
            name
          }
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

module.exports = {

  GUEST_QUERY
}
