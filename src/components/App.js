import React, { Component } from 'react';
import Form from './Form';
import Map from './Map';
import { getLatAndLng, checkDist, mapDistanceCalculation } from '../coordinate-util';

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentLocation: {
                latitude: undefined,
                longitude: undefined,
            },
            targetLocation: {
                latitude: undefined,
                longitude: undefined,
            },
            mapVisible: true,
        };
        this.handleShowMapClick = this.handleShowMapClick.bind(this);
        this.handleShowFormClick = this.handleShowFormClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        // this.monitorCurrentLocation = this.monitorCurrentLocation.bind(this);
        this.updateLatLng = this.updateLatLng.bind(this);
        // Place in setInterval to continuously check for position
        
        console.log(this);
        getLatAndLng()
            .then(response => {
                this.updateLatLng(response.lat, response.lng);
                
            });
        
        // this.monitorCurrentLocation();
    }

    handleShowMapClick() {
        this.setState({
            mapVisible: true
        });
    }

    handleShowFormClick() {
        this.setState({
            mapVisible: false
        });
    }

    handleMapClick(e) {
        this.setState({
            targetLocation: {
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng(),
            }
        });
    }

    updateLatLng(latitude, longitude) {
        this.setState({
            currentLocation: {
                latitude,
                longitude,
            }
        });
    }
    // let monitorInterval;
    // monitorCurrentLocation() {
    //     getLatAndLng()
    //     .then(response => {
    //         this.updateLatLng(response.lat, response.lng);
    //         console.log(this);
    //         if (this.state.targetLocation.latitude){
    //             const mapDistance = mapDistanceCalculation(this.state.currentLocation, this.state.targetLocation)
    //             console.log(mapDistance);
    //             if (checkDist(mapDistance)){
    //                 console.log('Yay!!')
    //             } else {
    //                 console.log('Not Quite...');
    //             }
    //         }
            
    //     });
    // }

    render() {
        const {
            currentLocation,
            targetLocation,
            mapVisible,
        } = this.state; 


        if (!this.state.currentLocation.latitude) {
            return (<div>Loading</div>);
        }

        let viewComponent;
        if (mapVisible) {
            viewComponent = <Map
                                currentLocation={currentLocation}
                                targetLocation={targetLocation}
                                handleClick={this.handleMapClick}
                            />;
        } else {
            viewComponent = <Form/>;
        }

        return (
            <div className="App">
                <h1>GEO-Text App</h1>
                <button onClick={this.handleShowFormClick}>Use Form</button>
                <button onClick={this.handleShowMapClick}>Use Map</button>
                {viewComponent}
            </div>
        );
    }
}

export default App;