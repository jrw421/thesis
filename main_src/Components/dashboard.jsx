import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner'


import EventList from './eventList';
import { DASHBOARD_QUERY } from '../queries.js'



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleEventClick = this.handleEventClick.bind(this);
  }

  handleEventClick(event) {
    this.props.history.push({
      pathname: '/eventPage',
      state: { event }
    });
  }

  render() {
    if (this.props.refresh || !this.props.refresh){
      this.props.dashboardQuery.refetch()
    }

    if (this.props.dashboardQuery) {

      // if (this.props.dashboardQuery.error && !this.props.dashboardQuery.user) {
      //   return <div>Error2</div>;
      // }

      if (this.props.dashboardQuery.loading && !this.props.dashboardQuery.user) {
         return (<Loader 
          type="Puff"
          color="#00BFFF"
          height="100"	
          width="100"
          />   
        );
      }

<<<<<<< HEAD
      if (this.props.dashboardQuery.user){
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
          </div>
        );
      }
      return <div />
=======
      if (this.props.dashboardQuery.loading && !this.props.dashboardQuery.user) {
        return <div>Loading</div>;
      }
      
      
      if (this.props.dashboardQuery.user)
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
        </div>
      );
>>>>>>> Ask permission to subscribe user to the db
    }
    return <div />
  }
}



const DashboardWithData =

  graphql(DASHBOARD_QUERY, {
    skip: props =>
      props.currentUser === undefined ,
    options: props => ({ variables: { id: props.currentUser.id } }),
    name: 'dashboardQuery',
  })(Dashboard);


export default withRouter(DashboardWithData);
