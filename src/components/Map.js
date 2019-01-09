import React, {Component} from 'react';
import { compose, withProps } from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import InfoWindow from './InfoWindow';
import GoogleMapReact from 'google-map-react';

// const apiKey = process.env.GOOGLEMAP_API_KEY;
const apiKey = 'AIzaSyBnhjK7qWvZDZ_ccL5x7Yb8kBMm2o6CqRY';

// const Map = compose(
//     withProps({
//       googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}`,
//       loadingElement: <div style={{ height: `100%` }} />,
//       containerElement: <div style={{ height: `400px` }} />,
//       mapElement: <div style={{ height: `100%` }} />,
//     }),
//     withScriptjs,
//     withGoogleMap
//   )((props) =>
//     <GoogleMap
//       defaultZoom={13}
//       defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
//     >
//       {props.isMarkerShown && <Marker position={{ lat: 40.756795, lng: -73.954298 }} onClick={props.onMarkerClick}/>},
//     </GoogleMap>
//   );
  
//   <Map isMarkerShown />


//   class Map extends Component {
//     render() {
//     const GoogleMapExample = withScriptjs(withGoogleMap(props => (
//        <GoogleMap
//          defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
//          defaultZoom = { 13 }
//        >
//        </GoogleMap>
//     )));
//     return(
//        <div>
//          <GoogleMapExample
//             isMarkerShown
//             googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
//             loadingElement = { <div style={{ height: `100%` }} /> }
//             containerElement={ <div style={{ height: `400px`, width: '100%' }} /> }
//             mapElement={ <div style={{ height: `100%` }} /> }
//          >
//          <InfoWindow />
//          </GoogleMapExample>
//        </div>
//     );
//     }
//  };


export class Map extends Component {
    static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 13,
  }
    render () {
        return (
            <div style={{height: '400px', width: '100%'}}>
                <GoogleMapReact 
                bootstrapURLKeys={{key: apiKey}} 
                defaultCenter={this.props.center} 
                defaultZoom={this.props.zoom}
                >
                {/* <InfoWindow /> */}
                
                </GoogleMapReact>
            </div>
        )
    }
}

export default Map;