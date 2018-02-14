import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner';

import EventList from './eventList';
import { DASHBOARD_QUERY } from '../queries.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick(event) {
    console.log('jon is right')
    this.props.history.push({
      pathname: '/eventPage',
      state: { event }  //also pass down this.props.dashboardQuery.event
    });
  }

  render() {
    console.log('dashboard porps', this.props)
    if (this.props.refresh || !this.props.refresh){
      this.props.dashboardQuery.refetch()
    }

    if (this.props.dashboardQuery) {
      // if (this.props.dashboardQuery.error && !this.props.dashboardQuery.user) {
      //   return <div>Error2</div>;
      // }
      if (this.props.dashboardQuery.error && !this.props.dashboardQuery.user) {
        return <div>Error2</div>;
      }

      if (this.props.dashboardQuery.loading && !this.props.dashboardQuery.user) {
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
          </div>
        );
      }

      if (this.props.dashboardQuery.user) {
        console.log('mememem?')
        return (
          <div>
            <h1 style={{ textAlign: 'center', fontFamily: 'Noto Sans' }}>
              Your Events
            </h1>
            <h3 style={{ textAlign: 'center' }}>
              Click on an event to see page
            </h3>
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
              Past Events:
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
      return <div />;
    }
    return <div />;
  }
}


const DashboardWithData =
  graphql(DASHBOARD_QUERY, {
    skip: props => props.currentUser === undefined ,
    options: props => ({ variables: { id: props.currentUser.id } }),
    name: 'dashboardQuery',
  })(Dashboard);



export default withRouter(DashboardWithData);
