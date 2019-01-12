import React, {Component} from 'react';
import swal from 'sweetalert';
import {
  getLatAndLng, mapDistanceCalculation, checkDist,
} from './coordinate-util';
import { sendText } from './response';


function initMap() {
  const mapElement = document.getElementById('map');
  const map = new google.maps.Map(mapElement, { zoom: 14 });
  return map;
}

// Adds a marker to the map
function addMarker(location, map) {
  const marker = new google.maps.Marker({
    position: location,
    map,
  });
  return marker;
}

// Google Map functions
function main() { // rename
  const map = initMap();
  let targetMarker;
  let targetMarkerCoord;
  let originMarker;
  let originMarkerCoord;
  let message;
  let number;

  map.addListener('click', (event) => {
    const targetCoord = event.latLng;
    const infowindow = new google.maps.InfoWindow();

    if (targetMarker) {
      targetMarker.setMap(null);
    }

    targetMarker = addMarker(targetCoord, map);

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

    function handleClick2() {
      // create additional targetMarkers and leave current ones
      // handleClick();
    }

    // const popUp = document.createElement('div');
    // const title = document.createElement('h2');
    // title.innerText = 'Want To Go Here?';
    // const currentButton = document.createElement('button');
    // const additionalButton = document.createElement('button');
    // const messageField = document.createElement('textarea');
    // const numberField = document.createElement('input');
    // messageField.placeholder = 'What would you like to say?';
    // messageField.className = 'mapMessage';
    // numberField.type = 'tel';
    // numberField.className = 'mapNumber';
    // numberField.placeholder = 'Number';
    // currentButton.innerText = 'Use This Location!';
    // additionalButton.innerText = 'Add Another Location!';
    // currentButton.addEventListener('click', handleClick);
    // additionalButton.addEventListener('click', handleClick2);
    // popUp.appendChild(title);
    // popUp.appendChild(messageField);
    // popUp.appendChild(numberField);
    // popUp.appendChild(currentButton);
    // popUp.appendChild(additionalButton);
    // infowindow.setContent(popUp);
    // infowindow.setContent(<InfoWindow />);

    targetMarker.addListener('click', () => {
      infowindow.open(map, targetMarker);
    });
  });
  let monitorInterval;
  function monitorCurrentLocation() {
    getLatAndLng()
      .then((location) => {
        if (originMarker) {
          originMarker.setMap(null);
        }
        originMarker = addMarker(location, map);
        map.setCenter(location);
        if (targetMarkerCoord) {
          const mapDistance = mapDistanceCalculation(originMarkerCoord, targetMarkerCoord);
          if (checkDist(mapDistance)) {
            clearInterval(monitorInterval);
            console.log('You made it!');
            sendText(message, number);
          } else {
            console.log('Not there yet...');
          }
          console.log(`Distance is: ${mapDistance}`);
        }
      });
  }
  monitorCurrentLocation();
  monitorInterval = setInterval(monitorCurrentLocation, 1000 * 10);
}

export { mapDisplay, mapRemoval, main};
