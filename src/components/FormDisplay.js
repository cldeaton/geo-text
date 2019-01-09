import React, { Component } from 'react';
import DataDisplay from './DataDisplay';

class FormDisplay extends Component {
    render() {
        return (
            <div className="FormDisplay">
                <form action="/" className="userData">
                <h4>Number:</h4> 
                <input className="number" type="tel" name="number" />
                <h4>Message Body:</h4> 
                <textarea className="messageBody" name="message body" rows="6" cols="50" /> 
                <h4>Address:</h4>
                <textarea className="addressInput" name="address" rows="6" cols="40" />
                <br />
                <button className="daddyFunction" type="button" name="button" value="Address data">Use Address</button>
                </form>
                <DataDisplay />
            </div>
        );
    }
}

export default FormDisplay;