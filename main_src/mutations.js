import gql from 'graphql-tag';

const addEvent = gql`
  mutation addEvent($name: String!, $host_id: Int!, $description: String!, $location: String!, $img: String, $time: String, $date: Int) {
    addEvent(
      name: $name
      host_id: $host_id
      description: $description
      location: $location
      img: $img,
      time: $time,
      date: $date
    ) {
      name
      host_id
      description
      location
      img
      id
      time
      date
    }
  }
`;

const addItems = gql`
  mutation addItems($itemNames: [String]!, $event_id: Int!) {
    addItems(itemNames: $itemNames, event_id: $event_id) {
        id
        name
        user_id
        event_id
    }
  }
`;

const addRecipients = gql`
  mutation addRecipients($nameEmail: [String]!, $event_id: Int, $id: Int) {
    addRecipients(nameEmail: $nameEmail, event_id: $event_id, id: $id) {
      name
    }
  }
`;
const confirmPresence = gql`
  mutation confirmPresence($user_id: Int, $event_id: Int){
    confirmPresence(id: $user_id, guest_event_id: $event_id)
  }
`

const denyPresence = gql`
  mutation denyPresence($user_id: Int, $event_id: Int){
    denyPresence(id: $user_id, guest_event_id: $event_id)
  }
`

const toggleClaimOfItem = gql`
  mutation toggleClaimOfItem($id: Int!, $user_id: Int!) {
    toggleClaimOfItem(id: $id, user_id: $user_id) {
      id
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
  addRecipients, 
  addItems, 
  addEvent, 
  confirmPresence, 
  denyPresence, 
  upVote, 
  downVote, 
  addComment, 
  toggleClaimOfItem
}