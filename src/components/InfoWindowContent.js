import React, {Component} from 'react';
import { main } from '../google-mapping.js'
 

class InfoWindowContent extends Component {
    render() {
        return (
           <div>
               <h2>Want to Go Here?</h2>
               <textarea className="mapMessage" placeholder="What would you like to say?"></textarea>
               <input className="mapNumber" placeholder="Who do you want to send this to?"></input>
               <button onClick={main}>Use This Location!</button>
               {/* <button onClick={handleClick2}>Add Another!</button> */}
           </div>
        )
    }
}

export default InfoWindowContent;