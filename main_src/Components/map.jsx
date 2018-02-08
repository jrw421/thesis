import React from 'react';
import ReactDOM from 'react-dom'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import Modal from 'react-modal';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currLocation: {},
      directions: [],
      latLng: [],
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  // componentDidMount() {
  //   if (this.props.props.google) {
  //    this.loadMap();
  //    this.plotCurrentLocation()
  //   }
  // }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    });
  }


  componentDidUpdate(prevProps, prevState) {
    console.log("props in map 1 ", prevProps, prevState)
     // if (this.props.props.google) {
       // this.addressToLatLong();
       this.loadMap();
       this.plotCurrentLocation();
       this.showDirections();
     // }
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
        // console.log("anything LongLat ", lat, lng);
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

        let markerA = new google.maps.Marker({
            position: this.props.latLng,
            title: "point A",
            label: "A",
            map: this.map
        });
       let markerB = new google.maps.Marker({
            position: this.state.currLocation,
            title: "point B",
            label: "B",
            map: this.map
        });
      }
    }

    showDirections() {
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({
          map: this.map
      });
      directionsDisplay.setMap(this.map);
      directionsDisplay.setPanel(document.getElementById("panel"));

      this.calculateAndDisplayRoute(directionsService, directionsDisplay, this.props.latLng, this.state.currLocation);

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

    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }
      console.log( 'google ', this.state.currLocation)
      console.log( 'use This ', this.props.useThis)
      if (!this.props.props.google) {
        return <div>loading...</div>
      }
      return (
        <div>
         <button onClick={() => {this.toggleModal(); this.showDirections()}}>Click me if ya want directions</button>
         {/* <div id="panel"></div> */}

         <Modal
           isOpen={this.state.isModalOpen}
           // onAfterOpen={afterOpenFn}
           // onRequestClose={requestCloseFn}
           // closeTimeoutMS={n}
           // style={customStyle}
           // contentLabel="Modal"
         >
         {/* <span>{this.showDirections}</span> */}
         <div id="panel">{`Directions to ${this.props.useThis}`}</div>
         <button onClick={this.closeModal}>close</button>
       </Modal>


        <div id="rightPanel">
        </div>
        <div ref="map" style={style}>
          {/* loading map... */}
        </div>
      </div>
      )
  }
}

export default Map;
