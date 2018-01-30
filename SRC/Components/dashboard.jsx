import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import axios from 'axios'

import EventList from './eventList.jsx'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.handleEventClick = this.handleEventClick.bind(this)
  }

  handleEventClick = (event) => {
    console.log(this.props.history.push({
      pathname: '/eventPage',
      state: { event }
    }))
  }

  // getEmails = () => {
  //   axios.get('/emails')
  //       .then(data => {console.log(data)})
  //       .catch(error => {console.log(error)})
  // }

  render() {
    console.log(this.props)
    
    if (this.props.dashboardQuery.error) {
      return <div>Error</div>
    }

    if (this.props.dashboardQuery.loading) {
      return <div>Loading</div>
    }

    return (
      <div>
        <h1>Placeholder</h1>
        <h3>Another Placeholder</h3>

        <h4>Hosted Events</h4>
        <EventList 
          events={this.props.dashboardQuery.user.hostedEvents}
          handleEventClick={this.handleEventClick}
        />

        <h4>Attending Events</h4>
        <EventList 
          events={this.props.dashboardQuery.user.currentEvents}
          handleEventClick={this.handleEventClick}
        />
        <h4>Past Events</h4>
        <EventList 
          events={this.props.dashboardQuery.user.pastEvents}
          handleEventClick={this.handleEventClick}
        />
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
  query dashboardQuery {
    user (id: 1) {
      hostedEvents{
        id
        name
        description
        date
        location
        users {
          id
          name
        }
        items {
          id
          name
        } 
      }
      pastEvents{
        id
        name
        description
        date
        location
        users {
          id
          name
        }
        items {
          id
          name
        }
      }
      currentEvents{
        id
        name
        description
        date
        location
        users {
          id
          name
        }
        items {
          id
          name
        }
      }
    }
  }
`

export default graphql(DASHBOARD_QUERY, {name: 'dashboardQuery'}) (Dashboard)

