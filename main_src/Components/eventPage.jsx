import React from 'react';
// import ItemList from './itemList.jsx';
import Map from './map.jsx';
import { withRouter } from 'react-router';
import { Switch, Route, browserHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import {GoogleApiWrapper} from 'google-maps-react'
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import ItemList from './itemList.jsx';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: ['Bob', 'Joe'],
      latLng: []
    };
  }

  addressToLatLong(){ //this should be in componentDidMount
    geocodeByAddress(this.props.location.state.event.location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {console.log('Success', latLng); this.setState({latLng: latLng}); console.log("HERE ", this.state.latLng)}) //send this to the map component to put the marker
      // .then(() => console.log('here is state ? ', this.state.latLng))
      .catch(error => console.error('Error', error))
  }

  render() {
    if (this.props.location.state.event === undefined) {
      return null;
    }

    const { event } = this.props.location.state;
    console.log("USER LOCATION? ", this.props.userLocation)

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

          <button onClick={() => this.addressToLatLong()}>Click me if ya want map info</button>
          <button onClick={() => console.log('clicked')}>Click me if ya want directions</button>

          <Map props={this.props} latLng={this.state.latLng}/>

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

const EventPageWithData = compose(
  GoogleApiWrapper({
    apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg'
    // ,
    // libraries: ['visualization']
  }),
  graphql(NAME_QUERY, {
    skip: props => typeof props.currentUser !== 'string',
    options: props => ({ variables: { id: props.currentUser } }),
    name: 'nameGuest'
  })
)(EventPage);

export default withRouter(EventPageWithData);
