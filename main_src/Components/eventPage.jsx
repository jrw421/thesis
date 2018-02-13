import React from 'react';
import ItemList from './itemList.jsx';
import EventFocus from './eventFocus.jsx';
import EditEventPage from './editEventPage.jsx';
import { editEventFields } from '../mutations';
// import ItemList from './itemList.jsx';
import Map from './map.jsx';
import { withRouter } from 'react-router';
import { Switch, Route, browserHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { GoogleApiWrapper } from 'google-maps-react';
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import Loader from 'react-loader-spinner';
import { GUESTS_QUERY, CHECK_EVENT_QUERY } from '../queries.js';
import { saveEvent } from '../mutations.js';

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: null,
      location: '',
      img: '',
      id: '',
      hostId: '',
      time: '',
      currentlyEditing: false,
      event: ''
    };
    this.refresh = this.refresh.bind(this);
    this.toggleEditState = this.toggleEditState.bind(this);
    this.updateEventState = this.updateEventState.bind(this);
  }

  refresh() {
    this.props.guestsQuery
      ? this.props.guestsQuery.refetch()
      : this.props.checkEvent.refetch();
  }

  componentWillReceiveProps(next) {
    console.log('next', next);
    this.setState(
      {
        event: next.location.state
          ? next.location.state.event
          : next.checkEvent.user.lastEvent
      },
      () => {
        console.log('params', this.props.currentUser.id, this.state.event);
        this.props.saveEvent({
          variables: {
            id: this.props.currentUser.id,
            lastEvent: this.state.event.id
          }
        });
      }
    );
  }

  toggleEditState() {
    this.setState({ currentlyEditing: !this.state.currentlyEditing });
  }

  updateEventState(object) {
    this.setState(object);
  }

  formatTime (time) {
    let timeString = time.toString()
    let years = timeString.slice(0,4)
    let months = timeString.slice(4,6)
    let day = timeString.slice(6, 9)
  
    return `${months} ${day} ${years}`
  }

  render() {
    //  console.log('users', users);
    //  console.log('is guest query working', this.props.guestsQuery);
    if (this.props.guestsQuery) {
      if (this.props.guestsQuery.loading && !this.props.guestsQuery.event) {
        return <Loader type="Puff" color="#00BFFF" height="100" width="100" />;
      }

      if (this.props.guestsQuery.error && !this.props.guestsQuery.event) {
        console.log(this.props.guestsQuery.error);
        return <div>Error</div>;
      }

      if (this.props.location.state.event === undefined) {
        return null;
      }

      if (this.props.guestsQuery.event) {
        return this.state.currentlyEditing ? (
          <div>
            <EditEventPage
              event={this.props.location.state.event}
              currentUser={this.props.currentUser}
              guests={this.props.guestsQuery.event.users}
              refresh={this.refresh}
              editingState={this.editingState}
              toggleEditState={this.toggleEditState}
              editEventFields={this.props.editEventFields}
              updateEventState={this.updateEventState}
              currentlyEditing={this.state.currentlyEditing}
            />
          </div>
        ) : (
          <div>
            <EventFocus
              event={this.props.location.state.event}
              currentUser={this.props.currentUser}
              guests={this.props.guestsQuery.event.users}
              refresh={this.refresh}
              toggleEditState={this.toggleEditState}
              name={this.state.name}
              date={this.state.date}
              location={this.state.location}
              description={this.state.description}
              img={this.state.img}
              id={this.state.id}
              hostId={this.state.hostId}
              time={this.state.time}
              currentlyEditing={this.state.currentlyEditing}
            />
          </div>
        );
      }
      return null;
    }

    // if (this.props.checkEvent) {
    //   if (this.props.checkEvent.loading && !this.props.checkEvent.user) {
    //     return <div>Loading...</div>;
    //   }

    //   if (this.props.checkEvent.error && !this.props.checkEvent.user) {
    //     return <div>Error</div>;
    //   }

    //   if (this.props.checkEvent.user) {
    //     return (
    //       <EditEvent
    //         event={this.props.checkEvent.user.lastEvent}
    //         currentUser={this.props.currentUser}
    //         guests={this.props.checkEvent.user.lastEvent.users}
    //         refresh={this.refresh}
    //       />
    //     );
    //   }
    //   return null;
    // }
    return null;
  }
}

const EventPageWithData = compose(
  graphql(GUESTS_QUERY, {
    skip: props => props.location.state === undefined,
    options: props => ({ variables: { id: props.location.state.event.id } }),
    name: 'guestsQuery'
  }),
  graphql(saveEvent, {
    name: 'saveEvent'
  }),
  graphql(editEventFields, { name: 'editEventFields' }),
  graphql(CHECK_EVENT_QUERY, {
    name: 'checkEvent',
    options: props => ({ variables: { id: props.currentUser.id } }),
    skip: props => props.location.state !== undefined
  })
)(EventPage);

export default withRouter(EventPageWithData);

// const EventFocusWithData = compose(
//   graphql(confirmPresence, { name: 'confirmPresence' }),
//   graphql(denyPresence, { name: 'denyPresence' }),
//   GoogleApiWrapper({
//     apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg',
//     apiKey: 'AIzaSyCDVd2ErtvbrNJht5TENmZ54E9mMECUviA'
//   })
// )(EventFocus);

// export default EventFocusWithData
