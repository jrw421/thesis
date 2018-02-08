import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currLocation: {},
      directions: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("props in map 1 ", prevProps, prevState)
     if (this.props.props.google) {
       this.loadMap();
       this.plotCurrentLocation()
     //
     // const DirectionsService = new google.maps.DirectionsService();
     //
     // DirectionsService.route({
     //   // origin: new google.maps.LatLng(41.8507300, -87.6512600),
     //   // destination: new google.maps.LatLng(41.8525800, -87.6514100),
     //   origin: this.state.currLocation,
     //   destination: this.props.latLng,
     //   travelMode: google.maps.TravelMode.DRIVING,
     // }, (result, status) => {
     //   if (status === google.maps.DirectionsStatus.OK) {
     //     console.log('results in directions ', result.routes);
     //
     //   } else {
     //     console.error(`error fetching directions ${result}`);
     //   }
     // });

   }

  }

  plotCurrentLocation(map) {
     var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }

      getPosition()
        .then((position) => {
          let lat = position.coords.latitude
          let lng = position.coords.longitude
          console.log("anything LongLat ", lat, lng); //`Latitude : ${crd.latitude}`

          this.setState({
             currLocation: {lat: lat, lng: lng}
           })
        })
        .catch((err) => {
          console.error(err.message);
        });
  }

  loadMap() {

    if (this.props.props && this.props.props.google) {

      const {google} = this.props.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const myLatLng = this.props.latLng || {lat: 44.475, lng: 44.475}; //{lat: 44.475, lng: 44.475}
      const mapConfig = Object.assign({}, {
        // center: {lat: 0, lng: 180},
        zoom: 5,
        center: myLatLng,
        gestureHandling: "cooperative"
      })
      this.map = new maps.Map(node, mapConfig);
      // var pointA = new google.maps.LatLng(51.7519, -1.2578),
      // pointB = new google.maps.LatLng(50.8429, -0.1313),
      //
      //     myOptions = {
      //         zoom: 7,
      //         center: pointA
      //     },
        // const marker = new google.maps.Marker({
        //   position: myLatLng,
        //   map: this.map,
        //   title: "your event!"
        //   // ,
        //   //  mapTypeId: google.maps.MapTypeId.ROADMAP
        // });
        //
        // const marker2 = new google.maps.Marker({
        //   position: this.state.currLocation,
        //   map: this.map,
        //   title: "your location!"
        //   // ,
        //   // mapTypeId: google.maps.MapTypeId.ROADMAP
        // });
        // var infowindow = new google.maps.InfoWindow({
        //   content: `<h3>${quake.properties.title}</h3>
        //   <h4>${(new Date(quake.properties.time)).toDateString()}
        //   at depth of ${quake.geometry.coordinates[2]} km</h4>`
        // });
        // marker.addListener('click', function() {
        //   infowindow.open(this.map, marker);
        // });

        let directionsService = new google.maps.DirectionsService();
        let directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map
        })
        let markerA = new google.maps.Marker({
            position: this.props.latLng,
            title: "point A",
            label: "A",
            map: this.map
        })
       let markerB = new google.maps.Marker({
            position: this.state.currLocation,
            title: "point B",
            label: "B",
            map: this.map
        });


    //     const DirectionsService = new google.maps.DirectionsService();
    //
    //     DirectionsService.route({
    //       // origin: new google.maps.LatLng(41.8507300, -87.6512600),
    //       // destination: new google.maps.LatLng(41.8525800, -87.6514100),
    //       origin: this.state.currLocation,
    //       destination: this.props.latLng,
    //       travelMode: google.maps.TravelMode.DRIVING,
    //     }, (result, status) => {
    //       if (status === google.maps.DirectionsStatus.OK) {
    //         console.log('results in directions ', result.routes);
    //
    //       } else {
    //         console.error(`error fetching directions ${result}`);
    //       }
    //     });
    // }
    // var onChangeHandler = function() {
      // const directionsService = new google.maps.DirectionsService();
      // const directionsDisplay = new google.maps.DirectionsRenderer();

      this.calculateAndDisplayRoute(directionsService, directionsDisplay, this.props.latLng, this.state.currLocation);
    // };
    // this.getDirections()

  }
}

  calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // function initMap() {
  //     var directionsService = new google.maps.DirectionsService;
  //     var directionsDisplay = new google.maps.DirectionsRenderer;
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 7,
  //       center: {lat: 41.85, lng: -87.65}
  //     });
  //     directionsDisplay.setMap(map);
  //
  //     var onChangeHandler = function() {
  //       calculateAndDisplayRoute(directionsService, directionsDisplay);
  //     };
  //     // document.getElementById('start').addEventListener('change', onChangeHandler);
  //     // document.getElementById('end').addEventListener('change', onChangeHandler);
  //   }




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
      console.log( 'google ', this.state.currLocation)
      console.log( 'latLng ', this.props.latLng)
      return (
        <div ref="map" style={style}>
          loading map...
        </div>
      )
  }
}

export default Map;
