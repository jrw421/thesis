import React from 'react';
import ItemList from './itemList';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { GoogleApiWrapper, google } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import Map from './map.jsx';
import Chat from './chat';
import { confirmPresence, denyPresence, addToCalendar } from '../mutations.js';
import { days, months } from './days-months.js'

class EventFocus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latLng: [],
      guests: this.props.guests,
      toggleChat: false,
      toggleChatButton: true,
      toggleItemsView: true,
      toggleAttendanceView: false,
      mapView: false,
      imageView: true
    };

    this.clickAttending = this.clickAttending.bind(this);
    this.clickNotAttending = this.clickNotAttending.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.determineWhatToRender = this.determineWhatToRender.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleItemsView = this.toggleItemsView.bind(this);
    this.toggleAttendingView = this.toggleAttendingView.bind(this);
    this.addToCalendar = this.addToCalendar.bind(this)
    this.toggleMapImage = this.toggleMapImage.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(strDate, strDate2) {
    if (strDate) {
      strDate = strDate.toString();
      return `${months[strDate.slice(4, 6)]} ${
        days[strDate.slice(7)]
      }, ${strDate.slice(0, 4)}`;
    } else {
      strDate2 = strDate2.toString();
      return `${months[strDate2.slice(4, 6)]} ${
        days[strDate2.slice(7)]
      }, ${strDate2.slice(0, 4)}`;
    }
  }

  toggleMapImage() {
    this.setState({
      mapView: !this.state.mapView,
      imageView: !this.state.imageView
    });
  }

  toggleItemsView() {
    if (!this.state.toggleItemsView) {
      this.setState({
        toggleItemsView: !this.state.toggleItemsView,
        toggleAttendanceView: !this.state.toggleAttendanceView
      });
    }
  }

  toggleAttendingView() {
    if (!this.state.toggleAttendanceView) {
      this.setState({
        toggleAttendanceView: !this.state.toggleAttendanceView,
        toggleItemsView: !this.state.toggleItemsView
      });
    }
  }

  clickAttending() {
    this.props
      .confirmPresence({
        variables: {
          user_id: this.props.currentUser.id,
          event_id: this.props.event.id
        }
      })
      .then(() => this.props.refresh());
  }

  clickNotAttending() {
    this.props
      .denyPresence({
        variables: {
          user_id: this.props.currentUser.id,
          event_id: this.props.event.id
        }
      })
      .then(() => this.props.refresh());
  }

  componentWillReceiveProps() {
    this.addressToLatLong();
  }

  addressToLatLong() {
    //this should be in componentDidMount
    geocodeByAddress(this.props.event.location)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ latLng: latLng });
        //send this to the map component to put the marker
      })
      .catch(error => console.error('Error', error));
  }

  handleClick() {
    this.props.toggleEditState();
  }

  determineWhatToRender(stateOption, eventOption) {
    if (
      stateOption === null ||
      stateOption === undefined ||
      stateOption.length === 0 ||
      stateOption === 0
    ) {
      return eventOption;
    } else {
      return stateOption;
    }
  }

  toggleChat() {
    this.setState({
      toggleChat: !this.state.toggleChat,
      toggleChatButton: !this.state.toggleChatButton
    });
  }

  addToCalendar(){
    let event = this.props.event
    let { description, name, location, dateTimeStart, id } = event
    let user_id = this.props.currentUser.id
    this.props.addToCalendar({
      variables: {
        description,
        name,
        location,
        dateTimeStart,
        user_id,
        id
      }
    })
  }

  render() {
    let event = this.props.event;
    let checkIfHostOfEvent =
      this.props.currentUser.id === this.props.event.host_id;
    let guestsArray = this.props.guests;
    const mapSvg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M17.545 5l-5.545-4-5.545 4-6.455-4v18l6.455 4 5.545-4 5.545 4 6.455-4v-18l-6.455 4zm-10.545 2.073l4-2.886v13.068l-4 2.885v-13.067zm6-2.886l4 2.886v13.068l-4-2.885v-13.069zm-11 .405l4 2.479v13.294l-4-2.479v-13.294zm20 13.295l-4 2.479v-13.295l4-2.479v13.295z" />
      </svg>
    );

    const calendarSVG = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 1c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-12 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm13 5v10h-16v-10h16zm2-6h-2v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-8v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-2v18h20v-18zm-11.646 14c-1.318 0-2.192-.761-2.168-2.205h1.245c.022.64.28 1.107.907 1.107.415 0 .832-.247.832-.799 0-.7-.485-.751-1.3-.751v-.977c.573.05 1.196-.032 1.196-.608 0-.455-.369-.663-.711-.663-.575 0-.793.422-.782 1.003h-1.256c.052-1.401.902-2.107 2.029-2.107.968 0 1.969.613 1.969 1.64 0 .532-.234.945-.638 1.147.528.203.847.681.847 1.293-.001 1.201-.993 1.92-2.17 1.92zm5.46 0h-1.306v-3.748h-1.413v-1.027c.897.024 1.525-.233 1.657-1.113h1.062v5.888zm10.186-11v19h-22v-2h20v-17h2z"/></svg>

    if (guestsArray === undefined) {
      guestsArray = [];
    }

    return (
      <div className="event-page">
        <div className="event-page-grid">
          {/* Edit Event Button
          <div className="event-page-edit-button">
            {checkIfHostOfEvent && (
              <RaisedButton
                label="Edit Event"
                primary={true}
                onClick={this.handleClick}
              />
            )}
          </div> */}
          {/* RSVP Buttons
          <div className="event-page-rsvp-button">
            {!checkIfHostOfEvent && (
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
            )}
          </div> */}
          {/* Event Image */}
          <div className="event-page-image-container">
            {/* Event Title */}
            <div className="event-page-title">
              <h1>{this.determineWhatToRender(this.props.name, event.name)}</h1>
            </div>
            <div
              className={
                this.state.imageView
                  ? 'event-page-image'
                  : 'event-page-image-hide'
              }
            >
              <img src={this.props.event.img} alt="" />
            </div>
            {/* Map */}
            <div
              className={
                this.state.mapView ? 'event-page-map' : 'event-page-map-hide'
              }
            >
              <Map
                useThis={this.props.event.location}
                props={this.props}
                latLng={this.state.latLng}
              />
            </div>
          </div>

          <div className="event-page-info">
            {/* Event Description */}
            <div className="event-page-description">
              {this.determineWhatToRender(
                this.props.description,
                event.description
              )}
            </div>
            <div className="border1" />
            <div className="border2" />
            <div className="event-page-date-time">
              <div className="event-page-date">
                {this.formatDate(this.props.date, event.date)}
              </div>
              @
              {/* Event Time */}
              <div className="event-page-time">
                {this.props.time || event.time}
              </div>
            </div>
            {/* Event Date */}
            {/* Event Location */}
            <div className="event-page-location">
              {this.determineWhatToRender(this.props.location, event.location)}
            </div>
            <div className="event-page-info-buttons">
            <div className="event-page-info-buttons-unit">
              <div onClick={this.toggleMapImage}>{mapSvg}</div>
              <div className="event-page-info-buttons-text">Map</div>
              </div>
              <div className="event-page-info-buttons-unit">
              <div onClick={this.addToCalendar}>{calendarSVG}</div>
              <div className="event-page-info-buttons-text">Add To Google Calendar</div>
              </div>
            </div>
           { this.props.event.host_id !== this.props.currentUser.id &&
            <button onClick={this.addToCalendar}>+ Add Event To Google Calendar</button> }
          </div>

          <div className="event-page-sidebar">
            <div className="event-page-sidebar-buttons">
              <div onClick={this.toggleItemsView} className="tab">
                Item Registery
              </div>
              <div onClick={this.toggleAttendingView} className="tab">
                Attending
              </div>
            </div>
            {/* Attendance List */}
            <div
              className={
                this.state.toggleAttendanceView
                  ? 'event-page-attendance-show'
                  : 'event-page-attendance-hide'
              }
            >
              <h1 className="event-page-guests-header">Who's Coming</h1>
              <ul>
                {guestsArray.map(guest => {
                  return (
                    <div>
                      <a>{guest.name}</a>
                      <a>
                        {guest.memberReply === 0
                          ? ': Not attending'
                          : guest.memberReply === 1
                            ? ': Attending'
                            : ': Pending'}
                      </a>
                    </div>
                  );
                })}
              </ul>
            </div>
            {/* Item Registery */}
            <div
              className={
                this.state.toggleItemsView
                  ? 'event-page-registery-show'
                  : 'event-page-registery-hide'
              }
            >
              <div className="event-page-registery-header">
                <h2>Item Registery</h2>
                <h3>Click on an item to claim it</h3>
                <button
                  onClick={() =>
                    (window.location.href = 'https://www.amazon.com/')
                  }
                >
                  Buy an item on Amazon!
                </button>
                <button
                  onClick={() => (window.location.href = 'https://drizly.com/')}
                >
                  Buy some booze!
                </button>
              </div>

              <ItemList currentUser={this.props.currentUser} event={event} />

              {/* <ul /> */}
            </div>
          </div>

          {/* Event Chat */}
          <div className="event-page-chat">
            <Chat
              user={this.props.currentUser}
              event={event}
              showChat={this.state.toggleChat}
              toggleChat={this.toggleChat}
            />
            <button
              className={
                this.state.toggleChatButton ? 'showToggleChat' : 'noToggleChat'
              }
              onClick={this.toggleChat}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const EventFocusWithData = compose(
  graphql(confirmPresence, { name: 'confirmPresence' }),
  graphql(denyPresence, { name: 'denyPresence' }),
  graphql(addToCalendar, {name: 'addToCalendar'}),
  GoogleApiWrapper({
    apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg',
    apiKey: 'AIzaSyCDVd2ErtvbrNJht5TENmZ54E9mMECUviA'
  })
)(EventFocus);

export default EventFocusWithData;
