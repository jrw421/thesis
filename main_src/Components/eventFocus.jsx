import React from 'react';
import ItemList from './itemList';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {GoogleApiWrapper, google} from 'google-maps-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Map from './map.jsx';
import Chat from './chat'
import { confirmPresence, denyPresence } from '../mutations.js'

class EventFocus extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latLng: [],
      guests: this.props.guests
    }

    this.clickAttending = this.clickAttending.bind(this)
    this.clickNotAttending = this.clickNotAttending.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.determineWhatToRender = this.determineWhatToRender.bind(this)
  }

  clickAttending() {
    this.props.confirmPresence({
      variables: {
        user_id: this.props.currentUser.id,
        event_id: this.props.event.id
      }
    }).then(() => this.props.refresh())
  }

  clickNotAttending() {
    this.props.denyPresence({
      variables: {
        user_id: this.props.currentUser.id,
        event_id: this.props.event.id
      }
    }).then(() => this.props.refresh())
  }

  componentWillReceiveProps() {
    this.addressToLatLong()
  }

  addressToLatLong(){ //this should be in componentDidMount
    geocodeByAddress(this.props.event.location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({latLng: latLng});
        //send this to the map component to put the marker
      })
      .catch(error => console.error('Error', error))
  }

  handleClick() {
    this.props.toggleEditState()
  }

  determineWhatToRender(stateOption, eventOption) {
    if (stateOption === null || stateOption === undefined || stateOption.length === 0 || stateOption === 0) {
      return eventOption
    } else {
      return stateOption
    }
  }


  render() {

      console.log('props of event ', this.props.event)
      let event = this.props.event;
      let checkIfHostOfEvent = this.props.currentUser.id === this.props.event.host_id

      return (
      <div style={{ textAlign: 'center' }} className="eventPage">
      <h1 className="eventPage">{ this.determineWhatToRender(this.props.name, event.name) }</h1>

      { checkIfHostOfEvent && <RaisedButton label="Edit Event" primary={true} onClick={this.handleClick}/> }
      { !checkIfHostOfEvent && (
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

      )
      }
      <img
      style={{ height: '400px', width: '400px' }}
      src={this.props.event.img}
      alt=""
    />
      <div className="eventPage">location {this.determineWhatToRender(this.props.location, event.location)}</div>
      <div className="eventPage">date: {this.determineWhatToRender(this.props.date, event.date)}</div>
      <div className="eventPage time">time: {this.props.time || event.time}</div>
      <div className="eventPage">description: {this.determineWhatToRender(this.props.description, event.description)}</div>

        <div>
          <h2>Who's Coming</h2>
          <ul>
            {this.props.guests.map((guest) => {
              return (
                <div>
                  <a>{guest.name}</a>
                  <a>{guest.memberReply === 0 ? ': Not attending' : guest.memberReply === 1 ? ': Attending' : ': Pending'}</a>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <Map useThis={this.props.event.location} props={this.props} latLng={this.state.latLng}/>
        </div>
        <div>
          <h2>Item Registery</h2>
          <h3>Click on an item to claim it</h3>
          <button onClick={() => window.location.href = 'https://www.amazon.com/'}>Buy an item on Amazon!</button>
          <button onClick={() => window.location.href = 'https://drizly.com/'}>Buy some booze!</button>
          <ItemList
            currentUser={this.props.currentUser}
            event={event}
          />
          <ul />
        </div>

        <Chat
          user={this.props.currentUser}
          event={event}
        />
      </div>

    )
  }
}


const EventFocusWithData = compose(
  graphql(confirmPresence, { name: 'confirmPresence' }),
  graphql(denyPresence, { name: 'denyPresence' }),
  GoogleApiWrapper({
    apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg',
    apiKey: 'AIzaSyCDVd2ErtvbrNJht5TENmZ54E9mMECUviA'
  })
)(EventFocus);

export default EventFocusWithData
