import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import ItemComment from './itemComment.jsx'

class ItemComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e) {
    this.setState({ comment: e.target.value })
  }

  onButtonClick() {
    this.props.addComment({
      variables: {
        content: this.state.comment,
        user_id: this.props.user_id,
        item_id: this.props.item_id,
        event_id: this.props.event_id
      }
    })
  }

  render() {
    if (this.props.itemComments.loading) {
      return <div>loading...</div>
    }

    if (this.props.itemComments.error) {
      this.props.itemComments.refetch()
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
          onClick={this.onInputChange}
        >Comment</button>
      </div>
    );
  }
}

const getItemComments = gql`
  itemCommentQuery($id: Int) {
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

const gqlItemComments = compose(
  graphql(getItemComments, {
    options: props => {
      return { variables: { id: props.id } };
    },
    name: 'itemComments'
  }),
  graphql(addComment, {name: 'addComment'})
)(ItemComments);

export default gqlItemComments;
