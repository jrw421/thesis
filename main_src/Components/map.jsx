// import React from 'react';
// import ReactDOM from 'react-dom';
// import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import Modal from 'react-modal';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng
// } from 'react-places-autocomplete';
// import { GoogleApiWrapper } from 'google-maps-react';
// import FlatButton from 'material-ui/FlatButton';
// import Map2 from './map2.jsx';
//
// class Map extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       currLocation: {},
//       directions: [],
//       latLng: [],
//       isModalOpen: false,
//       toggleMap: false
//     };
//     this.toggleModal = this.toggleModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//     this.toggleMapFunc = this.toggleMapFunc.bind(this);
//   }
//
//   toggleMapFunc() {
//     this.setState({
//       toggleMap: !this.state.toggleMap
//     });
//   }
//
//   toggleModal() {
//     this.setState({
//       isModalOpen: !this.state.isModalOpen
//     });
//   }
//
//   closeModal() {
//     this.setState({
//       isModalOpen: false
//     });
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.props.google && !this.state.toggleMap) {
//       this.loadMap();
//       this.plotCurrentLocation();
//       this.showDirections();
//     }
//   }
//
//   plotCurrentLocation(map) {
//     let getPosition = function(options) {
//       return new Promise(function(resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject, options);
//       });
//     };
//
//     getPosition()
//       .then(position => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         // console.log("anything LongLat ", lat, lng);
//         this.setState({
//           currLocation: { lat: lat, lng: lng }
//         });
//       })
//       .catch(err => {
//         console.error(err.message);
//       });
//   }
//
//   loadMap() {
//     if (this.props.props && this.props.props.google && !this.state.toggleMap) {
//       const { google } = this.props.props;
//       const maps = google.maps;
//       const mapRef = this.refs.map; //might need to change back to map
//       const node = ReactDOM.findDOMNode(mapRef);
//       const myLatLng = this.props.latLng || { lat: 44.475, lng: 44.475 }; //{lat: 44.475, lng: 44.475}
//       const mapConfig = Object.assign(
//         {},
//         {
//           // center: {lat: 0, lng: 180},
//           zoom: 5,
//           center: myLatLng,
//           gestureHandling: 'cooperative',
//
//           styles: [
//             { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
//             {
//               elementType: 'labels.text.stroke',
//               stylers: [{ color: '#242f3e' }]
//             },
//             {
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#746855' }]
//             },
//             {
//               featureType: 'administrative.locality',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#d59563' }]
//             },
//             {
//               featureType: 'poi',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#d59563' }]
//             },
//             {
//               featureType: 'poi.park',
//               elementType: 'geometry',
//               stylers: [{ color: '#263c3f' }]
//             },
//             {
//               featureType: 'poi.park',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#6b9a76' }]
//             },
//             {
//               featureType: 'road',
//               elementType: 'geometry',
//               stylers: [{ color: '#38414e' }]
//             },
//             {
//               featureType: 'road',
//               elementType: 'geometry.stroke',
//               stylers: [{ color: '#212a37' }]
//             },
//             {
//               featureType: 'road',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#9ca5b3' }]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'geometry',
//               stylers: [{ color: '#746855' }]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'geometry.stroke',
//               stylers: [{ color: '#1f2835' }]
//             },
//             {
//               featureType: 'road.highway',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#f3d19c' }]
//             },
//             {
//               featureType: 'transit',
//               elementType: 'geometry',
//               stylers: [{ color: '#2f3948' }]
//             },
//             {
//               featureType: 'transit.station',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#d59563' }]
//             },
//             {
//               featureType: 'water',
//               elementType: 'geometry',
//               stylers: [{ color: '#17263c' }]
//             },
//             {
//               featureType: 'water',
//               elementType: 'labels.text.fill',
//               stylers: [{ color: '#515c6d' }]
//             },
//             {
//               featureType: 'water',
//               elementType: 'labels.text.stroke',
//               stylers: [{ color: '#17263c' }]
//             }
//           ]
//         }
//       );
//       this.map = new maps.Map(node, mapConfig);
//       const service = new google.maps.places.PlacesService(this.map);
//
//       let markerA = new google.maps.Marker({
//         position: this.props.latLng,
//         title: 'point A',
//         label: 'A',
//         map: this.map
//       });
//       let markerB = new google.maps.Marker({
//         position: this.state.currLocation,
//         title: 'point B',
//         label: 'B',
//         map: this.map
//       });
//     }
//   }
//
//   showDirections() {
//     let directionsService = new google.maps.DirectionsService();
//     let directionsDisplay = new google.maps.DirectionsRenderer({
//       map: this.map
//     });
//
//     directionsDisplay.setPanel(document.getElementById('panel'));
//
//     this.calculateAndDisplayRoute(
//       directionsService,
//       directionsDisplay,
//       this.props.latLng,
//       this.state.currLocation
//     );
//   }
//
//   calculateAndDisplayRoute(
//     directionsService,
//     directionsDisplay,
//     pointA,
//     pointB
//   ) {
//     directionsService.route(
//       {
//         origin: pointA,
//         destination: pointB,
//         travelMode: google.maps.TravelMode.DRIVING
//       },
//       function(response, status) {
//         if (status === 'OK') {
//           directionsDisplay.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       }
//     );
//   }
//
//   render() {
//     const directionsSvg = (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//       >
//         <path d="M17.492 15.432c-.433 0-.855-.087-1.253-.259l.467-1.082c.25.107.514.162.786.162.222 0 .441-.037.651-.11l.388 1.112c-.334.118-.683.177-1.039.177zm-10.922-.022c-.373 0-.741-.066-1.093-.195l.407-1.105c.221.081.451.122.686.122.26 0 .514-.05.754-.148l.447 1.09c-.382.157-.786.236-1.201.236zm8.67-.783l-1.659-.945.583-1.024 1.66.945-.584 1.024zm-6.455-.02l-.605-1.011 1.639-.981.605 1.011-1.639.981zm3.918-1.408c-.243-.101-.5-.153-.764-.153-.23 0-.457.04-.674.119l-.401-1.108c.346-.125.708-.188 1.075-.188.42 0 .83.082 1.217.244l-.453 1.086zm7.327-.163c-.534 0-.968.433-.968.968 0 .535.434.968.968.968.535 0 .969-.434.969-.968 0-.535-.434-.968-.969-.968zm-16.061 0c-.535 0-.969.433-.969.968 0 .535.434.968.969.968s.969-.434.969-.968c0-.535-.434-.968-.969-.968zm18.031-.832v6.683l-4 2.479v-4.366h-1v4.141l-4-2.885v-3.256h-2v3.255l-4 2.885v-4.14h-1v4.365l-4-2.479v-13.294l4 2.479v3.929h1v-3.927l4-2.886v4.813h2v-4.813l1.577 1.138c-.339-.701-.577-1.518-.577-2.524l.019-.345-2.019-1.456-5.545 4-6.455-4v18l6.455 4 5.545-4 5.545 4 6.455-4v-11.618l-.039.047c-.831.982-1.614 1.918-1.961 3.775zm2-8.403c0-2.099-1.9-3.801-4-3.801s-4 1.702-4 3.801c0 3.121 3.188 3.451 4 8.199.812-4.748 4-5.078 4-8.199zm-5.5.199c0-.829.672-1.5 1.5-1.5s1.5.671 1.5 1.5-.672 1.5-1.5 1.5-1.5-.671-1.5-1.5zm-.548 8c-.212-.992-.547-1.724-.952-2.334v2.334h.952z" />
//       </svg>
//     );
//
//     const storesSvg = (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//       >
//         <path d="M9.939 0l-.939 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l2.996-4.971h1.943zm-3.052 0l-2.887 4.971v1.098c0 1.066-.933 1.931-2 1.931s-2-.865-2-1.932v-1.097l4.874-4.971h2.013zm17.113 6.068c0 1.067-.934 1.932-2 1.932s-2-.933-2-2v-1.098l-2.887-4.902h2.014l4.873 4.971v1.097zm-10-1.168v1.098c0 1.066-.934 2.002-2 2.002-1.067 0-2-.933-2-2v-1.098l1.047-4.902h1.905l1.048 4.9zm2.004-4.9l2.994 5.002v1.098c0 1.067-.932 1.9-1.998 1.9s-2-.933-2-2v-1.098l-.939-4.902h1.943zm4.996 12v7h-18v-7h18zm2-2h-22v14h22v-14z" />
//       </svg>
//     );
//
//     if (!this.props.props.google) {
//       return <div>loading...</div>;
//     }
//     const isClicked = this.state.toggleMap;
//
//     return (
//       <div className="map-element">
//         {!this.state.toggleMap ? (
//           <div className="map-element-map-container">
//             <div className="map-element-map">
//               <div ref="map" className="map-element-map2" />
//             </div>
//
//             <div>
//               <Modal isOpen={this.state.isModalOpen}>
//                 <div id="panel">{`Directions to ${this.props.useThis}`}</div>
//                 <button onClick={this.closeModal}>close</button>
//               </Modal>
//             </div>
//           </div>
//         ) : (
//           <div className="map-element-map-container">
//             <div style={{ width: '100%', height: '100%' }}>
//               <Map2 props={this.props} latLng={this.state.latLng} />
//             </div>
//
//             <div>
//               <Modal isOpen={this.state.isModalOpen}>
//                 <div id="panel">{`Directions to ${this.props.useThis}`}</div>
//                 <button onClick={this.closeModal}>close</button>
//               </Modal>
//             </div>
//           </div>
//         )}
//         <div className="map-element-buttons-container">
//           <button
//             onClick={() => {
//               this.toggleModal();
//               this.showDirections();
//             }}
//           >
//             {directionsSvg}
//           </button>
//           <button onClick={this.toggleMapFunc}>{storesSvg}</button>
//         </div>
//       </div>
//     );
//   }
// }
//
// export default Map;
