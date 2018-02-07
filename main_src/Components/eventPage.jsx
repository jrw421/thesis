import React from 'react';
import ItemList from './itemList.jsx';
import EditEvent from './editEvent.jsx';
import { withRouter } from 'react-router';
import { Switch, Route, browserHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import {GoogleApiWrapper} from 'google-maps-react'
import gql from 'graphql-tag';
import FlatButton from 'material-ui/FlatButton';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: ['Bob', 'Joe'],
      latLng: []
    };
  }

  // clickAttending() {
  //   this.setState({
  //     guests: [...this.state.guests, this.props.currentUser.name]
  //   });
  // }
  //
  // clickNotAttending() {
  //   window.location = '/';
  // }

  // addressToLatLong(){ //this should be in componentDidMount
  //   geocodeByAddress(this.props.location.state.event.location)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => {console.log('Success', latLng); this.setState({latLng: latLng}); console.log("HERE ", this.state.latLng)}) //send this to the map component to put the marker
  //     // .then(() => console.log('here is state ? ', this.state.latLng))
  //     .catch(error => console.error('Error', error))
  // }

  render() {
    console.log('here ', this.state.latLng)
    return (

    <EditEvent
      location={this.props.location}
      guests={this.state.guests}
      currentUser={this.props.currentUser}
      guests={this.state.guests}
      props={this.props}
      latLng={this.state.latLng}
      />
    )

  }
}



const NAME_QUERY = gql`
  query nameQuery($id: String) {
    user(hash: $id) {
      name
    }
  }
`;

const EventPageWithData = compose(
  GoogleApiWrapper({
    apiKey: 'AIzaSyCcyYySdneaabfsmmARXqAfGzpn9DCZ3dg'
    // ,
    // libraries: ['visualization']
  }),
  graphql(NAME_QUERY, {
    skip: props => typeof props.currentUser !== 'string',
    options: props => ({ variables: { id: props.currentUser } }),
    name: 'nameGuest'
  })
)(EventPage);

export default withRouter(EventPageWithData);
