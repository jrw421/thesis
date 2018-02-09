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

  componentDidUpdate(prevProps, prevState) {
    console.log("props in map 1 ", prevProps, prevState)
     // if (this.props.props.google) {
       // this.addressToLatLong();
       // this.loadMap();
       // this.plotCurrentLocation();
       // this.showDirections();
     // }
     this.initialize()
  }

  // loadMap() {
  //   if (this.props.props && this.props.props.google) {
  //
  //     const {google} = this.props.props;
  //     const maps = google.maps;
  //     const mapRef = this.refs.map; //might need to change back to map
  //     const node = ReactDOM.findDOMNode(mapRef);
  //     const myLatLng = this.props.latLng || {lat: 44.475, lng: 44.475}; //{lat: 44.475, lng: 44.475}
  //     const mapConfig = Object.assign({}, {
  //       // center: {lat: 0, lng: 180},
  //       zoom: 5,
  //       center: myLatLng,
  //       gestureHandling: "cooperative"
  //     })
  //       this.map = new maps.Map(node, mapConfig);
  //
  //       // infoWindow = new google.maps.InfoWindow();
  //       const service = new google.maps.places.PlacesService(this.map);
  //
  //       this.getStores()
  //     }
  //   };
  //
  //   getStores() {
  //     this.initialize()
  //   }

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
      console.log('what is results ', results)
      // if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          console.log('what is place ', place)
          // this.createMarker(results[i]);

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
////////
        //   var placeLoc = place.geometry.location;
        //   // console.log('what is placeLoc ', placeLoc)
        //   var marker = new google.maps.Marker({
        //     map: map,
        //     icon: {
        //       url: 'http://maps.gstatic.com/mapfiles/circle.png',
        //       anchor: new google.maps.Point(10, 10),
        //       scaledSize: new google.maps.Size(10, 17)
        //     },
        //     position: place.geometry.location
        //   });
        //   console.log('what is marker ', marker)
        // }
      };
///////
    }

    // showDirections() {
    //   let directionsService = new google.maps.DirectionsService();
    //   let directionsDisplay = new google.maps.DirectionsRenderer({
    //       map: this.map
    //   });
    //   // directionsDisplay.setMap(this.map);
    //   directionsDisplay.setPanel(document.getElementById("panel"));
    //
    //   this.calculateAndDisplayRoute(directionsService, directionsDisplay, this.props.latLng, this.state.currLocation);
    //
    // }
    //
    // calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    //   directionsService.route({
    //     origin: pointA,
    //     destination: pointB,
    //     travelMode: google.maps.TravelMode.DRIVING
    //   }, function(response, status) {
    //     if (status === 'OK') {
    //       directionsDisplay.setDirections(response);
    //     } else {
    //       window.alert('Directions request failed due to ' + status);
    //     }
    //   });
    // }

    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }
      console.log( 'google ', this.state.currLocation)
      console.log('anything here? ' , this.props.props.props.google)
      // console.log( 'use This ', this.props.useThis)
      if (!this.props.props.props.google) {
        return <div>loading...</div>
      }
      return (
        <div>

         <div id="map" ref="map" style={style}>
           {/* loading map... */}
           HELLO THERE SHOULD BE A MAP HERE
         </div>

         {/* <div id="map">
           HELLO THERE I AM MAP 2
         </div> */}

      </div>
      )
  }
}

export default Map2;
