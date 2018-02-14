import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import GqlItemComments from './itemComments.jsx';
import GqlVote from './vote.jsx';
import { toggleClaimOfItem } from '../mutations.js';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      search: []
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.addItemToSearch = this.addItemToSearch.bind(this);
  }

  componentWillMount() {
    if (
      this.props.claimedBy &&
      this.props.claimedBy.id === this.props.currentUser.id
    ) {
      this.setState({
        clicked: true
      });
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
    this.props
      .toggleClaimOfItem({
        variables: {
          id: this.props.id,
          user_id: this.props.currentUser.id
        }
      })
      .then(() => this.props.refresh());
    // mutation to toggle that item that was clicked.
    // render onclick a div that says <name> claimed item!
  };

  addItemToSearch(item) {
    console.log('item ', item);
    this.setState(
      {
        search: item
      },
      console.log('state ', this.state.search)
    );
  }

  render() {
    console.log('here is what you want to serach ', this.state.search);
    const isClicked = this.state.clicked;
    if (
      this.props.claimedBy !== null &&
      this.props.claimedBy !== undefined &&
      this.props.claimedBy.id !== this.props.currentUser.id
    ) {
      return (
        <div className="item">
          <a>
            {this.props.name} was claimed by {this.props.claimedBy.name}
          </a>
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
    } else {
      return (
        <div className="item">
          {isClicked ? (
            <a onClick={e => this.handleItemClick(e)}>
              {this.props.name} was claimed by {this.props.currentUser.name}
              <button
                onClick={() => {
                  window.location.href = `https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=${
                    this.props.name
                  }`;
                }}
              >
                BUY ME
              </button>
            </a>
          ) : (
            <a
              onClick={e => {
                this.handleItemClick(e);
                this.addItemToSearch(this.props.name);
              }}
            >
              {this.props.name}
            </a>
          )}
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

const ItemWithData = graphql(toggleClaimOfItem, { name: 'toggleClaimOfItem' })(
  Item
);

export default ItemWithData;
