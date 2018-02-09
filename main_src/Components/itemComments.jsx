import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ItemComment from './itemComment.jsx'
import { addComment } from '../mutations.js'
import { COMMENTS_QUERY } from '../queries.js'

class ItemComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInputChange(e) {
    this.setState({ comment: e.target.value });
  }

  onButtonClick() {
    this.props.addComment({
      variables: {
        content: this.state.comment,
        user_id: this.props.userId,
        item_id: this.props.itemId,
        event_id: this.props.eventId
      }
    }).then(result => {
      this.props.itemComments.refetch()
    })
  }

  render() {
    if (this.props.itemComments.loading) {
      return <div>loading...</div>
    }

    if (this.props.itemComments.error) {
      this.props.itemComments.refetch()
      console.log(this.props.itemComments.error)
      return <div>Error!</div>
    }

    if (this.props.itemComments.item) {
      return (
        <div>
          <ul>
            {this.props.itemComments.item.comments.map(itemComment => {
              return <ItemComment itemComment={itemComment} />
            })}
          </ul>
          <input 
            type="text" 
            value={this.state.comment}
            onChange={this.onInputChange}
          />
          <button onClick={this.onButtonClick}>Comment</button>
        </div>
      );
    }

    return null
  }
}


const GqlItemComments = compose(
  graphql(COMMENTS_QUERY, {
    options: (props) => {
      return { variables: { id: props.itemId } };
    },
    name: 'itemComments'
  }),
  graphql(addComment, { name: 'addComment' }),
)(ItemComments);

export default GqlItemComments;
