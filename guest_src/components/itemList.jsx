import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item.jsx'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.event && this.props.event.error) {
      console.log(this.props.event.error)
    }
    if (this.props.event.loading) {
      return null;
    }

    let items = this.props.event.user.guestEvent.items;

    return(
      <ul>
      {items.map((item)  => {
          return <Item style={{"textAlign": "center", "align":"center"}} hash={this.props.hash} userIDD={this.props.event.user.id} userId={item.user_id} description={item.name} id={item.id} currentId={this.props.event.user.id}
            eventId={this.props.eventId}
            currentUser={this.props.event.user.name}/>
        })}
        </ul>
    )
  }
}

export default ItemList
