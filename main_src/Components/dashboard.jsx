import React from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton';

import EventList from './eventList.jsx'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventId: null
    }
    this.handleEventClick = this.handleEventClick.bind(this)
    // this.linkToCreateEvent = this.linkToCreateEvent.bind(this)
  }

  handleEventClick = (event) => {
    this.props.history.push({
      pathname: '/eventPage/0',
      state: { event }
    })
  }

  linkToCreateEvent = () => {
    const href = "/createEvent" + window.location.href.substring(31)
    console.log('here ', href)
    window.location = href
  }


  render() {
    if (this.props.eventQuery) {
      if (this.props.eventQuery.error) {
         return <div>Error1</div>
      }
      if (this.props.eventQuery.loading){
        return <div>Loading</div>
      }

      let event = this.props.eventQuery.user.guestEvent
      let currentGuest = this.props.currentGuest.params.id
      let currentUser = undefined


      this.props.history.push({
        pathname: '/eventPage/' + currentGuest,
        state: { event, currentGuest, currentUser}
      })
        return null

    }

    if (this.props.dashboardQuery){
       if (this.props.dashboardQuery.error) {
        return <div>Error2</div>
       }
       if (this.props.dashboardQuery.loading) {
        return <div>Loading</div>
       }

        return (
          <div>
            <h1 style={{"textAlign":"center", "fontFamily": "Noto Sans"}}>Your Events</h1>
            <h3 style={{"textAlign": "center"}}>Click on an event to see page</h3>
            <h3 style={{"textAlign": "center"}}>Currently attending:</h3>
            <EventList
              style={{"fontFamily": "Noto Sans"}}
              // img={this.props.dashboardQuery.user.img}
              events={this.props.dashboardQuery.user.currentEvents}
              handleEventClick={this.handleEventClick}
            />
            <h3 style={{"textAlign": "center", "fontFamily": "Noto Sans"}}>Currently hosting:</h3>
            {(this.props.dashboardQuery.user.hostedEvents.length === 0 ) &&
              <div>
                <h3 style={{"textAlign": "center"}}>No events yet!</h3>
                <div style={{"textAlign": "center"}}>
                  <FlatButton label="Create an event!" onClick={this.linkToCreateEvent.bind(this)}/>
                </div>
              </div>
            }
            <EventList
              style={{"fontFamily": "Noto Sans"}}
              // img={this.props.dashboardQuery.user.img}
              // linkToCreateEvent={this.linkToCreateEvent}
              events={this.props.dashboardQuery.user.hostedEvents}
              handleEventClick={this.handleEventClick}/>
            <h3 style={{"textAlign": "center", "fontFamily": "Noto Sans"}}>Past events:</h3>
            <EventList
              style={{"fontFamily": "Noto Sans"}}
              // img={this.props.dashboardQuery.user.img}
              events={this.props.dashboardQuery.user.pastEvents}
              handleEventClick={this.handleEventClick}/>
          </div>
        )
      }
  }
}

// const DASHBOARD_QUERY = gql `
//   query dashboardQuery {
//     user (id: 1) {
//         id
//         name
//     }
//   }
// // `


const DASHBOARD_QUERY = gql `
  query dashboardQuery ($id: Int){
    user (id: $id) {
        hostedEvents {
          id
          name
          location
          description
          date
          img
        }
        currentEvents {
          id
          name
          location
          description
          date
          img
        }
        pastEvents {
          id
          name
          location
          description
          date
          img
        }
    }
  }
`
//
// // export default graphql(DASHBOARD_QUERY, {
// //   options: (props) => ({variables: {id: props.currentUser.id}}), name: 'dashboardQuery' }) (Dashboard)
//
const DashboardWithData = compose(
  graphql(DASHBOARD_QUERY, {
  skip: (props) => (props.currentUser === undefined || props.currentUser === null),
  options: (props) => ({variables: {id: props.currentUser.id}}),
  name: 'dashboardQuery'
}))(Dashboard)

export default withRouter(DashboardWithData);
