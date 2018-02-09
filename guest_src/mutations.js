import gql from 'graphql-tag';

const confirmPresence = gql`
  mutation confirmPresence($user_id: Int!, $event_id: Int!){
    confirmPresence(id: $user_id, guest_event_id: $event_id){
      id
      guest_event_id
    }
  }
`
const denyPresence = gql`
  mutation denyPresence($user_id: Int!, $event_id: Int!){
    denyPresence(id: $user_id, guest_event_id: $event_id){
      id
      guest_event_id
    }
  }
`
const toggleClaim = gql`
  mutation toggleClaimOfItem($id: Int!, $user_id: Int!){
    toggleClaimOfItem(id: $id, user_id: $user_id){
      id
      # user_id
    }
  }
`
module.exports = {
  confirmPresence, 
  denyPresence, 
  toggleClaim
}