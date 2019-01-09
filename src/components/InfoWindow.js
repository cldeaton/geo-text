import React, {Component} from 'react';
import { handleClick, handleClick2 } from '../google-mapping.js'
class InfoWindow extends Component {
    render() {
        return (
           <div>
               <h2>Want to Go Here?</h2>
               <textarea className="mapMessage" placeholder="What would you like to say?"></textarea>
               <input className="mapNumber" placeholder="Who do you want to send this to?"></input>
               <button onClick={handleClick}>Use This Location!</button>
               <button onClick={handleClick2}>Add Another!</button>
           </div>
        )
    }
}

export default InfoWindow;