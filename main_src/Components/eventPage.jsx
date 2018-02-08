import React from 'react';
import ItemList from './itemList.jsx';
import EditEvent from './editEvent.jsx';
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


class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this)
  }

 refresh(){
    this.props.guestsQuery.refetch()
  }

   render() {
    if (this.props.guestsQuery){
      if (this.props.guestsQuery.loading){
        return <div>Loading...</div>
      }
      if (this.props.guestsQuery.error && !this.props.guestsQuery.event){
        return <div>Error</div>
      }
      if (this.props.location.state.event === undefined) {
        return null;
      } else {
        return (
            <EditEvent
              event={this.props.location.state.event}
              currentUser={this.props.currentUser}
              guests={this.props.guestsQuery.event.users}
              refresh={this.refresh}
            />
         )
      }
    } else if (!this.props.guestsQuery){
      return null
    }
  }
}




const GUESTS_QUERY = gql`
  query guestsQuery($id: Int) {
    event(id: $id) {
      users{
        name
        id
        memberReply
      }
    }
  }
`;


const EventPageWithData = graphql(GUESTS_QUERY, {
  options: props => ({ variables: { id: props.location.state.event.id } }),
  name: 'guestsQuery',
})(EventPage);

export default withRouter(EventPageWithData);
