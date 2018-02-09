import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ItemWithData from './item.jsx';
import { ITEMS_QUERY } from '../queries.js'

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  refreshItemList() {
    this.props.itemsQuery.refetch()
  }

  render() {
    if (this.props.itemsQuery.error && !this.props.itemsQuery.event) {
      this.props.itemsQuery.refetch()
      return <div>Error!</div>
    }

    if (this.props.itemsQuery.loading) {
      return <div>loading...</div>;
    }

    let items = this.props.itemsQuery.event.items;

    return (
      <ul>
        {items.map((item, i) => {
          return (
            <ItemWithData
              style={{ textAlign: 'center', align: 'center' }}
              name={item.name}
              id={item.id}
              key={item.id}
              claimedBy={item.user}
              handleItemClick={this.handleItemClick}
              currentUser={this.props.currentUser}
              eventId={this.props.event.id}
              refresh={this.refreshItemList}
            />
          );
        })}
      </ul>
    );
  }
}

const ItemListWithData = graphql(ITEMS_QUERY, {
  options: props => ({ variables: { id: props.event.id } }),
  name: 'itemsQuery'
})(ItemList);

export default ItemListWithData;
