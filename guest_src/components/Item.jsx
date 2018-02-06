import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';


class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false, guestId: ''
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick = (e) => {
    console.log('item clicked', e.target.textContent);
    if (this.state.clicked === false) {
      this.setState({
        clicked: true
      })
    } else {
      this.setState({
        clicked: false
      })
    }
    this.props.toggleClaimOfItem({
      variables: {
        id: this.props.id,
        userId: this.props.currentUser
      }
    })
  }

  render() {
    console.log('Item ALL', this.props);
    console.log('Item props id', this.props.currentId);
    // console.log('anything HEREE E ' ,this.props.guestQuery)
    console.log('id ???', this.props.id)
    const isClicked = this.props.userId
    // const isClicked = this.props.userId
    // return (
    //   <div style={{"textAlign": "center", "align":"center"}}>
    //   {isClicked ? (
    //     <a onClick={(e) => this.handleItemClick(e)} id={this.props.id}>{this.props.description} was claimed by {this.props.currentUser || "guest"}</a>
    //   ) : (
    //
    //     <a onClick={(e) => this.handleItemClick(e)} user_id={this.props.user_id} description={this.props.id}>{this.props.description}</a>
    //   )}
    // </div>
    // )

    return (
      <div style={{"textAlign": "center", "align":"center"}}>
      {isClicked !== null ? (
        <a onClick={(e) => this.handleItemClick(e)} id={this.props.id}>{this.props.description} was claimed by {this.props.currentUser || "guest"}</a>
      ) : (

        <a onClick={(e) => this.handleItemClick(e)} user_id={this.props.user_id} description={this.props.id}>{this.props.description}</a>
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

const toggleClaim = gql`
  mutation toggleClaimOfItem($id: [String]!, $userId: Int!){
    toggleClaimOfItem(id: $id, userId: $userId){
      id
      userId
    }
  }
`

const guestClaim = compose(
  graphql(toggleClaim, { name: 'toggleClaimOfItem' }),
  graphql(GUEST_QUERY, {
    options: (props) => ({variables: {id: props.currentId}}),
    name: 'guestQuery'}
))(Item)

export default guestClaim
