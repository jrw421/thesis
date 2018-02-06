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

  componentDidMount() {

  }

  render() {
    // if (this.props.itemsQuery && this.props.itemsQuery.error) {
    //   console.log(this.props.itemsQuery.error)
    // }
    // if (this.props.itemsQuery.loading) {
    //   return null;
    // }
    setTimeout(function() {
      console.log("LOOK AT THIS!!!")
    }, 3000)
    setTimeout(function() {
      console.log("A BIRD! A PLANE!")
    }, 3000)
    // console.log('Item props', this.props.event.guestEvent);
    // console.log('USER ISSSS IN ITEM ', this.props.currentUser.params.id)
    // console.log('HERE ', this.props.itemsQuery.event.items)
    // let items = this.props.itemsQuery.event.items;
    // let id = this.props.event.id;
    return(
      <ul>
    {/* {items.map( (item, i)  => {
        return <Item style={{"textAlign": "center", "align":"center"}} name={item.name} key={item.id} handleItemClick={this.handleItemClick} currentUser={this.props.currentUser} />
        // return null
      })} */}
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
          user_id
        }
    }
  }
`

// const ItemsWithData = graphql(ITEMS_QUERY, {
//   options: (props) => ({variables: {id: props.event.id}}),
//   name: 'itemsQuery'
// })(ItemList)
//
// export default ItemsWithData
export default ItemList
