import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

import EventList from './eventList.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event_id: null
    };
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick = event => {
    this.props.history.push({
      pathname: '/eventPage/0',
      state: { event }
    });
  };

  render() {
    if (this.props.eventQuery) {
      if (this.props.eventQuery.error) {
        console.log(this.props.eventQuery.error);
        return null;
      }
      if (this.props.eventQuery.loading) {
        return null;
      }

      let event = this.props.eventQuery.user.guestEvent;
      let currentGuest = this.props.currentGuest.params.id;
      let currentUser = undefined;

      this.props.history.push({
        pathname: '/eventPage/' + currentGuest,
        state: { event, currentGuest, currentUser }
      });
      return null;
    }

    if (this.props.dashboardQuery) {
      if (this.props.dashboardQuery.error) {
        return <div>Error2</div>;
      }
      if (this.props.dashboardQuery.loading) {
        return <div>Loading</div>;
      }

      return (
        <div>
          <h1 style={{ textAlign: 'center', fontFamily: 'Noto Sans' }}>
            Your Events
          </h1>
          <h3 style={{ textAlign: 'center' }}>Click on an event to see page</h3>
          <h3 style={{ textAlign: 'center' }}>Currently attending:</h3>
          <EventList
            style={{ fontFamily: 'Noto Sans' }}
            // img={this.props.dashboardQuery.user.img}
            events={this.props.dashboardQuery.user.currentEvents}
            handleEventClick={this.handleEventClick}
          />
          <h3 style={{ textAlign: 'center', fontFamily: 'Noto Sans' }}>
            Currently hosting:
          </h3>
          <EventList
            style={{ fontFamily: 'Noto Sans' }}
            // img={this.props.dashboardQuery.user.img}
            events={this.props.dashboardQuery.user.hostedEvents}
            handleEventClick={this.handleEventClick}
          />
          <h3 style={{ textAlign: 'center', fontFamily: 'Noto Sans' }}>
            Past events:
          </h3>
          <EventList
            style={{ fontFamily: 'Noto Sans' }}
            // img={this.props.dashboardQuery.user.img}
            events={this.props.dashboardQuery.user.pastEvents}
            handleEventClick={this.handleEventClick}
          />
        </div>
      );
    }
  }
}

const DASHBOARD_QUERY2 = gql`
  query eventQuery($id: String) {
    user(hash: $id) {
      guestEvent {
        id
        name
        description
        img
      }
    }
  }
`;

const DASHBOARD_QUERY = gql`
  query dashboardQuery($id: Int) {
    user(id: $id) {
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
`;

const DashboardWithData = compose(
  graphql(DASHBOARD_QUERY2, {
    skip: props => props.currentGuest.params.id === '0',
    options: props => {
      return { variables: { id: props.currentGuest.params.id } };
    },
    name: 'eventQuery'
  }),
  graphql(DASHBOARD_QUERY, {
    skip: props =>
      props.currentUser === undefined || props.currentUser === null,
    options: props => ({ variables: { id: props.currentUser.id } }),
    name: 'dashboardQuery'
  })
)(Dashboard);

export default withRouter(DashboardWithData);
