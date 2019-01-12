import React, {Component} from 'react';

function addMarker(location, map) {
   const marker = new google.maps.Marker({
     position: location,
     map,
   });
   return marker;
}

class CenterMarker extends Component {
    renderMarker(map, maps) {
        let marker = new.maps.Marker({
            position: myLatLng,
            map,
        });
    }
    render() {
        return (
           <div>
               <CenterMarker />
           </div>
        )
    }
}

function Marker ({location, map}) {
    const marker = new google.maps.Marker({
        position: location,
        map,
      });
      return marker;
}

export default CenterMarker;