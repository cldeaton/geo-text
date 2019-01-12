import React, {Component} from 'react';
import { main } from '../google-mapping';
// import Map from './Map';
import MapContainer from './MapContainer';

class MapDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false,
            title: 'Use Map',
        };
        this.handleClick = this.handleClick.bind(this);
        this.mapHandler = this.mapHandler.bind(this);
    }
    
    handleClick(e) {
        this.setState({isToggle: !this.state.isToggle});
    }
    mapHandler(e) {
        main();
    }
    render() {
        return (
            <div>
                <h3>Find Location by Map</h3>
                <button onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.state.isToggle ? 'Don\'t Use Map' : 'Use Map'}} type="button" value="Map data"></button>
                {/* <div style={{display: this.state.isToggle ? 'block' : 'none'}} id="map"></div> */}
                <div style={{display: this.state.isToggle ? 'block' : 'none'}} >
                <MapContainer onClick={this.mapHandler} />
                </div>
                
            </div>
        )
    }
}

export default MapDisplay;