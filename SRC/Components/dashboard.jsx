import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventList from './eventList.jsx'

class Dashboard extends React.Component {
  render() {
    console.log('dashboard props', this.props)
    return (
      <div>
        <h1>Placeholder</h1>
        <h3>Another Placeholder</h3>
        {/* <EventList events={this.props.dashboardQuery.placeholder}/>
        <EventList events={this.props.dashboardQuery.placeholder}/>
        <EventList events={this.props.dashboardQuery.placeholder}/> */}
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
        description
        date
        location
      }
    }
  } 
`
export default graphql(DASHBOARD_QUERY, { name: 'dashboardQuery' }) (Dashboard)