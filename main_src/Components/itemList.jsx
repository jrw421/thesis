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
          console.log('what we get back from mut', response);
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
    console.log('this is props in item list ', this.props)
    if (this.props.itemsQuery.error && !this.props.itemsQuery.event) {
      this.props.itemsQuery.refetch();
      return
        <div style={{"textAlign": "center", "marginTop": "225px"}}>
          <Loader
           type="Puff"
           color="#00BFFF"
           height="300"
           width="300"
           alignItems="center"
           justifyContent='center'
           />
         </div>;
    }

    if (this.props.itemsQuery.loading) {
      return <div>loading...</div>;
    }

    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path d="M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z"/></svg>

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
          {this.props.itemsQuery.event.items.map(item => (
            <li key={item.id}>
              {item.name}
              <span onClick={e => this.deleteItem(item.id, e)}>{deleteIcon}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="itemList">
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
