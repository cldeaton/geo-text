import React, {Component} from 'react';
import { main } from '../google-mapping';

class MapDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false,
            title: 'Use Map'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({isToggle: !this.state.isToggle});
        main();
    }
    render() {
        return (
            <div>
                <h3>Find Location by Map</h3>
                <button onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.state.isToggle ? 'Don\'t Use Map' : 'Use Map'}} type="button" value="Map data"></button>
                <div style={{display: this.state.isToggle ? 'block' : 'none'}} id="map"></div>
            </div>
        )
    }
}

export default MapDisplay;