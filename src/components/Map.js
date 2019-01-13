import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

// const apiKey = process.env.GOOGLEMAP_API_KEY;
const apiKey = 'AIzaSyBnhjK7qWvZDZ_ccL5x7Yb8kBMm2o6CqRY';

const mapStyles = {
    width: '100%',
    height: '400px',
};
export class Map extends Component {
    constructor(props) {
        super(props);
        const { lat, lng } = this.props;
            this.state = {
                currentLocation: {
                    lat: lat,
                    lng: lng,
                },
                
            }
            this.onScriptLoad = this.onScriptLoad.bind(this);
    }
    
    onScriptLoad() {
      if (this.props && this.props.google) {
        // checks if google is available
        // const { google } = this.props;
        const maps = google.maps;
  
        const mapRef = this.refs.map;
  
        // reference to the actual DOM element
        // const node = ReactDOM.findDOMNode(mapRef);
  
        // let { zoom } = this.props;
        const { lat, lng } = this.state.currentLocation;
        const center = new maps.LatLng(lat, lng);
        const mapConfig = Object.assign(
          {},
          {
            center: center,
            zoom: 14,
          }
        );
        // maps.Map() is constructor that instantiates the map
        this.map = new maps.Map(document.getElementById(this.props.id), mapConfig);
      }
      // const map = new window.google.maps.Map(
      //   document.getElementById(this.props.id),
      //   this.state.currentLocation);
      //   // this.props.options);
      // window.myMap = map;
   
      // this.props.onMapLoad(map)
    }
    componentDidMount() {
      if (navigator && navigator.geolocation){
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
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
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevProps.google !== this.props.google) {
        this.onScriptLoad();
      }
      if (prevState.currentLocation !== this.state.currentLocation) {
        this.recenterMap();
      }
    }
    recenterMap() {
      const map = this.map;
      const current = this.state.currentLocation;
  
  
      if (map) {
        let center = new maps.LatLng(current.lat, current.lng);
        map.panTo(center);
      }
    }
    renderChildren() {
      const { children } = this.props;
  
      if (!children) return;
  
      return React.Children.map(children, c => {
        if (!c) return;
        return React.cloneElement(c, {
          map: this.map,
          google: this.props.google,
          mapCenter: this.state.currentLocation
        });
      });
    }
    render () {
      const style = Object.assign({}, mapStyles);
      return (
          <div >
              <div style={style} id={this.props.id} ref='map' >
                  Loading map...
              </div>
              {this.renderChildren()}
          </div>
      )
    }
}
  
    // render() {
    //   return (
    //     <div style={mapStyles} id={this.props.id} />
    //   );
    // }
 


export default Map;

Map.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: -1.2884,
    lng: 36.8233
  },
  centerAroundCurrentLocation: false,
  visible: true
};