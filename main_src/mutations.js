import gql from 'graphql-tag';

const addEvent = gql`
  mutation addEvent($name: String!, $host_id: Int!, $description: String!, $location: String!, $img: String, $time: String, $date: Int, $endTime: String) {
    addEvent(
      name: $name,
      host_id: $host_id,
      description: $description,
      location: $location,
      img: $img,
      time: $time,
      date: $date,
      endTime: $endTime
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
  mutation addRecipients($nameEmail: [String]!, $event_id: Int, $id: Int, $dateTimeStart: String, $dateTimeEnd: String) {
    addRecipients(nameEmail: $nameEmail, event_id: $event_id, id: $id, dateTimeStart: $dateTimeStart, dateTimeEnd: $dateTimeEnd ) {
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


const editEventFields = gql`  mutation editEventFields($id: Int!, $name: String, $description: String, $date: Int, $time: String, $location: String, $img: String){
  editEventFields(id: $id, name: $name, description: $description, date: $date, time: $time, location: $location, img: $img){
  id
  name
  description
  date
  time
  location
  img
  }
}`;


const deleteItem = gql`
mutation deleteItem($id: Int!) {
  deleteItem(id: $id) {
    id
    name
    event_id
    user_id 
    }
  }`;

const saveEvent = gql`
  mutation saveEvent($id: Int, $lastEvent: Int){
    saveEvent(id: $id, lastEvent: $lastEvent){
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
<<<<<<< HEAD
  toggleClaimOfItem,
  editEventFields,
  deleteItem
=======
  toggleClaimOfItem, 
  saveEvent
>>>>>>> google calendar works. past events appears to be working
}