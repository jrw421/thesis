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
    if (this.props.itemsQuery.error) {
      this.props.itemsQuery.refetch()
      return <div>Error!</div>
    }

    if (this.props.itemsQuery.loading) {
      return <div>loading...</div>;
    }
    console.log(this.props.itemsQuery)
    let items = this.props.itemsQuery.event.items;
    // let id = this.props.event.id;
    return (
      <ul>
        {items.map((item, i) => {
          return (
            <Item
              style={{ textAlign: 'center', align: 'center' }}
              name={item.name}
              id={item.id}
              key={item.id}
              handleItemClick={this.handleItemClick}
              currentUser={this.props.currentUser}
              eventId={this.props.event.id}
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
        user_id
      }
    }
  }
`;

const ItemsWithData = graphql(ITEMS_QUERY, {
  options: props => ({ variables: { id: props.event.id } }),
  name: 'itemsQuery'
})(ItemList);

export default ItemsWithData;
