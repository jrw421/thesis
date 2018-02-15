import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item.jsx'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    let items = this.props.items

    return(
      <ul>
      {items.map((item, i) => {
          <Item style={{"textAlign": "center", "align":"center"}} 
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
