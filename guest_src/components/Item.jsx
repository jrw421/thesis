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

  componentWillMount(){
    if (this.props.claimedBy && this.props.claimedBy.id === this.props.currentUser.id){
      this.setState({
        clicked: true
      })
    }
  }

  handleItemClick = e => {
     if (this.state.clicked === false) {
       this.setState({
         clicked: true
       });
     } else {
       this.setState({
         clicked: false
       });
     }
     console.log('id', this.props.id)
     this.props.toggleClaimOfItem({
       variables: {
         id: this.props.id,
         user_id: this.props.userIDD
       }
     })
   };

  render() {

    if (this.props.guestQuery.loading || this.props.guestQuery.error || this.props.itemsQuery.loading || this.props.itemsQuery.error) {
      return null
    }

    console.log('what is the id here ', this.props.userIDD, this.props.id)
    console.log('USER ID ', this.props.userId); //currentUser
    console.log('props in item ', this.props.itemsQuery.event)

    const isClicked = this.state.clicked
    let hash = this.props.hash
    // return (
    //   <div style={{"textAlign": "center", "align":"center"}}>
    //   {isClicked !== null ? (
    //     <a onClick={(e) => this.handleItemClick(e)} id={this.props.id} user_id={this.props.user_id}>{this.props.description} was claimed by {this.props.currrentUser || "guest"}</a>
    //   ) : (
    //
    //     <a onClick={(e) => this.handleItemClick(e)} description={this.props.id}>{this.props.description}</a>
    //   )}
    // </div>

    if (this.props.userId !== null && this.props.userId !== this.props.userIDD){
      return(
        <div style={{ textAlign: 'center', align: 'center' }}>
         <a>{this.props.description} was claimed by {this.props.currentUser}</a>
        </div>
      )
    } else {
      return(
        <div style={{ textAlign: 'center', align: 'center' }}>
        {isClicked ?
          <a onClick={e => this.handleItemClick(e)}>
          {this.props.description} was claimed by{' '}
          {this.props.currrentUser}
          </a>
         :
          <a onClick={e => this.handleItemClick(e)}>{this.props.description}</a>
        }
        </div>
    )
  }
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

const ITEMS_QUERY = gql `
  query itemsQuery ($id: Int){
    event(id: $id) {
      items{
        id
        name
        user_id
      }
    }
  }
`

const toggleClaim = gql`
  mutation toggleClaimOfItem($id: Int!, $user_id: Int!){
    toggleClaimOfItem(id: $id, user_id: $user_id){
      id
      user_id
    }
  }
`
//for the item where the user_id is equal to the user_id

const guestClaim = compose(
  graphql(toggleClaim, { name: 'toggleClaimOfItem' }),
  graphql(GUEST_QUERY, {
    options: (props) => ({variables: {id: props.hash}}),
    name: 'guestQuery'}),
  graphql(ITEMS_QUERY, {
    options: (props) => ({variables: {id: props.eventId}}),
    name: 'itemsQuery'
  })
)(Item)

export default guestClaim
