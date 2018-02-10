import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker, Map, InfoWindow} from 'react-google-maps';
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
      isModalOpen: false,
      results: []
    }
    this.getResults = this.getResults.bind(this)
    this.initialize = this.initialize.bind(this)
    this.createMarkers = this.createMarkers.bind(this)
  }

  componentDidMount() {
    this.initialize()
  }

    initialize() {
      var eventLoc = new google.maps.LatLng(this.props.props.latLng);

      this.map = new google.maps.Map(document.getElementById('map'), {
          center: eventLoc,
          zoom: 35
        });

      var request = {
        location: eventLoc,
        radius: '500',
        type: ['supermarket', 'convenience_store', 'liquor_store']
      };

      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request, this.getResults);
      this.map.setZoom(10)
    }

     async getResults (results, status) {
      let res = await results

      if (res) {
        this.setState({
          results: res
        })
      }

      for (var i = 0 ; i < res.length; i++) {
        this.createMarkers(res[i])
      }
    }



      createMarkers(place) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('map');

          if (place.name === 'Brooklyn' || place.name === 'New York') {
            return null;
          }
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          var marker = new google.maps.Marker({
            map: this.map,
            icon: image,
            // label: place.name,
            title: place.name,
            position: place.geometry.location
          });

         let service = new google.maps.places.PlacesService(this.map);

          const infoWindow = new google.maps.InfoWindow();
          google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
              console.log('what is result ', result)
              if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
              }
              infoWindow.setContent('<div><strong>' + result.name + '</strong><br>' +
                '<p>' + result.formatted_address + '</p>' +
                `<p><a href=${result.url}><strong>Get Directions</strong> </a></p>` +
                '</div>')

              infoWindow.open(map, marker);
            });
          });

        bounds.extend(place.geometry.location);
        this.map.fitBounds(bounds);
        this.map.setZoom(15)
      }



    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }
      const res = this.state.results

      if (!this.props.props.props.google) {
        return <div>loading...</div>
      }
      const results = this.state.results
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
