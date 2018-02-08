import React from 'react';
import ItemList from './itemList';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {GoogleApiWrapper} from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Map from './map.jsx';
import Chat from './chat'

class EditEvent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latLng: []
    }
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

  console.log('props', this.props)
  console.log('event', this.props.location.state.event)

      var event = this.props.location.state.event;


      return (
      <div style={{ textAlign: 'center' }} className="eventPage">
      <RaisedButton label="Edit Event" primary={true} />
      <h1 className="eventPage">{event.name}</h1>
      <div className="eventPage">{event.location}</div>
      <div className="eventPage">{event.date}</div>
      <div className="eventPage time">{event.time}</div>
      <div className="eventPage">{event.description}</div>

        <div>
          <h2>Who's Coming</h2>
          <ul>
            {this.props.guests.map((name, id) => {
              return (
                <div>
                  <h3>{name}</h3>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <button onClick={() => this.addressToLatLong()}>Click me if ya want map info</button>
          <button onClick={() => console.log('clicked')}>Click me if ya want directions</button>

          <Map props={this.props} latLng={this.state.latLng}/>
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
        <Chat 
          user={this.props.currentUser}
          event={this.props.location.state.event}
        />
      </div>

    )
  }
}

const EventPageWithData = compose(
  GoogleApiWrapper({
    apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg'
  })
)(EditEvent);

export default EventPageWithData
