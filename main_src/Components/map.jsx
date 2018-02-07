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

  loadMap() {
    if (this.props.props && this.props.props.google) {

      const {google} = this.props.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
<<<<<<< HEAD
      let myLatLng = this.props.latLng || {lat: 44.475, lng: 44.475}; //{lat: 44.475, lng: 44.475}
=======
      let myLatLng = {lat: 44.475, lng: 44.475};
>>>>>>> zoom working
      const mapConfig = Object.assign({}, {
        center: {lat: 0, lng: 180},
        zoom: 5,
        center: myLatLng,
        gestureHandling: "cooperative"
      })
      this.map = new maps.Map(node, mapConfig);

        const marker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          title: "your event!"
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
  }


    render() {
      const style = {
        width: '50vw',
        height: '40vh',
        textAlign: 'center',
        position: 'fixed',
        left: '25%'
      }
      console.log( 'google ', this.props.props.google)
      console.log( 'latLng ', this.props.latLng)
      return (
        <div ref="map" style={style}>
          loading map...
        </div>
      )
  }
}

export default Map;
