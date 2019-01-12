import React, { Component } from 'react';
import FormDisplay from './FormDisplay';
import MapDisplay from './MapDisplay';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>GEO-Text App</h1>
                <FormDisplay />
                <MapDisplay />
            </div>
        );
    }
}

export default App;