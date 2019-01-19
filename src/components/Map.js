import React, {Component} from 'react';
import {render} from 'react-dom';
import GoogleMap from './GoogleMap';
import InfoWindow from './InfoWindow';
import blueMarker from '../../public/images/blueMarker.png'
// import magnifyingGlass from '../../public/images/magnifyingGlass.png'
import tent from '../../public/images/tent.png'

var targetMarker;

export class Map extends Component {
   
    
    createTargetMarker(e, map){
        targetMarker = new window.google.maps.Marker({
            position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
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
            position: {lat: e.latLng.lat(), lng: e.latLng.lng()}
        });
        infoWindow.addListener('domready', e => {
            render(<InfoWindow />, document.getElementById('infoWindow'))
        });
        infoWindow.open(map)
    }
    render() {
        return (
            <GoogleMap 
            id="myMap"
            options={{
                center: {lat: 37.3519703,lng: -79.17290430000003},
                zoom: 14
            }}
            centerAroundCurrentLocation
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
                marker.addListener('click', e => {
                    this.createInfoWindow(e, map)
                })
            }}
            >
               
            </GoogleMap>
        );
    }
}

export default Map;

// {lat: 37.3519703,lng: -79.17290430000003}