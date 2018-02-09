import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messages: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const messagesRef = firebase.database().ref(`${this.props.event.id}`);
    messagesRef.on('value', (snapshot) => {
      let messages = snapshot.val();
      let newState = [];
      for (let message in messages) {
        newState.push({
          username: messages[message].user.name,
          message: messages[message].message,
          img: messages[message].user.img
        });
      }
      this.setState({
        messages: newState
      });
    });
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const messagesRef = firebase.database().ref(`${this.props.event.id}`);
    
    const message = {
      message: this.state.message,
      user: this.props.user,
      event: this.props.event
    }
    
    messagesRef.push(message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map(message => {
            return <li><img src={message.img} /> {message.username}: {message.message}</li>
          })}
        </ul>
        <input type="text" value={this.state.message} onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Chat;