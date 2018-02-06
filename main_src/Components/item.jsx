import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ItemWithData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleItemClick = this.handleItemClick.bind(this);
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
        user_id: this.props.currentUser.id
      }
    })
    // mutation to toggle that item that was clicked.
    // render onclick a div that says <name> claimed item!
  };

  render() {
    console.log('item props', this.props)
    const isClicked = this.state.clicked;
    return (
      <div style={{ textAlign: 'center', align: 'center' }}>
        {(this.props.claimedBy && this.props.claimedBy.id !== this.props.currentUser.id)  ? 
          <a>{this.props.name} was claimed by {this.props.claimedBy.name}</a> :
         isClicked ?
          <a onClick={e => this.handleItemClick(e)}>
            {this.props.name} was claimed by{' '}
            {this.props.currentUser.name}
          </a>
         : 
          <a onClick={e => this.handleItemClick(e)}>{this.props.name}</a>
        }
      </div>
    );
  }
}

const ITEMS_QUERY = gql`
  query itemsQuery($id: Int) {
    event(id: $id) {
      name
      items {
        id
        name
        user{
          id
          name
        }
      }
    }
  }
`;


const toggleClaimOfItem = gql`
  mutation toggleClaimOfItem($id: Int!, $user_id: Int!) {
    toggleClaimOfItem(id: $id, user_id: $user_id) {
      id
    }
  }
`;

const Item = 
  graphql(toggleClaimOfItem, { name: 'toggleClaimOfItem' })(ItemWithData);


export default Item;
