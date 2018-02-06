import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = e => {
    console.log('item clicked', e.target.textContent);
    //Pass in query to toggle that item that was clicked.
  };


  render() {
    if (this.props.itemsQuery && this.props.itemsQuery.error) {
      return <div>{this.props.itemsQuery.error}</div>;
    }
    if (this.props.itemsQuery.loading) {
      return null;
    }

    let items = this.props.itemsQuery.event.items;
    console.log('items list items', items)
    // let id = this.props.event.id;
    return (
      <ul>
        {items.map((item, i) => {
          return (
            <Item
              style={{ textAlign: 'center', align: 'center' }}
              name={item.name}
              key={item.id}
              id={item.id}
              claimedBy={item.user}
              handleItemClick={this.handleItemClick}
              currentUser={this.props.currentUser}
            />
          );
          // return null
        })}
      </ul>
    );
  }
}

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
<<<<<<< HEAD
<<<<<<< HEAD
`;

=======
`
//
>>>>>>> rebase
=======
`
//
>>>>>>> mod
const ItemsWithData = graphql(ITEMS_QUERY, {
  options: props => ({ variables: { id: props.event.id } }),
  name: 'itemsQuery'
})(ItemList);

export default ItemsWithData;
