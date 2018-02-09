import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Modal from 'react-modal';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {GoogleApiWrapper} from 'google-maps-react'

class Map2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currLocation: {},
      directions: [],
      latLng: [],
      isModalOpen: false
    }
  }

  componentDidMount() {
    this.initialize()
  }

    initialize() {
      var eventLoc = new google.maps.LatLng(this.props.props.latLng);

      let map = new google.maps.Map(document.getElementById('map'), {
          center: eventLoc,
          zoom: 15
        });

      var request = {
        location: eventLoc,
        radius: '500',
        type: ['supermarket', 'convenience_store', 'liquor_store']
      };

      let service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, this.getResults);
    }

    getResults(results, status) {
      // if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];

           var placeLoc = place.geometry.location;

           var image = 'img/flag.png';
           var marker = new google.maps.Marker({
               map: map,
               position: place.geometry.location,
               title: place.name,
               animation: google.maps.Animation.DROP,
               icon: image
           });

           google.maps.event.addListener(marker, 'click', function() {
               infowindow.setContent(place.name);
               infowindow.open(map,marker);
           });
      };
    }

    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }

      if (!this.props.props.props.google) {
        return <div>loading...</div>
      }
      return (
        <div>

         <div id="map"  style={style}>
           Loading...
         </div>



      </div>
      )
  }
}

export default Map2;
