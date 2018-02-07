import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Vote extends Component {
  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote() {
    this.props.upVote({
      variables: {
        user_id: this.props.user_id,
        item_id: this.props.item_id,
      },
    });
  }

  handleDownVote() {
    this.props.downVote({
      variables: {
        user_id: this.props.user_id,
        item_id: this.props.item_id,
      },
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleUpVote}>UpVote</button>
        <button onClick={this.handleDownVote}>DownVote</button>
      </div>
    );
  }
}

const upVote = gql`
  mutation upVoteItem($user_id: Int!, $item_id: Int!) {
    upVoteItem(user_id: $user_id, item_id: $item_id) {
      id
    }
  }
`;

const downVote = gql`
  mutation downVoteItem($user_id: Int!, $item_id: Int!) {
    downVoteItem(user_id: $user_id, item_id: $item_id) {
      id
    }
  }
`;

const GqlVote = compose(
  graphql(upVote, { name: 'upVote' }),
  graphql(downVote, { name: 'downVote' }),
)(Vote);

export default GqlVote;
