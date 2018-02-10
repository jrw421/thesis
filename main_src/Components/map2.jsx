import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker, Map} from 'react-google-maps';
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
    // this.map = null
  }

  componentDidMount() {
    this.initialize()
  }

    initialize() {
      var eventLoc = new google.maps.LatLng(this.props.props.latLng);

      this.map = new google.maps.Map(document.getElementById('map'), {
          center: eventLoc,
          zoom: 15
        });

      var request = {
        location: eventLoc,
        radius: '500'
        // ,
        // type: ['supermarket', 'convenience_store', 'liquor_store']
      };

      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch(request, this.getResults);
    }

     async getResults (results, status) {
      let res = await results

      if (res) {
        this.setState({
          results: res
        })
      }
      // console.log(res)
      this.createMarkers(res)
      // var marker = new google.maps.Marker({
      //   map: this.map,
      //   label: 'hello',
      //   title: 'hello',
      //   position: {lat: 44.475, lng: 44.475}
      // });
      // setTimeout(() => {
      //   var marker = new google.maps.Marker({
      //     map: this.map,
      //     label: 'hello',
      //     title: 'hello',
      //     position: {lat: 44.475, lng: 44.475}
      //   })
      // }, 2000)
    }



      createMarkers(places) {
        var bounds = new google.maps.LatLngBounds();
        var placesList = document.getElementById('map');
        // console.log('places are in createMarkers ', places)
        for (var i = 0; i < places.length; i++) {
          let place = places[i]
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };
          // console.log('here is the place ', place.geometry.location)
          var marker = new google.maps.Marker({
            map: this.map,
            icon: image,
            label: place.name,
            title: place.name,
            position: place.geometry.location
          });

          // placesList.innerHTML += '<li>' + place.name + '</li>';

          bounds.extend(place.geometry.location);
        }
        this.map.fitBounds(bounds);
      }



    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }
      // console.log( 'RESULTS IN STTE ', this.state.results)
      const res = this.state.results
      // console.log( 'google ', this.state.currLocation)
      // console.log('anything here? ' , this.props.props.props.google)
      // console.log( 'use This ', this.props.useThis)
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

// {res.map((marker, idx) => {
//   console.log('here is the marker ', marker)
//   const lat = marker.geometry.location.lat();
//   const lng = marker.geometry.location.lng();
//   console.log('coords ', lat, lng)
//   const name = marker.name;
//   return (
//
//     let markerA = new google.maps.Marker({
//       position: marker.geometry.location,
//       title: marker.name,
//       label: marker.name,
//       map: map
//     });
//
//   )
//
//   //   (<Marker
//   //     // onClick={this.onMarkerHover}
//   //     key={idx} info={marker}
//   //     position={{lat, lng}}
//   //   />
//   // )
//
//
// })}
