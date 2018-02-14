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
import { confirmPresence, denyPresence } from '../mutations.js';

let months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
};

let days = {
  '1': '1st',
  '2': '2nd',
  '3': '3rd',
  '4': '4th',
  '5': '5th',
  '6': '6th',
  '7': '7th',
  '8': '8th',
  '9': '9th',
  '10': '10th',
  '11': '11th',
  '12': '12th',
  '13': '13th',
  '14': '14th',
  '15': '15th',
  '16': '16th',
  '17': '17th',
  '18': '18th',
  '19': '19th',
  '20': '20th',
  '21': '21st',
  '22': '22nd',
  '23': '23rd',
  '24': '24th',
  '25': '25th',
  '26': '26th',
  '27': '27th',
  '28': '28th',
  '29': '29th',
  '30': '30th',
  '31': '31st'
};
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
              <button onClick={this.toggleMapImage}>{mapSvg}</button>
              <div className="event-page-info-buttons-text">Map</div>
            </div>
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
              <h1>Who's Coming</h1>
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
  GoogleApiWrapper({
    apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg',
    apiKey: 'AIzaSyCDVd2ErtvbrNJht5TENmZ54E9mMECUviA'
  })
)(EventFocus);

export default EventFocusWithData;
