import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventList from './eventList.jsx'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.handleEventClick = this.handleEventClick.bind(this)
    console.log('this is props ', this.props)
    // console.log('this is props ', this.props.dashboardQuery.user.hostedEvents)
  }

  handleEventClick = (event) => {
    console.log(this.props.history.push({
      pathname: '/eventPage',
      state: { event }
    }))
  }

  render() {
    console.log('this props ', this.props)
    if (this.props.dashboardQuery.error) {
      return <div>Error</div>
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

// const DASHBOARD_QUERY = gql `
//   query dashboardQuery {
//     user (id: 1) {
//         id
//         name
//     }
//   }
// `

const DASHBOARD_QUERY = gql `
  query dashboardQuery($id: Int) {
    user (id: 3) {
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

export default graphql(DASHBOARD_QUERY, { name: 'dashboardQuery' }) (Dashboard)
