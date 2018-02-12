import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ItemWithData from './item.jsx';
import { ITEMS_QUERY } from '../queries.js'
import { addItems, deleteItem } from '../mutations';


class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this)
  }

  refreshItemList() {
    console.log('refresh item list')
    this.props.itemsQuery.refetch()
  }

  // componentWillReceiveProps(newProps){
  //   console.log('component will receipe props')
  //   this.setState({
  //     items: newProps.itemsQuery.event ? newProps.itemsQuery.event.items : []
  //   })
  // }

  deleteItem(id) {
    this.props.deleteItem({
      variables: {
      id: id,
      event_id: this.props.event.id
      }
    })
    .then(() => {
      this.refreshItemList()
      // this.forceUpdate()
    })
    .catch((error) => {
      return error
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

    
    return this.props.currentlyEditing ? (
      <div>
      <ul>
        { this.props.itemsQuery.event.items.map((item) => (
          <li key={item.id}>
            {item.name} <span onClick={(e)=> this.deleteItem(item.id, e)}>X</span>
          </li>
        ))
        } 
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
      )
    }

    </div>
    );
  }
}

const ItemListWithData = compose(
  graphql(ITEMS_QUERY, {
  options: props => ({ variables: { id: props.event.id } }),
  name: 'itemsQuery'}),
  graphql(addItems, { name: 'addItems' }),
  graphql(deleteItem, { name: 'deleteItem' })
)(ItemList)

export default ItemListWithData;


