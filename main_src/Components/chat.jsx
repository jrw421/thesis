import React, { Component } from 'react';
import firebase from '../firebaseConfig.js';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isSameDay from 'date-fns/is_same_day';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      currentDay: undefined
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const messagesRef = firebase.database().ref(`${this.props.event.id}`);
    messagesRef.on('value', snapshot => {
      let messages = snapshot.val();
      let newState = [];
      for (let message in messages) {
        newState.push({
          username: messages[message].user.name,
          message: messages[message].message,
          img: messages[message].user.img,
          id: messages[message].user.id,
          createdAt: messages[message].createdAt
        });
      }
      this.setState(
        {
          messages: newState
        },
        () => {
          this.scrollToBottom();
        }
      );
    });
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const messagesRef = firebase.database().ref(`${this.props.event.id}`);

    const message = {
      message: this.state.message,
      user: this.props.user,
      event: this.props.event,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };

    messagesRef.push(message);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <div className={`chat ${this.props.showChat}`}>
        <button className="closeChat" onClick={this.props.toggleChat}>
          Close Chat
        </button>
        <div className="messages">
          {this.state.messages.map(message => {
            if (message.id === this.props.user.id) {
              return (
                <div className="chatGrid" key={message.id}>
                  <div className="chatImageGrid">
                    <img src={message.img} className="chatImage" />
                  </div>
                  <div className="chatUsernameGrid">
                    <p>{message.username}</p>
                    <p>{distanceInWordsToNow(message.createdAt) || ''}</p>
                  </div>
                  <div className="chatMessageGrid">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            }

            return (
              <div className="chatGridOther" key={message.id}>
                <div className="chatMessageGridOther">
                  <p>{message.message}</p>
                </div>
                <div className="chatUsernameGrid">
                  <p>{message.username}</p>
                  <p>{distanceInWordsToNow(message.createdAt) || ''} ago</p>
                </div>
                <div className="chatImageGrid">
                  <img src={message.img} className="chatImage" />
                </div>
              </div>
            );
          })}
          <div
            className="messagesEnd"
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <div
          className="input"
          ref={input => {
            this.chatInput = input;
          }}
        >
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
            className="chatInput"
            onKeyPress={this.handleKeyPress}
          />
          <button onClick={this.handleSubmit} className="chatButton">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
