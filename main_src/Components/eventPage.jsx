import React from 'react';
import ItemList from './itemList.jsx';
import EventFocus from './eventFocus.jsx';
import EditEventPage from './editEventPage.jsx';
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


class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyEditing : false
    }
    this.refresh = this.refresh.bind(this)
    this.toggleEditState = this.toggleEditState.bind(this)
  }

 refresh(){
    this.props.guestsQuery.refetch()
  }

  toggleEditState() {
    this.setState({currentlyEditing: !this.state.currentlyEditing })
  }

   render() {
    if (this.props.guestsQuery){
      if (this.props.guestsQuery.loading && !this.props.guestsQuery.event){
        return <div>Loading...</div>
      }
      
      if (this.props.guestsQuery.error && !this.props.guestsQuery.event){
        return <div>Error</div>
      }

      if (this.props.location.state.event === undefined) {
        return null;
      } 

      if (this.props.guestsQuery.event){


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
            />
          </div>
         );
      }
      
      return null
    } 
    
    return null
    
  }
}


const EventPageWithData = graphql(GUESTS_QUERY, {
  options: props => ({ variables: { id: props.location.state.event.id } }),
  name: 'guestsQuery',
})(EventPage);

export default withRouter(EventPageWithData);
