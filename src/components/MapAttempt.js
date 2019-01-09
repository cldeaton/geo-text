import React, {Component} from 'react';

export class Container extends Component {
    render() {
        const style = {
            width: '100%',
            height: '400px',
        }
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <div style={style}>
                <Map google={this.props.google}/>
            </div>
        )
    }
}



export class Map extends Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat, 
                lng: lng,
            }
        }
    }
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude,
                        }
                    })
                })
            }
        }
        this.loadMap();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevProps.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }
    
    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            // let zoom = 14;
            // let lat =  37.774929;
            // let lng =  -122.419416;

            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat,lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
            })
            this.map = new maps.Map(node, mapConfig);
            let centerChangedTimeout;
            this.map.addListener('dragend', (evt) => {
                if (centerChangedTimeout) {
                    clearTimeout(centerChangedTimeout);
                    centerChangedTimeout = null;
                }
                centerChangedTimeout = setTimeout(() => {
                    this.props.onMove(this.map);
                }, 0);
                
            })
         }
    }
    render() {
        return (
        <div ref='map'>
            Loading Map...
        </div>
        )
    }
}

Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    centerAroundCurrentLocation: React.PropTypes.bool,
    onMove: React.PropTypes.func,
}

Map.defaultProps = {
    zoom: 13,
    initialCenter: {
      lat: 37.774929,
      lng: -122.419416
    },
    centerAroundCurrentLocation: false,
    onMove: function() {},
}

// export Map;