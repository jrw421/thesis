import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ItemWithData from './item.jsx';
import { ITEMS_QUERY } from '../queries.js'

class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this)
  }

  refreshItemList() {
    this.props.itemsQuery.refetch()
  }

  deleteItem(id) {
    this.props.deleteItem({
      variables: {
      id: id
      }
    })
    .then(() => {
      this.refreshItemList()
    })
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

    
    return this.props.currentlyEditing ? (
      <div>
      <ul>
        { this.props.itemsQuery.event.items.map((items) => (
          <li key={items.id}>
            {items.name} <span onClick={this.deleteItem.bind(this, items.id)}>X</span>
          </li>
        ))
        } 
      </ul>
      </div>
    ) : (
      <div>
      {items !== null ? (
        <ul>
          {items.map((item, i) => {
            return (
              <ItemWithData
                style={{ textAlign: 'center', align: 'center' }}
                name={item.name}
                id={item.id}
                key={item.id}
                claimedBy={item.user}
                currentUser={this.props.currentUser}
                eventId={this.props.event.id}
                refresh={this.refreshItemList}
              />
            );
          })}
        </ul>
      ) : (
        <div>loading...</div>
      )
    }

    </div>
    );
  }
}

const ItemListWithData = graphql(ITEMS_QUERY, {
  options: props => ({ variables: { id: props.event.id } }),
  name: 'itemsQuery'
})(ItemList);

export default ItemListWithData;
