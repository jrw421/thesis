import React from 'react';
<<<<<<< HEAD
import ItemList from './itemList.jsx';
import EditEvent from './editEvent.jsx';
=======
// import ItemList from './itemList.jsx';
import Map from './map.jsx';
>>>>>>> rendering map, converting location to latLong
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
      guests: ['Bob', 'Joe']
    };
  }


  render() {
    return (

    <EditEvent
      location={this.props.location}
      guests={this.state.guests}
      currentUser={this.props.currentUser}
      guests={this.state.guests}
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
