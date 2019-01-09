import React, {Component} from 'react';
// import { handleClick, handleClick2 } from '../google-mapping.js'

function handleClick() {
    message = document.querySelector('.mapMessage').value;
    number = document.querySelector('.mapNumber').value;
    targetMarkerCoord = targetMarker.getPosition().toJSON();
    originMarkerCoord = originMarker.getPosition().toJSON();
    console.log(`Current Coords are: ${originMarkerCoord.lat}, ${originMarkerCoord.lng} and you want to send ${message} to ${number}`);
    // delete infobox onclick
    infowindow.close();
    swal('Location Confirmed', 'You\'ll be notified shortly if you made it!');
  }

class InfoWindow extends Component {
    render() {
        return (
           <div>
               <h2>Want to Go Here?</h2>
               <textarea className="mapMessage" placeholder="What would you like to say?"></textarea>
               <input className="mapNumber" placeholder="Who do you want to send this to?"></input>
               <button onClick={handleClick}>Use This Location!</button>
               {/* <button onClick={handleClick2}>Add Another!</button> */}
           </div>
        )
    }
}

export default InfoWindow;