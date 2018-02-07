import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ItemComment from './itemComment.jsx'

class ItemComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onInputChange(e) {
    this.setState({ comment: e.target.value })
  }

  onButtonClick() {
    console.log('variables', this.state.comment, this.props.userId, this.props.itemId, this.props.eventId)
    this.props.addComment({
      variables: {
        content: this.state.comment,
        user_id: this.props.userId,
        item_id: this.props.itemId,
        event_id: this.props.eventId
      }
    }).then(result => {
      console.log('result', result)
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
        <button
          onClick={this.onButtonClick}
        >Comment</button>
      </div>
    );
  }
}

const getItemComments = gql`
  query itemComments($id: Int) {
    item(id: $id) {
      comments {
        id
        content
        likes
        user_id
        event_id
        item_id
        user {
          name
        }
      }
    }
  }
`;

const addComment = gql`
  mutation addComment(
    $content: String!,
    $user_id: Int!,
    $item_id: Int!,
    $event_id: Int!
  ) {
    addComment(
      content: $content,
      user_id: $user_id,
      item_id: $item_id,
      event_id: $event_id
    ) {
      id
    }
  }
`;

const GqlItemComments = compose(
  graphql(getItemComments, {
    options: props => {
      return { variables: { id: props.itemId } };
    },
    name: 'itemComments'
  }),
  graphql(addComment, {name: 'addComment'})
)(ItemComments);

export default GqlItemComments;
