import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ItemComment from './itemComment.jsx'
import TextField from 'material-ui/TextField'
import { addComment } from '../mutations.js'
import { COMMENTS_QUERY } from '../queries.js'

class ItemComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      open: false,
      
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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

    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.onButtonClick}
      />,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];



    if (this.props.itemComments.loading) {
      return <div>loading...</div>
    }

    if (this.props.itemComments.error) {
      this.props.itemComments.refetch()
      return <div>Error!</div>
    }

    if (this.props.itemComments.item) {
      return (
        <div>
          <Dialog
          title="comments"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          className="item-comments-dialog"
        >
        <TextField 
        id="text-field-default"
        defaultValue="Say something"
        value={this.state.comment}
        onChange={this.onInputChange}
        />
        {this.props.itemComments.item.comments.map(itemComment => {
          return <ItemComment itemComment={itemComment} />
        })}
        </Dialog>
        <div className="raised-button">
          <RaisedButton onClick={this.handleOpen} primary={true} className="raised-button"> See Comments </RaisedButton>
        </div>
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
