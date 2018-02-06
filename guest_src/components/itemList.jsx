import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './item.jsx'

class ItemList extends React.Component {
  constructor(props) {
    super(props)
  }

  // handleItemClick = (e) => {
  //   console.log('item clicked', e);
  //   // this.props.toggleClaimOfItem({
  //   //   variables: {
  //   //     // id:
  //   //     userId: this.props.currentUser
  //   //   }
  //   // })
  //   //Pass in query to toggle that item that was clicked.
  // }

  componentDidMount() {
    console.log('props ', this.props.event.user.guestEvent.items[0].id)
  }

  render() {
    if (this.props.event && this.props.event.error) {
      console.log(this.props.event.error)
    }
    if (this.props.event.loading) {
      return null;
    }
    console.log('hash ', this.props.hash)
    console.log('user id ', this.props.event.user.id)
    console.log('u', this.props.event.user.guestEvent.items)
    // console.log('this is ITEMS LIST ', this.props.event.user.guestEvent.items)
    // console.log("NAME?  ", this.props.event.user.name)
    //
    let items = this.props.event.user.guestEvent.items;
    console.log('itemsss ', items)
    return(
      <ul>
    {items.map((item)  => {
        return <Item style={{"textAlign": "center", "align":"center"}} hash={this.props.hash} userIDD={this.props.event.user.id} userId={item.user_id} description={item.name} id={item.id} currentId={this.props.event.user.id}
          currentUser={this.props.event.user.name}/>
      })}
      </ul>
    )
  }
}

// const ITEMS_QUERY = gql `
//   query itemsQuery ($id: Int){
//       event(id: $id) {
//         name
//         items {
//           id
//           name
//           user_id
//         }
//     }
//   }
// `

// const ItemsWithData = graphql(ITEMS_QUERY, {
//   options: (props) => ({variables: {id: props.event.id}}),
//   name: 'itemsQuery'
// })(ItemList)
//
// export default ItemsWithData
export default ItemList
