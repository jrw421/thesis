import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { toggleClaim } from '../mutations.js'



class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      name: this.props.currentUser
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

     this.props.toggleClaimOfItem({
       variables: {
         id: this.props.id,
         user_id: this.props.currentId
       }
     })
     this.forceUpdate()
   };

  render() {


      const isClicked = this.state.clicked
      let hash = this.props.hash

      if (this.props.itemUserId !== null && this.props.currentId !== this.props.userToItem.name){ //this.props.itemsQuery.event.items(one).user_id
        return(
          <div style={{ textAlign: 'center', align: 'center' }}>
           <a>{this.props.name} was claimed by {this.props.userToItem.name}</a>
          </div>
        )
      } else {
        return(
          <div style={{ textAlign: 'center', align: 'center' }}>
          {isClicked ?
            <a onClick={e => this.handleItemClick(e)}>
            {this.props.description} was claimed by {this.state.name}
            </a>
           :
            <a onClick={e => this.handleItemClick(e)}>{this.props.description}</a>
          }
          </div>
        )
      }

    return <div />
  }
}
    // hash={this.props.hash}
    //         currentUser={this.props.currentUser}
    //         claimedBy={item.user_id}
    //         name={item.name}
    //         id={item.id} key={item.id}
    //         eventId={this.props.eventId}

const guestClaim =
  graphql(toggleClaim, { name: 'toggleClaimOfItem' })(Item)

export default guestClaim
