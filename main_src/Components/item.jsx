import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import GqlItemComments from './itemComments.jsx'
import GqlVote from './vote.jsx'
import { toggleClaimOfItem } from '../mutations.js'


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleItemClick = this.handleItemClick.bind(this);
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
        user_id: this.props.currentUser.id
      }
    }).then(() => this.props.refresh())
    // mutation to toggle that item that was clicked.
    // render onclick a div that says <name> claimed item!
  };

  render() {
    const isClicked = this.state.clicked;
    if (this.props.claimedBy !== null && this.props.claimedBy !== undefined && this.props.claimedBy.id !== this.props.currentUser.id){
      return(     
        <div style={{ textAlign: 'center', align: 'center' }}>
         <a>{this.props.name} was claimed by {this.props.claimedBy.name}</a>
         <GqlItemComments 
          itemId={this.props.id} 
          userId={this.props.currentUser.id} 
          eventId={this.props.eventId}  
        />
        <GqlVote 
          item_id={this.props.id}
          user_id={this.props.currentUser.id}
        />
        </div>
      )
    } else {
      return(
        <div style={{ textAlign: 'center', align: 'center' }}>
        {isClicked ?
          <a onClick={e => this.handleItemClick(e)}>
          {this.props.name} was claimed by{' '}
          {this.props.currentUser.name}
          </a>
         : 
          <a onClick={e => this.handleItemClick(e)}>{this.props.name}</a>
        }
        <GqlItemComments 
          itemId={this.props.id} 
          userId={this.props.currentUser.id} 
          eventId={this.props.eventId}  
        />
        <GqlVote 
          item_id={this.props.id}
          user_id={this.props.currentUser.id}
        />
      </div>
    );
  }
}
}

const ItemWithData = 
  graphql(toggleClaimOfItem, { name: 'toggleClaimOfItem' })(Item);

export default ItemWithData;