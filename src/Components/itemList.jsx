import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item.jsx'

class ItemList extends React.Component {
  constructor(props) {
    super(props)  
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  handleItemClick = (e) => {
    console.log('item clicked', e.target.textContent);
    //Pass in query to toggle that item that was clicked.
    
  }

  render() {
    if (this.props.itemsQuery && this.props.itemsQuery.error) {
      console.log(this.props.itemsQuery.error)
    }
    if (this.props.itemsQuery.loading) {
      return null;
    }
    console.log('Item props', this.props);
    let items = this.props.itemsQuery.event.items;
    return(
      <ul>
    {items.map( (item, i)  => {
        return <Item name={item.name} key={item.id} handleItemClick={this.handleItemClick} />
        // return null
      })}
      </ul>
    )
  }
}

const ITEMS_QUERY = gql `
  query itemsQuery ($id: Int){
      event(id: $id) {
        name
        items {
          id
          name
        }
    }
  }
`

const ItemsWithData = graphql(ITEMS_QUERY, {
  options: (props) => ({variables: {id: props.currentEvent}}),
  name: 'itemsQuery'
})(ItemList)

export default ItemsWithData