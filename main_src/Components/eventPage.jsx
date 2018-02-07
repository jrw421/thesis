import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';

import ItemList from './itemList.jsx';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: ['Bob', 'Joe'],
    };
  }

  clickAttending() {
    this.setState({
      guests: [...this.state.guests, this.props.currentUser.name],
    });
  }

  clickNotAttending() {
    window.location = '/';
  }

  render() {
    if (this.props.location.state.event === undefined) {
      return null;
    }

    const { event } = this.props.location.state;
    console.log(this.props)
    return (
      <div style={{ fontFamily: 'Noto Sans' }}>
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
          <div>
            <h2>Who's Coming</h2>
            <ul>
              {this.state.guests.map((name, id) => (
                <div>
                  <h3>{name}</h3>
                </div>
              ))}
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
          <img style={{ height: '400px', width: '400px' }} src={event.img} alt="" />
        </div>
      </div>
    );
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
  name: 'nameGuest',
})(EventPage);

export default withRouter(EventPageWithData);
