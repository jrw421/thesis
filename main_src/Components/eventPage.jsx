import React from 'react';
import ItemList from './itemList.jsx';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: ['Bob', 'Joe']
    };
  }

  clickAttending() {
    this.setState({
      guests: [...this.state.guests, this.props.currentUser.name]
    });
  }

  clickNotAttending() {
    window.location = '/';
  }

  render() {
    if (this.props.location.state.event === undefined) {
      return null;
    } else {
      const event = this.props.location.state.event;
      console.log('event in event page', event, 'currentUser', this.props.currentUser)
      return (
        <div style={{ fontFamily: 'Noto Sans' }}>
          {this.props.location.state.currentUser ? (
            <div>
              <div style={{ textAlign: 'center', align: 'center' }}>
                <FlatButton
                  style={{ textAlign: 'center', align: 'center' }}
                  onClick={this.clickAttending} 
                  label="I'll be there"
                />
                <FlatButton
                  style={{ textAlign: 'center', align: 'center' }}
                  onClick={this.clickNotAttending}
                  label="Hell nah, I aint coming"
                />
              </div>

              <div style={{ textAlign: 'center' }} className="eventPage">
                <h1 className="eventPage">{event.name}</h1>
                <div className="eventPage">{event.location}</div>
                <div className="eventPage">{event.date}</div>
                <div className="eventPage">{event.description}</div>
                <div style={{ textAlign: 'center', align: 'center' }}>
                  <h2>Who's Coming</h2>
                  <ul>
                    {this.state.guests.map(name => {
                      return (
                        <div style={{ textAlign: 'center', align: 'center' }}>
                          <a>{name}</a>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div style={{ textAlign: 'center', align: 'center' }}>
                  <h2>Item Registery</h2>
                  <h3>Click on an item to claim it</h3>
                  <ItemList
                    style={{ textAlign: 'center', align: 'center' }}
                    currentUser={this.props.currentUser}
                    event={this.props.location.state.event}
                  />
                  <ul />
                </div>
                <img
                  style={{ height: '400px', width: '400px' }}
                  src={event.img}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }} className="eventPage">
              <h1 className="eventPage">{event.name}</h1>
              <div className="eventPage">{event.location}</div>
              <div className="eventPage">{event.date}</div>
              <div className="eventPage">{event.description}</div>
              <div>
                <h2>Who's Coming</h2>
                <ul>
                  {this.state.guests.map((name, id) => {
                    return (
                      <div>
                        <h3>{name}</h3>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h2>Item Registery</h2>
                <h3>Click on an item to claim it</h3>
                <ItemList
                  currentUser={this.props.currentUser}
                  event={this.props.location.state.event}
                />
                <ul />
              </div>
              <img
                style={{ height: '400px', width: '400px' }}
                src={event.img}
                alt=""
              />
            </div>
          )}
        </div>
      );
    }
  }
}


const NAME_QUERY = gql`
  query nameQuery($id: String) {
    user(hash: $id) {
      name
    }
  }
`;

const EventPageWithData = graphql(NAME_QUERY, {
  skip: props => typeof props.currentUser !== 'string',
  options: props => ({ variables: { id: props.currentUser } }),
  name: 'nameGuest'
})(EventPage);

export default withRouter(EventPageWithData);
