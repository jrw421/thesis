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

const VOTES_QUERY = gql`
  query item($id: Int!) {
    item(id: $id) {
      upVotes {
        user_id
      }
      downVotes {
        user_id
      }
    }
  }
`;

const COMMENTS_QUERY = gql`
  query itemComments($id: Int) {
    item(id: $id) {
      comments {
        id
        content
        likes
        user_id
        event_id
        item_id
        user {
          name
        }
      }
    }
  }
`;

module.exports = {
  GUEST_QUERY, 
  VOTES_QUERY, 
  COMMENTS_QUERY
}
