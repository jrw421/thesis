import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Items extends React.Component {
  constructor(props) {
    super(props)  
    // this.handleItemClick = this.handleItemClick.bind(this)
  }
  // handleItemClick = (item) => {
  //   console.log('item clicked', item);
  // }

  render() {
    // if (this.props.itemsQuery && this.props.itemsQuery.error) {
    //   console.log(this.props.itemsQuery.error)
    // }

    // if (this.props.itemsQuery.error) {
    //   return <div>Error</div>
    // }

    // if (this.props.itemsQuery.loading) {
    //   return <div>Loading</div>
    // }
    console.log('Item props', this.props);
    return (
      <div>test</div>
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
})(Items)

export default ItemsWithData