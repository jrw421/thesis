import gql from 'graphql-tag';

const DASHBOARD_QUERY = gql`
  query dashboardQuery($id: Int) {
    user(id: $id) {
      hostedEvents {
        id
        name
        location
        description
        date
        img
        host_id
      }
      currentEvents {
        id
        name
        location
        description
        date
        img
        host_id
      }
    }
  }
`;

const GUESTS_QUERY = gql`
  query guestsQuery($id: Int) {
    event(id: $id) {
      users{
        name
        id
        memberReply
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


const ITEMS_QUERY = gql`
  query itemsQuery($id: Int) {
    event(id: $id) {
      name
      items {
        id
        name
        user{
          id
          name
        }
      }
    }
  }
`;

const VOTES_QUERY = gql`
  query item($id: Int!) {
    item (id: $id) {
      upVotes {
        user_id
      }
      downVotes {
        user_id
      }
    }
  }
`

module.exports = {
  DASHBOARD_QUERY, 
  GUESTS_QUERY, 
  COMMENTS_QUERY, 
  ITEMS_QUERY, 
  VOTES_QUERY
}