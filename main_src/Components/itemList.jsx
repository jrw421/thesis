import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ItemWithData from './item.jsx';
import { ITEMS_QUERY } from '../queries.js';
import { addItems, deleteItem } from '../mutations';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToAdd: ''
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  refreshItemList() {
    this.props.itemsQuery.refetch();
  }

  handleChange(e) {
    this.setState({ itemToAdd: e.target.value });
  }

  deleteItem(id) {
    this.props
      .deleteItem({
        variables: {
          id,
          event_id: this.props.event.id
        }
      })
      .then(() => {
        this.refreshItemList();
      })
      .catch(error => {
        return error;
      });
  }

  addItem(e) {
    if (e.key === 'Enter') {
      this.props
        .addItems({
          variables: {
            itemNames: [this.state.itemToAdd],
            event_id: this.props.event.id
          }
        })
        .then(response => {
          this.setState({ itemToAdd: '' }, () => {
            this.refreshItemList();
          });
        })
        .catch(error => {
          return error;
        });
    }
  }

  render() {
    if (this.props.itemsQuery.error && !this.props.itemsQuery.event) {
      this.props.itemsQuery.refetch();
      return <div>Error!</div>;
    }

    if (this.props.itemsQuery.loading) {
      return <div>loading...</div>;
    }

    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" 
    width="12" 
    height="12" 
    viewBox="0 0 24 24">
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>

    return this.props.currentlyEditing ? (
      <div className="item-list-two">
      <h1> Add or delete items from your registry</h1>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Add items to your registry"
              value={this.state.itemToAdd}
              className="item-list-two-items"
              onChange={this.handleChange}
              onKeyPress={this.addItem}
            />
          </li>
          <div className="item-list-list">
          {this.props.itemsQuery.event.items.map(item => (
            <li key={item.id} className="item-list-item">
              <span>{item.name}</span>
              <span onClick={e => this.deleteItem(item.id, e)}>{deleteIcon}</span>
            </li>
          ))}
          </div>
        </ul>
      </div>
    ) : (
      <div>
        {this.props.itemsQuery.event.items !== null ? (
          <ul>
            {this.props.itemsQuery.event.items.map((item, i) => {
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
        )}
      </div>
    );
  }
}

const ItemListWithData = compose(
  graphql(ITEMS_QUERY, {
    options: props => ({ variables: { id: props.event.id } }),
    name: 'itemsQuery'
  }),
  graphql(addItems, { name: 'addItems' }),
  graphql(deleteItem, { name: 'deleteItem' })
)(ItemList);

export default ItemListWithData;
