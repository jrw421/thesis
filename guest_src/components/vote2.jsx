import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import gql from 'graphql-tag';
import { upVote, downVote } from '../mutations.js'
import { VOTES_QUERY } from '../queries.js'

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

    const thumbsDown = <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.323 12.667c.261.08.677.25.677.755 0 .336-.25.781-1.136.745-.614-.025-1.833.099-2.489.442.453 1.829.344 4.391-.844 4.391-.797 0-.948-.903-1.188-1.734-.859-2.985-2.577-3.532-4.343-3.802v-4.964c3.344 0 4.25-1.5 6.752-1.5 1.6 0 2.426.867 2.426 1.333 0 .167-.136.286-.479.312-.405.031-.367.406.016.477.634.117.913.457.913.771 0 .265-.198.511-.549.591-.418.095-.332.379.016.406.566.045.844.382.844.705 0 .282-.212.554-.63.61-.43.058-.29.368.014.462z"/></svg>

    const thumbsUp = <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.698 15.354c-.405-.031-.367-.406.016-.477.634-.117.913-.457.913-.771 0-.265-.198-.511-.549-.591-.418-.095-.332-.379.016-.406.566-.045.844-.382.844-.705 0-.282-.212-.554-.63-.61-.429-.057-.289-.367.016-.461.261-.08.677-.25.677-.755 0-.336-.25-.781-1.136-.745-.614.025-1.833-.099-2.489-.442.452-1.829.343-4.391-.845-4.391-.797 0-.948.903-1.188 1.734-.859 2.985-2.577 3.532-4.343 3.802v4.964c3.344 0 4.25 1.5 6.752 1.5 1.6 0 2.426-.867 2.426-1.333 0-.167-.136-.286-.48-.313z"/></svg>




    if (this.props.votes.loading) {
      return <div>loading...</div>;
    }

    if (this.props.votes.error) {
      return <div>Error!</div>;
    }

    return (
      <div className="item-vote">
        <div className="item-vote-up">
        <div className="item-text">{this.props.votes.item.upVotes.length}</div>
          <div onClick={this.handleUpVote}>{thumbsUp}</div>
        </div>
        <div className="item-vote-down">
        <div onClick={this.handleDownVote}>{thumbsDown}</div>
        <div>{this.props.votes.item.downVotes.length}</div>
        </div>
      </div>
    );
  }
}


const GqlVote = compose(
  graphql(upVote, { name: 'upVote' }),
  graphql(downVote, { name: 'downVote' }),
  graphql(VOTES_QUERY, { 
    options: (props) => {
      return { variables: { id: props.item_id } };
    },
    name: 'votes',
  }),
)(Vote);

export default GqlVote;
