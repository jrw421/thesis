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
          img: messages[message].user.img,
          id: messages[message].user.id
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
      <div className="chat">
        <ul>
          {this.state.messages.map(message => {
            return (
              <li className="chatGrid">
                <div className="chatImageGrid">
                  <img src={message.img} className="chatImage"/> 
                </div>
                <div className="chatUsernameGrid">
                  <p>{message.username}: </p>
                </div>
                <div className="chatMessageGrid">
                  <p>{message.message}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <input 
          type="text" 
          value={this.state.message} 
          onChange={this.handleChange}
          className="chatInput"
        />
        <button onClick={this.handleSubmit} className="chatButton">Submit</button>
      </div>
    );
  }
}

export default Chat;