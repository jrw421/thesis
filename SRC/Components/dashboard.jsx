import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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

  render() {
    if (this.props.dashboardQuery.error) {
      return (this.props.error)
    }

    if (this.props.dashboardQuery.loading) {
      return <div>this.props.loading</div>
    }

    return (
      <div>
        <h1>Placeholder</h1>
        <h3>Another Placeholder</h3>
        <EventList 
        events={this.props.dashboardQuery.user.events}
        handleEventClick={this.handleEventClick}
        />
        {/* <EventList events={this.props.dashboardQuery}/>
        <EventList events={this.props.dashboardQuery}/> */}
      </div>
    )
  }
}

const DASHBOARD_QUERY = gql `
  query dashboardQuery {
    user (id: 1) {
        events {
          id
          name
          location
          description
          date
        }
    }
  } 
`

export default graphql(DASHBOARD_QUERY, { name: 'dashboardQuery' }) (Dashboard)

