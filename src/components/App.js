import React, { Component } from 'react';
import Form from './Form';
import Map from './Map';
import { getLatAndLng, checkDist, mapDistanceCalculation } from '../coordinate-util';
import {sendText} from '../response';

let monitorInterval;
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
        this.monitorCurrentLocation = this.monitorCurrentLocation.bind(this);
        this.updateLatLng = this.updateLatLng.bind(this);
        this.infoWindowHandler = this.infoWindowHandler.bind(this);
        
        getLatAndLng()
            .then(response => {
                this.updateLatLng(response.lat, response.lng);
            });
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

    infoWindowHandler(){
        console.log("hey, I'm the infoWindow");
        if (monitorInterval !== undefined) {
            clearInterval(monitorInterval);
            monitorInterval = undefined;
        }
        this.monitorCurrentLocation();
        monitorInterval = setInterval(this.monitorCurrentLocation, 1000 * 10);
        // set window to close when button is pressed or outside of boxed is clicked. 
        // infoWindow.close();
    }

    updateLatLng(latitude, longitude) {
        this.setState({
            currentLocation: {
                latitude,
                longitude,
            }
        });
    }

    monitorCurrentLocation() {
        getLatAndLng()
        .then((response) => {
            this.updateLatLng(response.lat, response.lng);
            console.log(this);
            if (this.state.targetLocation.latitude){
                const mapDistance = mapDistanceCalculation(this.state.currentLocation, this.state.targetLocation)
                console.log(mapDistance);
                if (checkDist(mapDistance)){
                    clearInterval(monitorInterval);
                    console.log('Yay!!');
                    // sendText(message, number);
                } else {
                    console.log('Not Quite...');
                }
            }
        });
    }

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
                                infoWindowHandler={this.infoWindowHandler}
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