import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';


class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick = (e) => {
    console.log('item clicked', e.target.textContent);
    // if (this.state.clicked === false) {
    //   this.setState({
    //     clicked: true
    //   })
    // } else {
    //   this.setState({
    //     clicked: false
    //   })
    // }
    this.props.toggleClaimOfItem({
      variables: {
        id: this.props.id,
        user_id: this.props.userIDD
      }
    }, console.log('propsXXX ', this.props))
  }

  render() {
    if (this.props.guestQuery.loading || this.props.guestQuery.error) {
      return null
    }
      console.log('what is the id here ', this.props.userIDD, this.props.id)
    console.log('are you ahsh ', this.props.hash)
    console.log('Item ALL', this.props.userIDD); //currentUser
    console.log('Item props id', this.props.id);
    // console.log('anything HEREE E ' ,this.props.guestQuery)
    console.log('user id', this.props.userId)
    const isClaimed = this.props.userId //associated with item
    let hash = this.props.hash
    // console.log('is Claimed ', isClaimed)
    // const isClaimed = this.props.userId
    // return (
    //   <div style={{"textAlign": "center", "align":"center"}}>
    //   {isClaimed ? (
    //     <a onClick={(e) => this.handleItemClick(e)} id={this.props.id}>{this.props.description} was claimed by {this.props.currentUser || "guest"}</a>
    //   ) : (
    //
    //     <a onClick={(e) => this.handleItemClick(e)} user_id={this.props.user_id} description={this.props.id}>{this.props.description}</a>
    //   )}
    // </div>
    // )

    return (
      <div style={{"textAlign": "center", "align":"center"}}>
      {isClaimed !== null ? (
        <a onClick={(e) => this.handleItemClick(e)} id={this.props.id} user_id={this.props.user_id}>{this.props.description} was claimed by {this.props.userId || "guest"}</a>
      ) : (

        <a onClick={(e) => this.handleItemClick(e)} userId={this.props.userId} description={this.props.id}>{this.props.description}</a>
      )}
    </div>
    )
  }

}

const GUEST_QUERY = gql `
  query guestQuery ($id: String){
    user(hash: $id) {
      id
      name
    }
  }
`

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
//
// const ItemsWithData = graphql(ITEMS_QUERY, {
//   options: (props) => ({variables: {id: props.event.id}}),
//   name: 'itemsQuery'
// })(ItemList)

const toggleClaim = gql`
  mutation toggleClaimOfItem($id: Int, $user_id: Int!){
    toggleClaimOfItem(id: $id, user_id: $user_id){
      id
      user_id
    }
  }
`

const guestClaim = compose(
  graphql(toggleClaim, { name: 'toggleClaimOfItem' }),
  graphql(GUEST_QUERY, {
    options: (props) => ({variables: {id: props.hash}}),
    name: 'guestQuery'}
))(Item)

export default guestClaim
