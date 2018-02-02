import React from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

import EventList from './eventList.jsx'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      eventId: null
    }
    this.handleEventClick = this.handleEventClick.bind(this)
  }

  handleEventClick = (event) => {
    this.props.history.push({
      pathname: '/eventPage/0',
      state: { event }
    })
  }


  render() {
    // console.log('<3', this.props)
    if (this.props.eventQuery) {
          console.log('query results ', this.props.eventQuery)
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
      console.log('query results ', this.props.dashboardQuery)
       if (this.props.dashboardQuery.error) {
        return <div>Error2</div>
       }
       if (this.props.dashboardQuery.loading) {
        return <div>Loading</div>
       }

        return (
          <div>
            <h1 style={{"textAlign":"center"}}>Your Events</h1>
            <h3 style={{"textAlign": "center"}}>Click on an event to see page</h3>
            <h3 style={{"textAlign": "center"}}>Currently attending:</h3>
            <EventList
              // img={this.props.dashboardQuery.user.img}
              events={this.props.dashboardQuery.user.currentEvents}
              handleEventClick={this.handleEventClick}
            />
            <h3 style={{"textAlign": "center"}}>Currently hosting:</h3>
            <EventList
              // img={this.props.dashboardQuery.user.img}
              events={this.props.dashboardQuery.user.hostedEvents}
              handleEventClick={this.handleEventClick}/>
            <h3 style={{"textAlign": "center"}}>Past events:</h3>
            <EventList
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
// `
const DASHBOARD_QUERY2 = gql `
  query eventQuery($id: String){
    user (hash: $id){
      guestEvent{
        id
         name
         description
         img
      }
    }
  }

`

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

// export default graphql(DASHBOARD_QUERY, {
//   options: (props) => ({variables: {id: props.currentUser.id}}), name: 'dashboardQuery' }) (Dashboard)



const DashboardWithData = compose(
  graphql(DASHBOARD_QUERY2, {
  skip: (props) => (props.currentGuest.params.id === '0'),
  options: (props) => {
    return ({variables: {id: props.currentGuest.params.id}})
  },
  name: 'eventQuery'
}),
  graphql(DASHBOARD_QUERY, {
  skip: (props) => (props.currentUser === undefined || props.currentUser === null),
  options: (props) => ({variables: {id: props.currentUser.id}}),
  name: 'dashboardQuery'
}))(Dashboard)

export default withRouter(DashboardWithData);
