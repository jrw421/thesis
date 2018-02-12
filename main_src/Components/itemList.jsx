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

    return this.props.currentlyEditing ? (
      <div>
        <ul>
          <li>
            <input
              type="text"
              placeholder="Add items to your registry"
              value={this.state.itemToAdd}
              className="editEvent"
              onChange={this.handleChange}
              onKeyPress={this.addItem}
            />
          </li>
          {this.props.itemsQuery.event.items.map(item => (
            <li key={item.id}>
              {item.name}{' '}
              <span onClick={e => this.deleteItem(item.id, e)}>X</span>
            </li>
          ))}
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
