import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item.jsx'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    if (this.props.event && this.props.event.error || this.props.itemsQuery.error ) {
      console.log(this.props.event.error)
    }
    if (this.props.event.loading || this.props.itemsQuery.loading) {
      return null;
    }

    let items = this.props.event.user.guestEvent.items;
    let itemUsers = this.props.itemsQuery.event.items
    console.log('Props in itemLost ', this.props.itemsQuery.event.items[0].user)
    return(
      <ul>
      {itemUsers.map((item)  => {
          return <Item style={{"textAlign": "center", "align":"center"}} hash={this.props.hash}
            // userIDD={this.props.event.user.id}
            itemUserId={item.user_id} //item.user.id
            // userToItem={item.user.id} //check if user
            userToItem={item.user}
            description={item.name} id={item.id} key={item.id}
            currentId={this.props.event.user.id}
            eventId={this.props.eventId}
            currentUser={this.props.event.user.name}/>
        })}
        </ul>
    )
  }
}

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

const itemsQuery = graphql(ITEMS_QUERY, {
  options: (props) => ({variables: {id: props.eventId}}),
  name: 'itemsQuery'
})(ItemList)

export default itemsQuery
