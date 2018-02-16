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
const editEventFields = gql`
  mutation editEventFields($id: Int!, $name: String, $description: String, $date: Int, $time: String, $location: String, $img: String){
    editEventFields(id: $id, name: $name, description: $description, date: $date, time: $time, location: $location, img: $img){
    id
    name
    description
    date
    time
    location
    img
    }
  }
`;


const addComment = gql`
  mutation addComment(
    $content: String!,
    $user_id: Int!,
    $item_id: Int!,
    $event_id: Int!
  ) {
    addComment(
      content: $content,
      user_id: $user_id,
      item_id: $item_id,
      event_id: $event_id
    ) {
      id
    }
  }
`;

const upVote = gql`
  mutation upVoteItem($user_id: Int!, $item_id: Int!) {
    upVoteItem(user_id: $user_id, item_id: $item_id) {
      id
    }
  }
`;

const downVote = gql`
  mutation downVoteItem($user_id: Int!, $item_id: Int!) {
    downVoteItem(user_id: $user_id, item_id: $item_id) {
      id
    }
  }
`;


module.exports = {
  confirmPresence, 
  denyPresence, 
  toggleClaim,
  editEventFields, 
  addComment, 
  upVote, 
  downVote
}