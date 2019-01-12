import React, {Component} from 'react';
import {InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import LocalMap from './Map';
import { main } from '../google-mapping';
import InfoWindowContent from './InfoWindowContent';

const apiKey = 'AIzaSyBnhjK7qWvZDZ_ccL5x7Yb8kBMm2o6CqRY';


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    };
    mapHandler(e) {
        console.log("yo");
        main();
        
    }
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    // onMapClick = (props) => {
    //     if (this.state.showingInfoWindow) {
    //       this.setState({
    //         showingInfoWindow: false,
    //         activeMarker: null
    //       });
    //     };
    //     render() {
    //         <Marker />
    //     }
    // };
    onClose = props => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
        }
    };
    render() {
        return (
            <LocalMap className={'localMap'} google={this.props.google} onClick={this.mapHandler} centerAroundCurrentLocation >
                <Marker 
                onClick={this.onMarkerClick} 
                name={'Current Location'} /> 
                <InfoWindow 
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow} 
                onClose={this.onClose}
                >
                    <InfoWindowContent />
                </InfoWindow>
            </LocalMap>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiKey
  })(MapContainer);