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
import {GoogleApiWrapper} from 'google-maps-react'
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { GUESTS_QUERY } from '../queries.js'
import Loader from 'react-loader-spinner'


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
      currentlyEditing : false
    }
    this.refresh = this.refresh.bind(this)
    this.toggleEditState = this.toggleEditState.bind(this)
    this.updateEventState = this.updateEventState.bind(this)
  }

 refresh(){
    this.props.guestsQuery.refetch()
  }

  toggleEditState() {
    this.setState({currentlyEditing: !this.state.currentlyEditing })
  }

  updateEventState(object) {
    this.setState(object)
  }

   render() {
    if (this.props.guestsQuery){
      if (this.props.guestsQuery.loading && !this.props.guestsQuery.event){
        return (<Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
          />
        );
      }

      if (this.props.guestsQuery.error && !this.props.guestsQuery.event){
        return <div>Error</div>
      }

      if (this.props.location.state.event === undefined) {
        return null;
      }

      if (this.props.guestsQuery.event) {


      return this.state.currentlyEditing ?
        (
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
            />
          </div>
         );
      }

      return null
    }

    return null

  }
}


const EventPageWithData = compose(
  graphql(GUESTS_QUERY, {
  options: props => ({ variables: {
    id: props.location.state.event.id } }),
    name: 'guestsQuery',
  }),
  graphql(editEventFields, { name: 'editEventFields' }),
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
