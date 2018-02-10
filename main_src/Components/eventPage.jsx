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
import { GUESTS_QUERY } from '../queries.js'
import Loader from 'react-loader-spinner'


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

      if (this.props.guestsQuery.event){
        return (
            <EditEvent
              event={this.props.location.state.event}
              currentUser={this.props.currentUser}
              guests={this.props.guestsQuery.event.users}
              refresh={this.refresh}
            />
         )
      }
      
      return null
    } 
    
    return null
    
  }
}


const EventPageWithData = graphql(GUESTS_QUERY, {
  options: props => ({ 
    variables: { id: props.location.state.event.id },
    errorPolicy: 'all', 
  }),
  name: 'guestsQuery',
})(EventPage);

export default withRouter(EventPageWithData);
