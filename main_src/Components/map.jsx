import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

class Map extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("props in map 1 ", prevProps, prevState)
    //prevProps.google !==
     if (this.props.props.google) {
       this.loadMap();
     }
  }

//   plotCurrentLocation(map) {
//    if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//          var currLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
//
//          // plot the currLocation on Google Maps, or handle accordingly:
//
//          // new google.maps.Marker({ title: 'Current Location',
//          //                          map: map,
//          //                          position: currLocation });
//          //
//          // map.setCenter(currLocation);
//       });
//    }
// }

  loadMap() {
    // if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function(position) {
    //       currLocation = [position.coords.latitude, position.coords.longitude];
    //       console.log('CURRENT Location ', currLocation)
    //    });
    // }

    if (this.props.props && this.props.props.google) {

      const {google} = this.props.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let myLatLng = this.props.latLng || {lat: 44.475, lng: 44.475}; //{lat: 44.475, lng: 44.475}
      const mapConfig = Object.assign({}, {
        // center: {lat: 0, lng: 180},
        zoom: 5,
        center: myLatLng,
        gestureHandling: "cooperative"
      })
      this.map = new maps.Map(node, mapConfig);

        const marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: "your event!"
          // ,
          //  mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        const marker2 = new google.maps.Marker({
          position: this.props.currLocation,
          map: this.map,
          title: "your location!"
          // ,
          // mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        // var infowindow = new google.maps.InfoWindow({
        //   content: `<h3>${quake.properties.title}</h3>
        //   <h4>${(new Date(quake.properties.time)).toDateString()}
        //   at depth of ${quake.geometry.coordinates[2]} km</h4>`
        // });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
    }
    // this.getDirections()
  }

  // getDirections() {
  //     if (navigator.geolocation) {
  //        navigator.geolocation.getCurrentPosition(function(position) {
  //           // currLocation = [position.coords.latitude, position.coords.longitude];
  //         const currLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
  //           console.log('CURRENT Location ', typeof currLocation.lat)
  //        });
  //     }
  //
  //     var directionsService = new google.maps.DirectionsService();
  //     var directionsRequest = {
  //       origin: currLocation,
  //       destination: myLatLng,
  //       travelMode: google.maps.DirectionsTravelMode.DRIVING,
  //       unitSystem: google.maps.UnitSystem.METRIC
  //     };
  //   //   directionsService.route(
  //   //   directionsRequest,
  //   //   function(response, status)
  //   //   {
  //   //     if (status == google.maps.DirectionsStatus.OK)
  //   //     {
  //   //       new google.maps.DirectionsRenderer({
  //   //         map: mapObject,
  //   //         directions: response
  //   //       });
  //   //     }
  //   //     else {
  //   //       console.log('nope')
  //   //     }
  //   //
  //   //   }
  //   // )
  // }

    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }
      console.log( 'google ', this.props.currLocation)
      console.log( 'latLng ', this.props.latLng)
      return (
        <div ref="map" style={style}>
          loading map...
        </div>
      )
  }
}

export default Map;
