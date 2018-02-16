import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import ItemList from './itemList2.jsx'
import gql from 'graphql-tag'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { confirmPresence, denyPresence } from '../mutations.js'
import { GUEST_QUERY } from '../queries.js'

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';

import Loader from 'react-loader-spinner'
import EventFocus2 from './eventFocus2.jsx'

class EventPage2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      date: null,
      location: '',
      img: '',
      id: '',
      hostId: '',
      time: '',
      currentlyEditing: false,
      event: '',
      guests: [],
      imageView: true,
      toggleAttendanceView: false,
      mapView: false,
      toggleItemsView: true,
    }
      this.determineWhatToRender = this.determineWhatToRender.bind(this);
      this.formatDate = this.formatDate.bind(this)
      this.formatTime = this.formatTime.bind(this)
      this.postLoad = this.postLoad.bind(this)
      this.clickAttending = this.clickAttending.bind(this)
      this.clickNotAttending = this.clickNotAttending.bind(this)
      this.returnHome = this.returnHome.bind(this)

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

  formatTime (time) {
    let timeString = time.toString()
    let years = timeString.slice(0,4)
    let months = timeString.slice(4,6)
    let day = timeString.slice(6, 9)

    return `${months} ${day} ${years}`
  }

  postLoad() {
    this.setState({
      guests: this.props.guestQuery.guestUser.guestEvent.users
    })
  }

  clickAttending(name) {
    alert("Great! Can't wait to see you there!")

    this.setState({
      guests: [...this.state.guests, name]
    })

    this.props.confirmPresence({
      variables: {
        user_id: this.props.guestQuery.guestUser.id,
        event_id: this.props.guestQuery.guestUser.guestEvent.id
      }
    })
    .then(() => this.props.guestQuery.refetch())
    // this.forceUpdate()
  }

  clickNotAttending() {
    alert('So sad! You suck!')
    this.props.denyPresence({
      variables: {
        user_id: this.props.guestQuery.guestUser.id,
        event_id: this.props.guestQuery.guestUser.guestEvent.id
      }
    })
    .then(() => this.props.guestQuery.refetch())
    // this.forceUpdate()
  }

  returnHome() {
    window.location ='/'
  }

  render() {
    if ((this.props.guestQuery.loading || this.props.guestQuery.error) && !this.props.guestQuery.guestUser) {
      return (
        <div style={{"textAlign": "center", "marginTop": "225px"}}>
        <Loader
         type="Puff"
         color="#00BFFF"
         height="300"
         width="300"
         alignItems="center"
         justifyContent='center'
         />
       </div>)
    }

    if (this.props.guestQuery.guestUser){
      console.log('props', this.props.guestQuery.guestUser)
    let users = this.props.guestQuery.guestUser.guestEvent.users

    const listStyle = {
      color: 'white',
      fontSize: '40%'
    };

    let event = this.props.event;
    let checkIfHostOfEvent =
      this.props.currentUser.id === this.props.guestQuery.guestUser.guestEvent.host_id;
    let guestsArray = this.props.guestQuery.guestUser.guestEvent.guests;
    const yesRsvp = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M20 12.194v9.806h-20v-20h18.272l-1.951 2h-14.321v16h16v-5.768l2-2.038zm.904-10.027l-9.404 9.639-4.405-4.176-3.095 3.097 7.5 7.273 12.5-12.737-3.096-3.096z" />
      </svg>
    );

    const noRsvp = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm9 12c0 1.94-.624 3.735-1.672 5.207l-12.535-12.535c1.472-1.048 3.267-1.672 5.207-1.672 4.962 0 9 4.038 9 9zm-18 0c0-1.94.624-3.735 1.672-5.207l12.534 12.534c-1.471 1.049-3.266 1.673-5.206 1.673-4.962 0-9-4.038-9-9z" />
      </svg>
    );
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

    const editSVG = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M7 22v-2h6v2h-6zm7.311-7.662l9.689-9.804-4.536-4.534-9.69 9.802 4.537 4.536zm-7.311-6.338h1.743l1.978-2h-3.721v2zm11 8h2v-4.573l-2 2.023v2.55zm-9.576-4.718l-1.424 5.718 5.826-1.318-4.402-4.4zm-6.424-1.282v-2h3v-2h-5v4h2zm16 8v2h-3v2h5v-4h-2zm-13 2h-3v-2h-2v4h5v-2zm-5-4h2v-4h-2v4z" />
      </svg>
    );

    const calendarSVG = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M17 1c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-12 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm13 5v10h-16v-10h16zm2-6h-2v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-8v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-2v18h20v-18zm-11.646 14c-1.318 0-2.192-.761-2.168-2.205h1.245c.022.64.28 1.107.907 1.107.415 0 .832-.247.832-.799 0-.7-.485-.751-1.3-.751v-.977c.573.05 1.196-.032 1.196-.608 0-.455-.369-.663-.711-.663-.575 0-.793.422-.782 1.003h-1.256c.052-1.401.902-2.107 2.029-2.107.968 0 1.969.613 1.969 1.64 0 .532-.234.945-.638 1.147.528.203.847.681.847 1.293-.001 1.201-.993 1.92-2.17 1.92zm5.46 0h-1.306v-3.748h-1.413v-1.027c.897.024 1.525-.233 1.657-1.113h1.062v5.888zm10.186-11v19h-22v-2h20v-17h2z" />
      </svg>
    );

    if (guestsArray === undefined) {
      guestsArray = [];
    }

    return(
    <div>

        <div style={{"textAlign": "center", "align":"center"}}>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={() => this.clickAttending(this.props.guestQuery.guestUser.name)} //this.props.guestUser.name
          label="I'll be there"/>
        <FlatButton style={{"textAlign": "center", "align":"center"}}
          onClick={() => this.clickNotAttending()}
          label="Hell nah, I aint coming"/>
          <FlatButton style={{"textAlign": "center", "align":"center"}}
            onClick={this.returnHome}
            label="HOME"/>
      </div>

      <div className="event-page">
        <div className="event-page-grid">

          <div className="event-page-image-container">

            <div className="event-page-title">
              <h1>{this.determineWhatToRender(this.props.guestQuery.guestUser.guestEvent.name, this.props.guestQuery.guestUser.guestEvent.name)}</h1>
            </div>
            <div
              className={
                this.state.imageView
                  ? 'event-page-image'
                  : 'event-page-image-hide'
              }
            >
              <img src={this.props.guestQuery.guestUser.guestEvent.img} alt="" />
            </div>
            {/* Map */}
            <div
              className={
                this.state.mapView ? 'event-page-map' : 'event-page-map-hide'
              }
            >
              {/* <Map
                useThis={this.props.guestQuery.guestUser.guestEvent.name.location}
                props={this.props}
                latLng={this.state.latLng}
              /> */}
            </div>
          </div>

          <div className="event-page-info">
            {/* Event Description */}
            <div className="event-page-description">
              {this.determineWhatToRender(
                this.props.guestQuery.guestUser.guestEvent.name,
                this.props.guestQuery.guestUser.guestEvent.description
              )}
            </div>
            <div className="border1" />
            <div className="border2" />
            <div className="event-page-date-time">
              {/* <div className="event-page-date">
                {this.formatDate(this.props.guestQuery.guestUser.guestEvent.date, this.props.guestQuery.guestUser.guestEvent.date)}
              </div> */}
              @
              {/* Event Time */}
              <div className="event-page-time">
                {this.props.guestQuery.guestUser.guestEvent.time || this.props.guestQuery.guestUser.guestEvent.time}
              </div>
            </div>
            {/* Event Date */}
            {/* Event Location */}
            <div className="event-page-location">
              {this.determineWhatToRender(this.props.guestQuery.guestUser.guestEvent.location, this.props.guestQuery.guestUser.guestEvent.location)}
            </div>

              <div className="event-page-info-buttons">
                <div className="event-page-info-buttons-unit">
                  <div onClick={this.toggleMapImage}>{mapSvg}</div>
                  <div className="event-page-info-buttons-text">Map</div>
                </div>
                <div className="event-page-info-buttons-unit">
                  <div onClick={this.clickAttending}>{yesRsvp}</div>
                  <div className="event-page-info-buttons-text">I'm Coming</div>
                </div>
                <div className="event-page-info-buttons-unit">
                  <div onClick={this.clickNotAttending}>{noRsvp}</div>
                  <div className="event-page-info-buttons-text">
                    I'm Not Coming
                  </div>
                </div>

                <div className="event-page-info-buttons-unit">
                  <div onClick={this.addToCalendar}>{calendarSVG}</div>
                  <div className="event-page-info-buttons-text">
                    Add To Google Calendar
                  </div>
                </div>
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
              <div style={{ fontSize: '150%', marginTop: '0px' }}>
                <h1>Who's Coming</h1>
              </div>

              <div className="event-page-guests-header" style={listStyle}>
                <List style={{ textAlign: 'center' }}>
                  {guestsArray.map(guest => {
                    return (
                      <ListItem
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontSize: '450%'
                        }}
                        primaryText={guest.name}
                        secondaryText={
                          <p>
                            <a>
                              {guest.memberReply === 0
                                ? ': Not attending'
                                : guest.memberReply === 1
                                  ? ': Attending'
                                  : ': Pending'}
                            </a>
                          </p>
                        }
                      />
                    );
                  })}
                </List>
              </div>
            </div>

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

              <ItemList
                style={{"textAlign": "center", "align":"center"}}
                  eventId={this.props.guestQuery.guestUser.guestEvent.id}
                  hash={this.props.currentUser.params.id}
                  currentUser={this.props.guestQuery.guestUser}
                  items={this.props.guestQuery.guestUser.guestEvent.items}
                // currentUser={this.props.currentUser} event={event}
              />

              {/* <ul /> */}
            </div>
          </div>
        </div>
      </div>
        {/* <div style={{"textAlign": "center"}} className="eventPage">
          <h1 className="eventPage">{this.props.guestQuery.guestUser.guestEvent.name}</h1>
          <div className="eventPage">{this.props.guestQuery.guestUser.guestEvent.location}</div>
          <div className="eventPage">{this.props.guestQuery.guestUser.guestEvent.date}</div>
          <div className="eventPage" >{this.props.guestQuery.guestUser.guestEvent.description}</div>
          <div style={{"textAlign": "center", "align":"center"}}>
            <h2>Who's Coming</h2>
            <ul>
                {users.map((name, i) => {
                  return (
                    <div key={i} style={{"textAlign": "center", "align":"center"}}>
                    <div>
                      <a>{name.name}</a>
                      <a>{name.memberReply === 0 ? ': Not attending' : name.memberReply === 1 ? ': Attending' : ': Pending'}</a>
                    </div>
                  </div>
                  )
                })}
            </ul>
          </div>
          <div style={{"textAlign": "center", "align":"center"}}>
            <h2>Item Registery</h2>
            <h3>Click on an item to claim it</h3>
            <ItemList style={{"textAlign": "center", "align":"center"}}
              eventId={this.props.guestQuery.guestUser.guestEvent.id}
              hash={this.props.currentUser.params.id}
              currentUser={this.props.guestQuery.guestUser}
              items={this.props.guestQuery.guestUser.guestEvent.items}
              ></ItemList>
            <ul></ul>
          </div>
          <img
            style={{"height":"400px", "width": "400px"}}
            src={this.props.guestQuery.guestUser.guestEvent.img || "https://static.businessinsider.com/image/519e85e6ecad04337f000019/image.jpg"}
            alt=""
          />
        </div> */}


      </div>)
    }
    else {
      return <div></div>
    }
  }
}


const GuestInfo = compose (
  graphql(confirmPresence, { name: 'confirmPresence' }),
  graphql(denyPresence, { name: 'denyPresence'}),
  graphql(GUEST_QUERY, {
    options: (props) => ({variables: {id: props.currentUser.params.id}}),
    name: 'guestQuery'
})

)(EventPage2)


export default withRouter(GuestInfo)
