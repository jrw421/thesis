import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item2.jsx'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    let items = this.props.items
    console.log('items', items)

    return(
      <ul>
      {items.map((item, i) => {
          return <Item style={{"textAlign": "center", "align":"center"}} 
            hash={this.props.hash} 
            currentUser={this.props.currentUser}
            claimedBy={item.user} 
            name={item.name} 
            id={item.id} 
            key={item.id}
            eventId={this.props.eventId} />
          })}
        </ul>
    )
  }
}

export default ItemList
