import React from 'react';
<<<<<<< HEAD
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
=======
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
>>>>>>> mod

import EventList from './eventList';

class Dashboard extends React.Component {
  constructor(props) {
<<<<<<< HEAD
    super(props);
    this.handleEventClick = this.handleEventClick.bind(this);
=======
    super(props)
    this.state = {
      eventId: null
    }
    this.handleEventClick = this.handleEventClick.bind(this)
    // this.linkToCreateEvent = this.linkToCreateEvent.bind(this)
>>>>>>> mod
  }

  handleEventClick(event) {
    this.props.history.push({
      pathname: '/eventPage',
      state: { event },

<<<<<<< HEAD
    });
  }
=======
  linkToCreateEvent = () => {
    const href = "/createEvent" + window.location.href.substring(31)
    console.log('here ', href)
    window.location = href
  }

>>>>>>> mod

  render() {


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
<<<<<<< HEAD
    return (null);
  }
}


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


const DashboardWithData =

=======

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
>>>>>>> mod
  graphql(DASHBOARD_QUERY, {
    skip: props =>
      props.currentUser === undefined ,
    options: props => ({ variables: { id: props.currentUser.id } }),
    name: 'dashboardQuery',
  })(Dashboard);

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  eventQuery: PropTypes.shape({}).isRequired,
  currentGuest: PropTypes.shape({}).isRequired,
  dashboardQuery: PropTypes.shape({}).isRequired,
};


export default withRouter(DashboardWithData);
