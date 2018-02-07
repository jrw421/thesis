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
    })
      .then(() => {
        this.props.votes.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDownVote() {
    this.props.downVote({
      variables: {
        user_id: this.props.user_id,
        item_id: this.props.item_id,
      },
    })
      .then(() => {
        this.props.votes.refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.props.votes.loading) {
      return <div>loading...</div>
    }

    if (this.props.votes.error) {
      console.log('error in votes', this.props.votes.error)
      return <div>Error!</div>
    }

    console.log(this.props)
    return (
      <div>
        <button onClick={this.handleUpVote}>UpVote</button>
        <p>Total Upvotes: {this.props.votes.item.upVotes.length}</p>
        <button onClick={this.handleDownVote}>DownVote</button>
        <p>Total Downvotes: {this.props.votes.item.downVotes.length}</p>
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

const getVotes = gql`
  query item($id: Int!) {
    item (id: $id) {
      upVotes {
        user_id
      }
      downVotes {
        user_id
      }
    }
  }
`

const GqlVote = compose(
  graphql(upVote, { name: 'upVote' }),
  graphql(downVote, { name: 'downVote' }),
  graphql(getVotes, { 
    options: (props) => {
      return { variables: { id: props.item_id } };
    },
    name: 'votes',
  }),
)(Vote);

export default GqlVote;
