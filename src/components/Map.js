import React, {Component} from 'react';
import {render} from 'react-dom';
import GoogleMap from './GoogleMap';
import InfoWindow from './InfoWindow';
import blueMarker from '../../public/images/blueMarker.png';
import tent from '../../public/images/tent.png';
import { monitorCurrentLocation } from '../google-mapping';

var targetMarker;

export class Map extends Component {
    createTargetMarker(e, map){
        targetMarker = new window.google.maps.Marker({
            position: {lat: this.props.targetLocation.latitude, lng: this.props.targetLocation.longitude},
            map: map,
            icon: blueMarker,
        });
        
        targetMarker.addListener('click', e => {
            this.createInfoWindow(e, map)
        });
    }

    createInfoWindow(e, map) {
        const infoWindow = new window.google.maps.InfoWindow({
            content: '<div id="infoWindow" />',
            position: {lat: this.props.targetLocation.latitude, lng: this.props.targetLocation.longitude}
        });
        infoWindow.addListener('domready', e => {
            render(<InfoWindow infoWindowHandler={this.props.infoWindowHandler} />, document.getElementById('infoWindow'))
        });
        infoWindow.open(map)
    }

    render() {
        console.log(this)
        return (
            <GoogleMap 
            id="myMap"
            currentLocation={this.props.currentLocation}
            onMapLoad={map => {
                const marker = new window.google.maps.Marker({
                    position: map.center,
                    map: map,
                    title: 'Current Position',
                    icon: tent,
                });
                map.addListener('click', this.props.handleClick);
                
                map.addListener('click', e => {
                    if (targetMarker) {
                        targetMarker.setMap(null);
                    }
                    this.createTargetMarker(e, map)
                  });
            }}
            >
               
            </GoogleMap>
        );
    }
}

export default Map;
