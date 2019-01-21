import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

// const apiKey = process.env.GOOGLEMAP_API_KEY;
const apiKey = 'AIzaSyBnhjK7qWvZDZ_ccL5x7Yb8kBMm2o6CqRY';

const mapStyles = {
    width: '100%',
    height: '400px',
};
export class GoogleMap extends Component {
    constructor(props) {
        super(props);
            
            this.onScriptLoad = this.onScriptLoad.bind(this);
    }
    
    onScriptLoad() {
      const lat = this.props.currentLocation.latitude;
      const lng = this.props.currentLocation.longitude;
      const mapData = {
        center: {
          lat,
          lng
        }, 
        zoom: 14,
      } 
      const map = new window.google.maps.Map(
        document.getElementById(this.props.id),
        mapData);
      window.myMap = map;
   
      this.props.onMapLoad(map)
    }
    componentDidMount() {
   
        if (!window.google) {
          let mapScript = document.createElement('script');
          mapScript.type = 'text/javascript';
          mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
          let mapScriptEl = document.getElementsByTagName('script')[0];
          mapScriptEl.parentNode.insertBefore(mapScript, mapScriptEl);
          mapScript.addEventListener('load', e => {
            this.onScriptLoad();
          })
        } else {
          this.onScriptLoad();
        }
      }
  
    render() {
      return (
        <div style={mapStyles} id={this.props.id} />
      );
    }
}
  
    
 


export default GoogleMap;

