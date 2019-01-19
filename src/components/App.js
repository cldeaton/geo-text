import React, { Component } from 'react';
import Form from './Form';
import Map from './Map';

class App extends Component {

    constructor() {
        super();
        this.state = {
            currentLocation: {
                latitude: 20,
                longitude: 15
            },
            target: null,
            mapVisible: true,
        };
        this.handleShowMapClick = this.handleShowMapClick.bind(this);
        this.handleShowFormClick = this.handleShowFormClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
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

    handleMapClick(latitude, longitude) {
        this.setState({
            target: {
                latitude,
                longitude,
            }
        });
    }
    render() {
        const {
            currentLocation,
            target,
            mapVisible,
        } = this.state; 

        let viewComponent;
        if (mapVisible) {
            viewComponent = <Map
                                currentLocation={currentLocation}
                                target={target}
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